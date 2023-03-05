import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Box, Divider, Heading } from "@chakra-ui/react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
