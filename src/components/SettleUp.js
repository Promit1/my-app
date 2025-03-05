import React, { useEffect, useState, useRef } from "react";
import NavigationButtons from "./NavigationButtons";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function SettleUp({ onBack, onHome }) {
  const [transactions, setTransactions] = useState([]);
  const pdfRef = useRef(); // Reference for capturing the section

  useEffect(() => {
    const expenses = JSON.parse(sessionStorage.getItem("expenses")) || {};
    const members = Object.keys(expenses);
    let balances = {};

    members.forEach(member => {
      let totalExpense = parseFloat(expenses[member]?.amount || 0);
      let sharedWith = expenses[member]?.selectedMembers || {};
      
      let shareCount = Object.keys(sharedWith).length;
      if (shareCount > 0) {
        let shareAmount = totalExpense / shareCount; // ✅ Correct division

        // ✅ Deduct full amount from payer
        balances[member] = (balances[member] || 0) - totalExpense;

        // ✅ Add correct shares to selected members
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

      transactionsList.push(`${debtor[0]} Will Get ₹${amount.toFixed(2)} From ${creditor[0]} `);

      debtor[1] += amount;
      creditor[1] -= amount;

      if (debtor[1] === 0) i++;
      if (creditor[1] === 0) j++;
    }

    setTransactions(transactionsList);
  }, []);

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("SettleUpSummary.pdf");
    });
  };

  return (
    <div>
      <h2>Settle Up</h2>
      <div ref={pdfRef} style={{ padding: "10px", backgroundColor: "#fff" }}>
        {transactions.length > 0 ? (
          <ListGroup>
            {transactions.map((transaction, index) => (
              <ListGroup.Item key={index}>{transaction}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>All expenses are already settled!</p>
        )}
      </div>

      {transactions.length > 0 && (
        <Button variant="success" onClick={downloadPDF} style={{ marginTop: "10px" }}>
          Download as PDF
        </Button>
      )}

      <NavigationButtons onBack={onBack} onHome={onHome} />
    </div>
  );
}

export default SettleUp;
