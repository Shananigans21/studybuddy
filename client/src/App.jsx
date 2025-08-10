import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Reflections from "./pages/Reflections";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sessions from "./pages/Sessions";
import CreateSession from "./pages/CreateSession"; // New create session page import
import "./index.css";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Dashboard
                onLogout={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                }}
              />
            ) : (
              <Home />
            )
          }
        />

        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />

        <Route path="/reflections" element={<Reflections />} />

        {/* Protected Sessions route */}
        <Route
          path="/sessions"
          element={
            isLoggedIn ? <Sessions /> : <Navigate to="/login" replace />
          }
        />

        {/* Protected Create Session route */}
        <Route
          path="/sessions/create"
          element={
            isLoggedIn ? (
              <CreateSession />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
