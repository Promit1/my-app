import React from "react";
import Button from 'react-bootstrap/Button';

function NavigationButtons({ onBack, onHome,onSettleUp }) {
  return (
    <div>
      <Button className="bttns" variant="secondary" onClick={onBack}>Back</Button>
      <Button className="bttns" variant="secondary" onClick={onHome}>Home</Button>
      {onSettleUp && <Button variant="info" onClick={onSettleUp}>Settle Up</Button>}
    </div>
  );
}

export default NavigationButtons;
