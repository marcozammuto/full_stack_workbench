import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";

import { ThemeContextProvider, useTheme } from "./context/ThemeContext";
import { UserContextProvider } from "./context/UserContext";
import * as Views from "./components/views/index";
import { DayContextProvider } from "./context/DayContext";
import { LookupContextProvider } from "./context/LookupContext";
import { BackendContextProvider } from "./context/BackendContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";

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
          <Route element={<ProtectedRoutes />}>
            <Route path="/working-hours" element={<Views.WorkingHours />} />
            <Route path="/bookings" element={<Views.Bookings />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <BackendContextProvider>
        <UserContextProvider>
          <ThemeContextProvider>
            <LookupContextProvider>
              <DayContextProvider>
                <AppContent />
              </DayContextProvider>
            </LookupContextProvider>
          </ThemeContextProvider>
        </UserContextProvider>
      </BackendContextProvider>
    </BrowserRouter>
  );
};

export default App;
