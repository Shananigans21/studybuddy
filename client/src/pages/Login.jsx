import React, { useState } from "react";
import { loginUser, signupUser } from "../api/api";

function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "", // signup only
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ username: "", email: "", password: "" });
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || (isSignup && !formData.email)) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isSignup) {
        const data = await signupUser(formData);
        alert(data.message || "Signup successful!");
        toggleForm(); // Switch to login after signup
      } else {
        const data = await loginUser(formData);
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        // TODO: call a passed-in callback or context update to update auth state
      }
    } catch (err) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>{isSignup ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:<br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {isSignup && (
          <>
            <label>
              Email:<br />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <br />
          </>
        )}
        <label>
          Password:<br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading
            ? isSignup
              ? "Signing Up..."
              : "Logging In..."
            : isSignup
            ? "Sign Up"
            : "Log In"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: 15 }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={toggleForm}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {isSignup ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default LoginSignup;
