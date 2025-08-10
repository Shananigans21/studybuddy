import React from 'react';

function ReflectionItem({ item, onEdit, onDelete }) {
    return (
      <div className="reflection-card">
        <h3>{item.feature}</h3>
        <p>{item.reflection}</p>
        <small>{item.date}</small>
        <div className="actions">
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
      </div>
    );
  }
  
  export default ReflectionItem;
  