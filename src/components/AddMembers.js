import React, { useState, useEffect } from "react";
import NavigationButtons from "./NavigationButtons";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import "../App.css";


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
    <Container>
    <div className="md-md-sm-3 flexMainContainer"> 
      
      {/* <input
        type="text"
        placeholder="Enter member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> */}
      <div className="flexSubContainer">
      <FloatingLabel
        controlId="floatingInput"
        label="Enter Member Name"
        className="mb-md-3 sm-3"
      >
        <Form.Control value={name}
        onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter member Name" />
      </FloatingLabel>
      
      <Button className="bttns" variant="outline-warning" onClick={addMember}>+</Button>
      <Button className="bttns" variant="success" onClick={onDone}>Done</Button>
      </div>
      <NavigationButtons onBack={onBack} onHome={onHome} />
    </div>
    </Container>
  );
}

export default AddMembers;
