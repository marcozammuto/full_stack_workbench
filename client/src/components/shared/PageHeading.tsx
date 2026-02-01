import { useTheme } from "../../context/index";

const PageHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="mb-6">
      <h1
        className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </h1>
      <p
        className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default PageHeading;
