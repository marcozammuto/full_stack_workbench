import React from "react";
import { useTheme } from "../../context/index";

const Footer = () => {
  const { isDarkMode } = useTheme();
  return (
    <div>
      <p
        className={`text-center text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        &copy;{new Date().getFullYear()} Giuseppe Zammuto - All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
