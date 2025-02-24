import React, { useState, useEffect } from "react";
import NavigationButtons from "./NavigationButtons";

function ExpenseSummary({ onBack, onHome, onSettleUp }) {
  const [expenses, setExpenses] = useState({});

  useEffect(() => {
    const storedExpenses = JSON.parse(sessionStorage.getItem("expenses")) || {};
    setExpenses(storedExpenses);
  }, []);

  return (
    <div>
      <h2>Expense Summary</h2>
      {Object.keys(expenses).length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Member</th>
              <th>Total Amount</th>
              <th>Shared With</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(expenses).map(([member, data]) => (
              <tr key={member}>
                <td>{member}</td>
                <td>{data.amount}</td>
                <td>
                  {Object.keys(data.selectedMembers)
                    .filter((m) => data.selectedMembers[m])
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <NavigationButtons onBack={onBack} onHome={onHome} />
      <button onClick={onSettleUp}>Settle Up</button> {/* Settle Up button */}
    </div>
  );
}

export default ExpenseSummary;
