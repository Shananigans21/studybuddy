import React, { useState, useEffect } from "react";
import {
  fetchSessions,
  createSession,
  updateSession,
  deleteSession,
  inviteUserToSession,
} from "../api/api";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions()
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCreateSession = (newSession) => {
    createSession(newSession)
      .then((saved) => setSessions((prev) => [...prev, saved]))
      .catch((err) => console.error("Error creating session:", err));
  };

  const handleUpdateSession = (id, updatedFields) => {
    updateSession(id, updatedFields)
      .then((updated) => {
        setSessions((prev) =>
          prev.map((session) =>
            session.id === updated.id ? updated : session
          )
        );
      })
      .catch((err) => console.error("Error updating session:", err));
  };

  const handleDeleteSession = (id) => {
    deleteSession(id)
      .then(() => {
        setSessions((prev) => prev.filter((session) => session.id !== id));
      })
      .catch((err) => console.error("Error deleting session:", err));
  };

  const handleInviteUser = (sessionId, inviterId, inviteeId) => {
    inviteUserToSession(sessionId, inviterId, inviteeId)
      .then((invite) => {
        console.log("Invitation sent:", invite);
      })
      .catch((err) => console.error("Error sending invite:", err));
  };

  if (loading) return <p>Loading sessions...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Sessions</h2>
      <ul>
        {sessions.map(({ id, subject, topic, duration_minutes, date }) => (
          <li key={id}>
            <strong>{subject}</strong> - {topic} ({duration_minutes} min) on{" "}
            {new Date(date).toLocaleDateString()}
            <button onClick={() => handleDeleteSession(id)}>Delete</button>
            {/* Add edit/update UI as needed */}
          </li>
        ))}
      </ul>
      {/* Add form/UI for adding session and inviting users */}
    </div>
  );
}

export default Sessions;
