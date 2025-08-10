import React, { useState } from "react";

function CreateSession() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission logic, e.g., API call or state update
    alert(`Session created: ${title} on ${date}`);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      <h2>Create a New Session</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Session Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginBottom: "1rem" }}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginBottom: "1rem" }}
          />
        </label>
        <button type="submit">Create Session</button>
      </form>
    </div>
  );
}

export default CreateSession;
