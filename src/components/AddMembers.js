import React, { useState, useEffect } from "react";
import NavigationButtons from "./NavigationButtons";

function AddMembers({ onDone, onBack, onHome }) {
  const [name, setName] = useState("");
  const [members, setMembers] = useState(() => {
    const savedMembers = sessionStorage.getItem("members");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const addMember = () => {
    if (name.trim() !== "") {
      setMembers([...members, name]);
      setName("");
    }
  };

  return (
    <div>
      <h2>Add Members</h2>
      <input
        type="text"
        placeholder="Enter member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addMember}>+</button>
      <button onClick={onDone}>Done</button>
      <NavigationButtons onBack={onBack} onHome={onHome} />
    </div>
  );
}

export default AddMembers;
