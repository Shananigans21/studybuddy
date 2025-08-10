import React, { useState, useEffect } from "react";

function ReflectionForm({ onSubmit, editData, clearEdit }) {
  const [feature, setFeature] = useState("");
  const [reflection, setReflection] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editData) {
      setFeature(editData.feature || "");
      setReflection(editData.reflection || "");
      setCategory(editData.category || "General");
      setDate(editData.date || new Date().toISOString().slice(0, 10));
    } else {
      setFeature("");
      setReflection("");
      setCategory("General");
      setDate("");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feature.trim() || !reflection.trim() || !date) {
      alert("Please fill out Feature, Reflection, and Date.");
      return;
    }
    const newReflection = {
      id: editData ? editData.id : Date.now(),
      feature: feature.trim(),
      reflection: reflection.trim(),
      category,
      date,
    };
    onSubmit(newReflection);
    if (clearEdit) clearEdit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h2>{editData ? "Edit Reflection" : "Add Reflection"}</h2>

      <label>
        Feature:<br />
        <input
          type="text"
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Reflection:<br />
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={4}
          required
        />
      </label>
      <br />

      <label>
        Category:<br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Debugging">Debugging</option>
        </select>
      </label>
      <br />

      <label>
        Date:<br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
