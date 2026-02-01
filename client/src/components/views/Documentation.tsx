import { useTheme } from "../../context/index";
import PageHeading from "../shared/PageHeading";

const Documentation = () => {
  const { isDarkMode } = useTheme();

  const headingClass = `text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`;
  const subheadingClass = `text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`;
  const textClass = `mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`;
  const cardClass = `p-6 rounded-lg mb-6 ${isDarkMode ? "bg-gray-800" : "bg-white shadow-md"}`;
  const codeClass = `px-2 py-1 rounded text-sm font-mono ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"}`;

  return (
    <>
      <PageHeading
        title="Documentation"
        subtitle="Learn more about the architecture and tech stack used in this project"
      />

      <div className={cardClass}>
        <h2 className={headingClass}>Architecture Overview</h2>
        <p className={textClass}>
          The application follows a decoupled architecture with a React frontend
          that can connect to any of three backend implementations: Node.js
          (Express), Java (Spring Boot), or Python (Flask). All backends share
          the same API contract and database schemas.
        </p>
      </div>

      <div className={cardClass}>
        <h2 className={headingClass}>Tech Stack</h2>

        <h3 className={subheadingClass}>Frontend</h3>
        <ul
          className={`list-disc list-inside mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <li>
            <span className={codeClass}>React 18</span> with TypeScript
          </li>
          <li>
            <span className={codeClass}>Vite</span> for fast builds and HMR
          </li>
          <li>
            <span className={codeClass}>Tailwind CSS</span> with dark/light mode
          </li>
          <li>
            <span className={codeClass}>React Context</span> for state
            management
          </li>
        </ul>

        <h3 className={subheadingClass}>Backends</h3>
        <ul
          className={`list-disc list-inside mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <li>
            <span className={codeClass}>Node.js</span> - Express 5 + Prisma ORM
            (Port 3001)
          </li>
          <li>
            <span className={codeClass}>Java</span> - Spring Boot 3 (Port 8080)
          </li>
          <li>
            <span className={codeClass}>Python</span> - Flask (Port 5000)
          </li>
        </ul>

        <h3 className={subheadingClass}>Databases</h3>
        <ul
          className={`list-disc list-inside ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <li>
            <span className={codeClass}>PostgreSQL</span> (Supabase) - Users,
            Days, Modifiers
          </li>
          <li>
            <span className={codeClass}>DynamoDB</span> - Bookings with cursor
            pagination
          </li>
        </ul>
      </div>

      <div className={cardClass}>
        <h2 className={headingClass}>API Endpoints</h2>

        <h3 className={subheadingClass}>Authentication</h3>
        <ul
          className={`list-disc list-inside mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <li>
            <span className={codeClass}>POST /auth/login</span> - User login
          </li>
          <li>
            <span className={codeClass}>POST /auth/register</span> - User
            registration
          </li>
          <li>
            <span className={codeClass}>POST /auth/logout</span> - User logout
          </li>
        </ul>

        <h3 className={subheadingClass}>Working Hours</h3>
        <ul
          className={`list-disc list-inside mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <li>
            <span className={codeClass}>GET /day</span> - Get all days for
            current user
          </li>
          <li>
            <span className={codeClass}>POST /day</span> - Create new day entry
          </li>
          <li>
            <span className={codeClass}>PUT /day/:id</span> - Update existing
            day
          </li>
        </ul>

        <h3 className={subheadingClass}>Bookings</h3>
        <ul
          className={`list-disc list-inside ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <li>
            <span className={codeClass}>POST /booking</span> - Get paginated
            bookings
          </li>
          <li>
            <span className={codeClass}>POST /booking/seed</span> - Seed sample
            data
          </li>
        </ul>
      </div>

      <div className={cardClass}>
        <h2 className={headingClass}>Getting Started</h2>
        <p className={textClass}>
          Clone the repository, install dependencies with{" "}
          <span className={codeClass}>npm install</span> in both the{" "}
          <span className={codeClass}>client</span> and{" "}
          <span className={codeClass}>node</span> directories, then run{" "}
          <span className={codeClass}>npm run dev</span> to start the
          development servers.
        </p>
        <p className={textClass}>
          Use the backend switch in the navbar to toggle between different
          backend implementations and observe how they handle the same requests.
        </p>
      </div>
    </>
  );
};

export default Documentation;
