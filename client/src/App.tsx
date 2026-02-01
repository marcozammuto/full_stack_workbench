import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/shared/Navbar";

import { ThemeContextProvider, useTheme } from "./context/ThemeContext";
import { UserContextProvider } from "./context/UserContext";
import * as Views from "./components/views/index";
import { DayContextProvider } from "./context/DayContext";
import { LookupContextProvider } from "./context/LookupContext";
import { BackendContextProvider } from "./context/BackendContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Footer from "./components/shared/Footer";

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Navbar />
      <main className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Views.Login />} />
            <Route path="/documentation" element={<Views.Documentation />} />
            <Route path="/purpose" element={<Views.Purpose />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/bookings" element={<Views.Bookings />} />
              <Route path="/calculator" element={<Views.Calculator />} />
              <Route path="/counter" element={<Views.Counter />} />
              <Route path="/form" element={<Views.Form />} />
              <Route path="/todo-list" element={<Views.TodoList />} />
              <Route path="/working-hours" element={<Views.WorkingHours />} />
            </Route>
          </Routes>
        </div>
      </main>
      <Footer />
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
