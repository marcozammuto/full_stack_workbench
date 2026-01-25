import { useTheme } from "../context/ThemeContext";
import BackendSwitch from "./features/BackendSwitch";
import { useUser } from "../context/UserContext";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const navLinks = [
  { name: "Documentation", path: "/documentation" },
  { name: "Purpose", path: "/purpose" },
];

const projectLinks = [
  // { name: "Working Hours", path: "/dashboard" },
  { name: "Bookings", path: "/bookings" },
];

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Base button styles
  const buttonBase =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 h-9 px-3";

  // Nav link styles based on active state and theme
  const getNavLinkStyles = (path: string) => {
    const active = isActive(path);
    if (isDarkMode) {
      return active
        ? "text-white bg-gray-700"
        : "text-gray-300 hover:text-white hover:bg-gray-700";
    }
    return active
      ? "text-blue-600 bg-blue-50"
      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50";
  };

  return (
    <nav
      className={`sticky top-0 z-40 border-b backdrop-blur-sm ${
        isDarkMode
          ? "bg-gray-900/95 border-gray-700"
          : "bg-white/95 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-2">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-6">
            <span
              className={`text-xl font-bold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Study Case
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {/* {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${buttonBase} ${getNavLinkStyles(link.path)}`}
              >
                {link.name}
              </Link>
            ))} */}

            {/* Projects Dropdown */}
            <Menu as="div" className="relative">
              <MenuButton
                className={`${buttonBase} gap-1.5 ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Projects
                <svg
                  className="w-4 h-4 opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </MenuButton>
              <MenuItems
                transition
                className={`absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md shadow-lg overflow-hidden focus:outline-none transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in ${
                  isDarkMode
                    ? "bg-gray-800 ring-1 ring-white/10"
                    : "bg-white ring-1 ring-black/5"
                }`}
              >
                {projectLinks.map((link) => (
                  <MenuItem key={link.path}>
                    <Link
                      to={link.path}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
                        isDarkMode
                          ? "text-gray-300 data-[focus]:bg-gray-700 data-[focus]:text-white"
                          : "text-gray-700 data-[focus]:bg-blue-50 data-[focus]:text-blue-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side items */}
          <div className="flex items-center gap-2">
            {/* Backend Switch */}
            {/* <BackendSwitch /> */}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`${buttonBase} w-9 p-0 ${
                isDarkMode
                  ? "bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  : "bg-gray-800 text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Login/Logout Button */}
            <button
              onClick={() => (user ? logout() : navigate("/"))}
              className={`${buttonBase} font-medium ${
                user
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
