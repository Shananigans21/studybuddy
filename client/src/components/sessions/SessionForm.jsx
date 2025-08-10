import React, { useState } from "react";
import { createSession } from "../api/api";

function SessionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    topic: "",
    date: "",
    duration: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createSession(formData)
      .then((newSession) => {
        onAdd?.(newSession);
        setFormData({ topic: "", date: "", duration: "" });
      })
      .catch((err) => console.error("Failed to create session:", err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Study Session</h2>
      <input
        name="topic"
        placeholder="Topic"
        value={formData.topic}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (minutes)"
        value={formData.duration}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Session</button>
    </form>
  );
}

export default SessionForm;
