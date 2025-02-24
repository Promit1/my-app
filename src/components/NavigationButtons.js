import React from "react";

function NavigationButtons({ onBack, onHome,onSettleUp }) {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <button onClick={onHome}>Home</button>
      {onSettleUp && <button onClick={onSettleUp}>Settle Up</button>}
    </div>
  );
}

export default NavigationButtons;
