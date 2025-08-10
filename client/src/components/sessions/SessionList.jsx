import React, { useEffect, useState } from "react";
import { fetchSessions, deleteSession } from "../api/api";

function SessionList() {
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

  const handleDelete = (id) => {
    deleteSession(id)
      .then(() => {
        setSessions((prev) => prev.filter((session) => session.id !== id));
      })
      .catch((err) => {
        setError(`Delete failed: ${err.message}`);
      });
  };

  if (loading) return <p>Loading sessions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Study Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions yet.</p>
      ) : (
        <ul>
          {sessions.map(({ id, subject, topic, date, duration_minutes }) => (
            <li key={id}>
              <strong>{subject}</strong> - {topic} - {date} - {duration_minutes} min{" "}
              <button onClick={() => handleDelete(id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SessionList;
