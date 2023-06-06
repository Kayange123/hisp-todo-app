import React from "react";
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;
