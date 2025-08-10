const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",  // <-- IMPORTANT for cookies/session
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to login");
  }
  return res.json();
}
