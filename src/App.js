import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Test from "./pages/Test";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Navbar />} />
        <Route path="/*" element={<Home />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
