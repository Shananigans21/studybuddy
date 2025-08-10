import React, { useState, useEffect } from "react";
import ReflectionForm from "../components/reflections/ReflectionForm";
import ReflectionList from "../components/reflections/ReflectionList";
import {
  fetchReflections,
  createReflection,
  updateReflection,
  deleteReflection,
} from "../api/api";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

function Reflections() {
  const [reflections, setReflections] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReflections()
      .then((data) => {
        setReflections(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredReflections = reflections
    .filter(
      (r) =>
        r.feature.toLowerCase().includes(search.toLowerCase()) ||
        r.reflection.toLowerCase().includes(search.toLowerCase())
    )
    .filter((r) => (filter === "All" ? true : r.category === filter))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleAddOrUpdate = (newReflection) => {
    if (editData) {
      updateReflection(newReflection.id, newReflection)
        .then((updated) => {
          setReflections((prev) =>
            prev.map((r) => (r.id === updated.id ? updated : r))
          );
          setEditData(null);
        })
        .catch((err) => setError(err.message));
    } else {
      createReflection(newReflection)
        .then((saved) => setReflections((prev) => [...prev, saved]))
        .catch((err) => setError(err.message));
    }
  };

  const handleDelete = (id) => {
    deleteReflection(id)
      .then(() => setReflections((prev) => prev.filter((r) => r.id !== id)))
      .catch((err) => setError(err.message));
  };

  const clearEdit = () => setEditData(null);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading reflections...</p>;
  }

  return (
    <main style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Reflections</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ReflectionForm onSubmit={handleAddOrUpdate} editData={editData} clearEdit={clearEdit} />

      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search reflections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem", width: "60%", marginRight: "1rem" }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "0.5rem", width: "35%" }}
        >
          <option value="All">All</option>
          <option value="Statistics">Statistics</option>
          <option value="Math">Math</option>
          <option value="Biology">Biology</option>
          <option value="History">History</option>
        </select>
      </div>

      <ReflectionList
        reflections={filteredReflections}
        onEdit={setEditData}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default Reflections;
