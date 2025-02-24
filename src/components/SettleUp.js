import React, { useEffect, useState } from "react";
import NavigationButtons from "./NavigationButtons";

function SettleUp({ onBack, onHome }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const expenses = JSON.parse(sessionStorage.getItem("expenses")) || {};
    const members = Object.keys(expenses);
    let balances = {};

    members.forEach(member => {
      let totalExpense = parseFloat(expenses[member]?.amount || 0);
      let sharedWith = expenses[member]?.selectedMembers || {};

      let shareCount = Object.keys(sharedWith).length;
      if (shareCount > 0) {
        let shareAmount = totalExpense / (shareCount + 1);

        balances[member] = (balances[member] || 0) - totalExpense + shareAmount;
        Object.keys(sharedWith).forEach(sharedMember => {
          balances[sharedMember] = (balances[sharedMember] || 0) + shareAmount;
        });
      }
    });

    let transactionsList = [];
    let creditors = Object.entries(balances).filter(([_, balance]) => balance > 0);
    let debtors = Object.entries(balances).filter(([_, balance]) => balance < 0);

    creditors.sort((a, b) => b[1] - a[1]);
    debtors.sort((a, b) => a[1] - b[1]);

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      let debtor = debtors[i];
      let creditor = creditors[j];
      let amount = Math.min(Math.abs(debtor[1]), creditor[1]);

      transactionsList.push(`${debtor[0]} owes ${creditor[0]} ₹${amount.toFixed(2)}`);

      debtor[1] += amount;
      creditor[1] -= amount;

      if (debtor[1] === 0) i++;
      if (creditor[1] === 0) j++;
    }

    setTransactions(transactionsList);
  }, []);

  return (
    <div>
      <h2>Settle Up</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>{transaction}</li>
          ))}
        </ul>
      ) : (
        <p>All expenses are already settled!</p>
      )}
      <NavigationButtons onBack={onBack} onHome={onHome} />
    </div>
  );
}

export default SettleUp;
