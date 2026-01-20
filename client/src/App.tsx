import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Login from "./components/views/Login";
import Documentation from "./components/views/Documentation";
import Purpose from "./components/views/Purpose";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/purpose" element={<Purpose />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
