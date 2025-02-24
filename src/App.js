import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import AddMembers from "./components/AddMembers";
import MemberList from "./components/MemberList";
import ExpenseSummary from "./components/ExpenseSummary";
import SettleUp from "./components/SettleUp";

function App() {
  const [step, setStep] = useState("home");

  return (
    <div className="App">
      {step === "home" && <Home onStart={() => setStep("addMembers")} />}
      {step === "addMembers" && (
        <AddMembers
          onDone={() => setStep("memberList")}
          onBack={() => setStep("home")}
          onHome={() => setStep("home")}
        />
      )}
      {step === "memberList" && (
        <MemberList
          onBack={() => setStep("addMembers")}
          onHome={() => setStep("home")}
          onViewSummary={() => setStep("expenseSummary")}
        />
      )}
      {step === "expenseSummary" && (
        <ExpenseSummary
          onBack={() => setStep("memberList")}
          onHome={() => setStep("home")}
          onSettleUp={() => setStep("settleUp")} // Pass Settle Up button functionality
        />
      )}
      {step === "settleUp" && (
        <SettleUp
          onBack={() => setStep("expenseSummary")}
          onHome={() => setStep("home")}
        />
      )}
    </div>
  );
}

export default App;
