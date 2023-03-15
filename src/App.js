import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoInternet from "./components/NoInternet";
import Test from "./pages/Test";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  return (
    <>
      <div>{!isOnline && <NoInternet />}</div>

      {isOnline && (
        <>
          <Router>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/*" element={<Home />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="test" element={<Test />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
          </Router>
        </>
      )}
    </>
  );
};

export default App;
