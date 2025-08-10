const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

// -- Auth --
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Login failed');
  }
  return response.json();
}

export async function signupUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Signup failed');
  }
  return response.json();
}

// -- Sessions --
export async function fetchSessions() {
  const response = await fetch(`${API_BASE_URL}/sessions`);
  if (!response.ok) throw new Error("Failed to fetch sessions");
  return response.json();
}

export async function createSession(sessionData) {
  const response = await fetch(`${API_BASE_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sessionData),
  });
  if (!response.ok) throw new Error("Failed to create session");
  return response.json();
}

export async function updateSession(id, sessionData) {
  const response = await fetch(`${API_BASE_URL}/sessions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sessionData),
  });
  if (!response.ok) throw new Error("Failed to update session");
  return response.json();
}

export async function deleteSession(id) {
  const response = await fetch(`${API_BASE_URL}/sessions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete session");
  return response.json();
}

export async function inviteUserToSession(sessionId, inviterUserId, inviteeUserId) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inviter_user_id: inviterUserId,
      invitee_user_id: inviteeUserId,
    }),
  });
  if (!response.ok) throw new Error("Failed to send invite");
  return response.json();
}

// -- Reflections --
export async function fetchReflections() {
  const response = await fetch(`${API_BASE_URL}/reflections`);
  if (!response.ok) throw new Error("Failed to fetch reflections");
  return response.json();
}

export async function createReflection(reflectionData) {
  const response = await fetch(`${API_BASE_URL}/reflections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reflectionData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create reflection");
  }
  return response.json();
}

export async function updateReflection(id, reflectionData) {
  const response = await fetch(`${API_BASE_URL}/reflections/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reflectionData),
  });
  if (!response.ok) throw new Error("Failed to update reflection");
  return response.json();
}

export async function deleteReflection(id) {
  const response = await fetch(`${API_BASE_URL}/reflections/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete reflection");
  return response.json();
}
