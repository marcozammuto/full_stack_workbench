import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";

import { ThemeContextProvider, useTheme } from "./context/ThemeContext";
import { UserContextProvider } from "./context/UserContext";
import * as Views from "./components/views/index";
import { DayContextProvider } from "./context/DayContext";
import { LookupContextProvider } from "./context/LookupContext";
import { BackendContextProvider } from "./context/BackendContext";

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Navbar />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Views.Login />} />
          <Route path="/documentation" element={<Views.Documentation />} />
          <Route path="/purpose" element={<Views.Purpose />} />
          <Route path="/dashboard" element={<Views.Dashboard />} />
          <Route path="/bookings" element={<Views.Bookings />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <BackendContextProvider>
        <ThemeContextProvider>
          <UserContextProvider>
            <LookupContextProvider>
              <DayContextProvider>
                <AppContent />
              </DayContextProvider>
            </LookupContextProvider>
          </UserContextProvider>
        </ThemeContextProvider>
      </BackendContextProvider>
    </BrowserRouter>
  );
};

export default App;
