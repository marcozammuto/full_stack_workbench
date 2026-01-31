import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { guestNames } from "../types/constants.js";
import dotenv from "dotenv";
import path from "path";

import {
  DynamoDBDocumentClient,
  QueryCommand,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { splitDate } from "../utils/strings.js";

dotenv.config({
  path: path.resolve("..", ".env"),
});

// Lazy initialization - client created on first use, after env vars are loaded
let docClient: DynamoDBDocumentClient | null = null;

const getDocClient = () => {
  if (!docClient) {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_DYNAMO_DB_USER_ACCESS_ID!,
        secretAccessKey: process.env.AWS_DYNAMO_DB_USER_ACCESS_SECRET_KEY!,
      },
    });
    docClient = DynamoDBDocumentClient.from(client);
  }
  return docClient;
};

/**
 * Retrieves bookings for a property within a 7-day range (past and future).
 *
 * @param nextCursor - Optional cursor string for pagination. Used to fetch the next page of results.
 * @returns A promise that resolves to an object containing:
 *   - `data`: Array of booking items from DynamoDB
 *   - `nextCursor`: Pagination cursor for the next set of results, or null if no more results
 *
 * @remarks
 * - Queries the "Bookings" DynamoDB table
 * - Filters by PropertyId = "PROPERTY_1"
 * - Retrieves bookings between 7 days ago and 7 days in the future
 * - Returns a maximum of 10 items per request
 * - Uses pagination via ExclusiveStartKey for handling large result sets
 *
 * @example
 * ```typescript
 * const { data, nextCursor } = await getBookings();
 * const nextPage = await getBookings(nextCursor);
 * ```
 */
export const getBookings = async (nextCursor?: string | null) => {
  const today = new Date();
  const sevenDaysAgo = splitDate(new Date(today.setDate(today.getDate() - 7)));
  const sevenDaysAhead = splitDate(
    new Date(today.setDate(today.getDate() + 7)),
  );

  const command = new QueryCommand({
    TableName: "Bookings",
    KeyConditionExpression:
      "PropertyId = :propId AND BookingDateId BETWEEN :from AND :to",
    ExpressionAttributeValues: {
      ":propId": "PROPERTY_1",
      ":from": sevenDaysAgo,
      ":to": sevenDaysAhead + "#~",
    },
    Limit: 10,
    ExclusiveStartKey: nextCursor ? JSON.parse(nextCursor) : undefined,
  });
  const response = await getDocClient().send(command);

  return {
    data: response.Items,
    nextCursor: response.LastEvaluatedKey
      ? JSON.stringify(response.LastEvaluatedKey)
      : null,
  };
};

export const seedBookings = async () => {
  const channels = ["SoMe", "Web", "Phone"];

  const randomChoice = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const randomDate = (start: Date, end: Date): string => {
    const d = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    return (
      d.toISOString().split("T")[0] ||
      `${new Date().getFullYear().toString()}-01-01`
    );
  };

  const bookings = [];
  const TOTAL_BOOKINGS = 500;

  for (let i = 1; i <= TOTAL_BOOKINGS; i++) {
    const date = randomDate(new Date("2026-01-01"), new Date("2026-12-31"));
    bookings.push({
      PropertyId: "PROPERTY_1",
      BookingDateId: `${date}#b${i}`,
      GuestName: randomChoice(guestNames),
      Channel: randomChoice(channels),
      Paid: Math.random() < 0.5,
    });
  }

  // BatchWrite in chunks of 25 (DynamoDB limit)
  const BATCH_SIZE = 25;
  let inserted = 0;

  for (let i = 0; i < bookings.length; i += BATCH_SIZE) {
    const batch = bookings.slice(i, i + BATCH_SIZE);
    const command = new BatchWriteCommand({
      RequestItems: {
        Bookings: batch.map((item) => ({
          PutRequest: { Item: item },
        })),
      },
    });
    await getDocClient().send(command);
    inserted += batch.length;
    console.log(`Inserted ${inserted}/${bookings.length}`);
  }

  return { inserted };
};
