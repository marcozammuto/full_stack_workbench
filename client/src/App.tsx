import "./App.css";
import Navbar from "./components/Navbar";

console.log(.env.VITE_NODE_ENDPOINT);

const App = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
    </>
  );
};

export default App;
