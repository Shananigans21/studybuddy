import React, { useState } from 'react';
import { loginUser } from '../api';  // <-- We'll create this in api.js

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    loginUser({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setError('');
          onLogin();
        } else {
          setError(data.error || 'Login failed');
        }
      })
      .catch(() => {
        setError('Server error. Please try again later.');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
