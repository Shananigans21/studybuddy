import React from "react";
import ReflectionItem from "./ReflectionItem";

function ReflectionList({ reflections, onEdit, onDelete }) {
  return (
    <div className="reflection-list">
      <h2>Saved Reflections</h2>
      {reflections.length === 0 ? (
        <p>No reflections yet.</p>
      ) : (
        reflections.map((item) => (
          <ReflectionItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default ReflectionList;
