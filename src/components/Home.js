import React from "react";
import Button from 'react-bootstrap/Button';

function Home({ onStart }) {
  return (
    <div>
      <h1>Welcome to Expence Managar</h1>
      <Button variant="primary" onClick={onStart}>ADD MEMBERS</Button>
    </div>
  );
}

export default Home;
