import "../App.css";
import React, { useState, useEffect } from "react";
import NavigationButtons from "./NavigationButtons";

function MemberList({ onBack, onHome, onViewSummary }) {
  const members = JSON.parse(sessionStorage.getItem("members")) || [];
  const [selectedMember, setSelectedMember] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedMembers, setSelectedMembers] = useState({});

  useEffect(() => {
    const storedData = sessionStorage.getItem("expenses");
    if (storedData) {
      setSelectedMembers(JSON.parse(storedData));
    }
  }, []);

  const openPopup = (member) => {
    setSelectedMember(member);
    setShowPopup(true);
    const existingData = JSON.parse(sessionStorage.getItem("expenses")) || {};
    setTotalAmount(existingData[member]?.amount || "");
    setSelectedMembers(existingData[member]?.selectedMembers || {});
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedMember(null);
    setTotalAmount("");
    setSelectedMembers({});
  };

  const handleCheckboxChange = (member) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [member]: !prev[member],
    }));
  };

  const saveData = () => {
    const existingData = JSON.parse(sessionStorage.getItem("expenses")) || {};
    existingData[selectedMember] = { amount: totalAmount, selectedMembers };
    sessionStorage.setItem("expenses", JSON.stringify(existingData));
  };

  const handleSubmit = () => {
    saveData();
    closePopup();
  };

  return (
    <div>
      <h2>Group Members</h2>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{member}</td>
              <td>
                <button onClick={() => openPopup(member)}>
                  Enter Total Expense of {member}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Expense Summary Button */}
      <button onClick={onViewSummary} style={{ marginTop: "10px" }}>
        View Expense Summary
      </button>

      <NavigationButtons onBack={onBack} onHome={onHome} />

      {/* Popup Form */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Add your Total Expense for <strong>{selectedMember}</strong></p>
            <input
              type="number"
              placeholder="Enter Total Amount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
            <p>Select Members:</p>
            {members.map((member) => (
              <div key={member}>
                <input
                  type="checkbox"
                  checked={!!selectedMembers[member]}
                  onChange={() => handleCheckboxChange(member)}
                />
                <label>{member}</label>
              </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberList;
