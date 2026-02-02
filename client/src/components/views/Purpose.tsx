import { useTheme } from "../../context/index";
import PageHeading from "../shared/PageHeading";

const Purpose = () => {
  const { isDarkMode } = useTheme();

  const headingClass = `text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`;
  const textClass = `mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`;
  const cardClass = `p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white shadow-md"}`;

  return (
    <>
      <PageHeading
        title="Purpose"
        subtitle="Learn more about the purpose and goals of this project"
      />

      <div className={cardClass}>
        <h2 className={headingClass}>Why This Project Exists</h2>
        <p className={textClass}>
          This application serves as a full-stack workbench demonstrating how
          the same frontend can interact with multiple backend implementations.
          It's designed as a learning tool and reference architecture for
          developers exploring different technology stacks.
        </p>

        <h2 className={headingClass}>What It Does</h2>
        <p className={textClass}>
          At its core, this is a working hours tracking system. Users can log
          their daily work hours, apply modifiers (like overtime or holidays),
          and manage bookings. The real value lies in how it demonstrates
          backend interchangeability.
        </p>

        <h2 className={headingClass}>Key Goals</h2>
        <ul
          className={`list-disc list-inside space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <li>
            Demonstrate a unified React frontend connecting to multiple backends
          </li>
          <li>Compare different backend implementations (coming soon).</li>
          <li>Showcase modern authentication with JWT tokens</li>
          <li>
            Explore both SQL (PostgreSQL) and NoSQL (DynamoDB) database patterns
          </li>
          <li>
            Provide a reference for CI/CD deployment with GitHub Actions and AWS
          </li>
        </ul>

        <h2 className={`${headingClass} mt-6`}>Who It's For</h2>
        <p className={textClass}>
          Developers who want to understand how different backend technologies
          solve the same problems, teams evaluating tech stacks, and anyone
          learning full-stack development with modern tooling.
        </p>
      </div>
    </>
  );
};

export default Purpose;
