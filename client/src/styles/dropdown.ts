// Centralized dropdown styles for HeadlessUI Menu components

const lightStyles = {
  wrapper: "relative",
  button:
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-white text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
  items:
    "absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 overflow-hidden focus:outline-none",
  itemsTransition:
    "transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in",
  item: "flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-50 data-[focus]:text-blue-600",
  itemIcon: "w-4 h-4 text-gray-500",
};

const darkStyles = {
  wrapper: "relative",
  button:
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
  items:
    "absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-white/10 overflow-hidden focus:outline-none",
  itemsTransition:
    "transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in",
  item: "flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 data-[focus]:bg-gray-700 data-[focus]:text-white",
  itemIcon: "w-4 h-4 text-gray-400",
};

// Helper function to get styles based on dark mode
export const getDropdownStyles = (isDarkMode: boolean) =>
  isDarkMode ? darkStyles : lightStyles;

// Default export for backwards compatibility (light mode)
export const dropdownStyles = lightStyles;
export const dropdownStylesDark = darkStyles;
