// src/App.js

import React, { useState } from 'react';
import GroceryForm from './component/GroceryForm';
import './App.css';

function App() {
  const [receipt, setReceipt] = useState(null);

  return (
    <div className="App">
      <h1>Grocery Store</h1>
      <GroceryForm setReceipt={setReceipt} />

      {receipt && (
        <div className="receipt">
          <h2>Receipt</h2>
          {receipt.receiptItems.map(({ item, count, price }) => (
            <div key={item} className="receipt-item">
              <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
              <span>{count} x ${price}</span>
            </div>
          ))}
          <div className="receipt-item">
            <strong>Total price</strong>
            <strong>${receipt.totalCost}</strong>
          </div>
          <div className="receipt-item">
            <strong>You saved</strong>
            <strong>${receipt.totalSavings} today</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
