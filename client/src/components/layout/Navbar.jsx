import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/"); // redirect to home after logout
  }

  return (
    <nav style={{ backgroundColor: "#2c3e50", padding: "1rem" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "1rem", margin: 0, padding: 0 }}>
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        </li>
        <li>
          <Link to="/reflections" style={{ color: "white", textDecoration: "none" }}>Reflections</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/sessions" style={{ color: "white", textDecoration: "none" }}>Sessions</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#e74c3c",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
