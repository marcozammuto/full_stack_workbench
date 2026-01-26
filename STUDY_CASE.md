# Study Case: Full Stack Developer

## Section 1 - System Design & Problem Solving

### Problem Analysis

The issue described in the study case is caused by an improper use of DynamoDB's `Scan` function, which reads the entire table and produces unpredictable response sizes. As the dataset grows, the payload can easily exceed AWS Lambda's response limits (~6 MB for synchronous invocations), resulting in HTTP 413 errors that propagate from the Lambda function to the Node backend and finally to the frontend, breaking the user experience with an unhandled error.

### Proposed Solution

My approach is to redesign the system on the following points:

#### 1. Redesigning the Data Model

The table should be modeled with a **Partition Key** and a **Sort Key** that includes the booking date (formatted as `YYYY-MM-DD#<bookingId>`).

```
┌─────────────────────────────────────────────────────────────┐
│                      DynamoDB Table                         │
├─────────────────┬───────────────────────────────────────────┤
│  Partition Key  │              Sort Key                     │
│  (propertyId)   │     (YYYY-MM-DD#bookingId)               │
├─────────────────┼───────────────────────────────────────────┤
│  PROP-001       │  2026-01-20#BK-12345                     │
│  PROP-001       │  2026-01-21#BK-12346                     │
│  PROP-001       │  2026-01-22#BK-12347                     │
│  PROP-002       │  2026-01-19#BK-12348                     │
└─────────────────┴───────────────────────────────────────────┘
```

This approach provides:
- Natural chronological ordering per property
- Guaranteed booking uniqueness
- Efficient range queries on dates

#### 2. Optimize Access Pattern

DynamoDB provides a `LastEvaluatedKey` when more data is available. This key represents the last evaluated primary key (Partition + Sort Key) and can be used in the next request to continue reading from where the previous query stopped.

Instead of `Scan`, the backend must use DynamoDB `Query` function, combined with:
- A date range condition on the Sort Key
- A fixed `Limit` to control page size (50 in this case)
- Cursor-based pagination using `LastEvaluatedKey`

**Backend Service Implementation:**

```typescript
import {
  DynamoDBClient,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export const getBookings = async (
  propertyId: string,
  startDate: string,
  endDate: string,
  cursor: string | null
) => {
  const params: QueryCommandInput = {
    TableName: "Bookings",
    KeyConditionExpression:
      "propertyId = :pk AND sortKey BETWEEN :start AND :end",
    ExpressionAttributeValues: {
      ":pk": { S: propertyId },
      ":start": { S: startDate },
      ":end": { S: `${endDate}~` },
    },
    Limit: 50,
    ...(cursor && {
      ExclusiveStartKey: JSON.parse(cursor)
    }),
  };

  const response = await docClient.send(new QueryCommand(params));

  return {
    data: response.Items,
    nextCursor: response.LastEvaluatedKey
      ? JSON.stringify(response.LastEvaluatedKey)
      : null,
  };
};
```

**Backend Controller:**

```typescript
import { Request, Response } from "express";
import { getBookings } from "../services/dynamoDbService";

export const fetchBookings = async (req: Request, res: Response) => {
  try {
    const { propertyId, startDate, endDate, cursor } = req.body;

    const result = await getBookings(
      propertyId,
      startDate,
      endDate,
      cursor || null
    );

    if (result.data.length === 0 && !cursor) {
      return res.status(200).json({
        bookings: [],
        nextCursor: null,
        message: "No bookings found for the specified criteria",
      });
    }

    res.status(200).json({
      bookings: result.data,
      nextCursor: result.nextCursor,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      error: "Failed to fetch bookings"
    });
  }
};
```

#### 3. Enlighten the Frontend

Each request should be made only when needed (not on app load) and performed via **POST** to pass the cursor object to the backend. This enables efficient, stateless pagination without relying on heavy client-side dataset slicing.

**React Component with Cursor History:**

```tsx
import { useState, useCallback } from "react";
import { useApi } from "../hooks/useApi";

interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
}

const BookingsPage = () => {
  const api = useApi();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([null]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (index: number) => {
    setLoading(true);
    setError(null);

    try {
      const cursor = cursorHistory[index];
      const response = await api.post("/bookings", {
        propertyId: "PROP-001",
        startDate: getDateRange().start,
        endDate: getDateRange().end,
        cursor,
      });

      setBookings(response.data.bookings);
      setPageIndex(index);

      // Store new cursor for next page (if not already stored)
      if (response.data.nextCursor && index === cursorHistory.length - 1) {
        setCursorHistory(prev => [...prev, response.data.nextCursor]);
      }
    } catch (err) {
      setError("Failed to load bookings. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [api, cursorHistory]);

  const goToNextPage = () => {
    if (pageIndex < cursorHistory.length - 1) {
      fetchPage(pageIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageIndex > 0) {
      fetchPage(pageIndex - 1);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <BookingsList bookings={bookings} />
      )}

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={pageIndex === 0 || loading}
        >
          Previous
        </button>
        <span>Page {pageIndex + 1}</span>
        <button
          onClick={goToNextPage}
          disabled={pageIndex >= cursorHistory.length - 1 || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};
```

**Key Implementation Details:**

- `cursorHistory` array stores all cursors indexed by page number
- Navigation backward uses stored cursors (no additional API design needed)
- Navigation forward fetches new data and stores the returned cursor
- Error handling covers both empty results and server errors

### Summary

| Before | After |
|--------|-------|
| `Scan` (full table read) | `Query` (targeted read) |
| Unpredictable payload size | Fixed 50 items per page |
| Client-side pagination | Server-side cursor pagination |
| HTTP 413 errors | Predictable response sizes |
| High read costs | Optimized read capacity |

This design:
- Keeps Lambda payloads within limits
- Avoids full table scans
- Reduces read costs
- Guarantees predictable performance
- Remains fully stateless on the backend
- Naturally scalable
- Allows future extensions (filters, secondary indexes)

---

## Section 2 - Developer Tooling & Workflow

### 1. Which IDE do you usually work with?

I primarily work with **Visual Studio Code**. It's become my favorite environment for full-stack development - the extension ecosystem, built-in terminal, and Git integration make it versatile enough to handle React, Node.js, and infrastructure work without constantly switching tools. I also use **IntelliJ IDEA** for Java development when working with Spring Boot applications.

### 2. Have you ever used AI tools integrated into your IDE?

Yes, I use **Claude Code** CLI tool that integrates directly into my terminal workflow alongside VS Code.

**Concrete example:** While working on a booking management feature, I needed to implement cursor-based pagination for DynamoDB. The AI helped me understand the relationship between `LastEvaluatedKey` and `ExclusiveStartKey`, and we worked through storing cursor history in React state to enable both forward and backward navigation.

What I found valuable wasn't just getting code suggestions - it was the back-and-forth dialogue. When my initial implementation had issues (I was double-stringifying the cursor), Claude pointed out the error straight away by tracing the data flow from the service layer through the controller. It feels more like pair programming than just autocomplete.

### 3. Have you ever used an AI-assisted tool to debug a server or pipeline end-to-end?

Yes, I used Claude Code to debug a **GitHub Actions pipeline** that was failing to deploy my Node.js backend and React frontend to an EC2 instance.

**What we debugged together:**
- `dotenv` incorrectly placed in devDependencies (not installed in production)
- Missing `package.json` copy in the deployment script
- Inconsistent relative paths for environment variable loading
- Wrong environment variable name (`PORT` vs `NODE_PORT`)
- Frontend built with `localhost` URL instead of production endpoint

**Challenges and limitations encountered:**

1. **No direct server access:** The AI couldn't SSH into the EC2 instance to verify its state, so I had to be its "eyes and hands" - running commands and reporting back what I saw. This made debugging more iterative.

2. **Credentials handling:** For sensitive operations like configuring GitHub Secrets and AWS credentials, I handled those manually. The AI appropriately never asked for or stored credentials.

3. **Real-time state:** When the EC2 instance had networking issues, we had to methodically check Security Groups, Route Tables, and Network ACLs together - the AI guided me through what to check, but I had to provide the actual values.

**Conclusion:** I found AI most effective when treated as a collaborative tool rather than expecting autonomous problem-solving. It excels at spotting patterns, suggesting fixes, and providing systematic debugging approaches, but I always validate suggestions and fill knowledge gaps with my own understanding of the system.
