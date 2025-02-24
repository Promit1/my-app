import React from "react";

function Home({ onStart }) {
  return (
    <div>
      <h1>Welcome to Expence Managar</h1>
      <button onClick={onStart}>Add Members</button>
    </div>
  );
}

export default Home;
