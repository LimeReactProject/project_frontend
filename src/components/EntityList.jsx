// 예시: src/components/EntityList.js
import React, { useEffect, useState } from "react";

function EntityList() {
  const [entities, setEntities] = useState([]);
  const [newName, setNewName] = useState("");

useEffect(() => {
  fetch("http://localhost:8080/api/board/user-ids")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) setEntities(data.map(userId => ({ name: userId })));
      else setEntities([]);
    })
    .catch(err => {
      setEntities([]);
      console.error(err);
    });
}, []);

  const handleAdd = () => {
    fetch("http://localhost:8080/api/entities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }) // EntityModel에 맞게 수정
    })
      .then(res => res.json())
      .then(data => setEntities([...entities, data]));
  };

  return (
    <div>
      <h2>Entities</h2>
      <ul>
        {entities.map((e,idx) => (
          <li key={idx}>{e.name}</li>
        ))}
      </ul>
      <input value={newName} onChange={e => setNewName(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default EntityList;