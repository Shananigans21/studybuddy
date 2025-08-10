import React, { useState, useEffect } from "react";

function ReflectionForm({ onSubmit, editData, clearEdit }) {
  const [text, setText] = useState("");
  const [moodRating, setMoodRating] = useState(5);

  useEffect(() => {
    if (editData) {
      setText(editData.text || "");
      setMoodRating(editData.mood_rating || 5);
    } else {
      setText("");
      setMoodRating(5);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Please enter your reflection text.");
      return;
    }

    const newReflection = {
      id: editData ? editData.id : Date.now(),
      user_id: 1,          // hardcoded user_id for now, replace with actual
      session_id: 1,       // hardcoded session_id for now, replace with actual
      text: text.trim(),
      mood_rating: moodRating,
      ai_generated: false,
    };

    onSubmit(newReflection);
    if (clearEdit) clearEdit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h2>{editData ? "Edit Reflection" : "Add Reflection"}</h2>

      <label>
        Reflection Text:<br />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          required
        />
      </label>
      <br />

      <label>
        Mood Rating (1-5):<br />
        <input
          type="number"
          min="1"
          max="5"
          value={moodRating}
          onChange={(e) => setMoodRating(Number(e.target.value))}
          required
        />
      </label>
      <br />

      <button type="submit" style={{ marginTop: "0.5rem" }}>
        {editData ? "Update" : "Submit"}
      </button>
      {editData && (
        <button
          type="button"
          onClick={clearEdit}
          style={{ marginLeft: "1rem" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ReflectionForm;
