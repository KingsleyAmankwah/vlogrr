import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Navbar />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
