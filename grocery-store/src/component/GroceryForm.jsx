// src/GroceryForm.js

import React, { useState } from 'react';
import '../GroceryForm.css';

const prices = {
  milk: { unit: 3.97, sale: { quantity: 2, price: 5.00 } },
  bread: { unit: 2.17, sale: { quantity: 3, price: 6.00 } },
  banana: { unit: 0.99 },
  apple: { unit: 0.89 }
};

function GroceryForm({ setReceipt }) {
  const [input, setInput] = useState('');
  const [saleActive, setSaleActive] = useState(true);

  const calculateCost = (items) => {
    const itemCounts = items.reduce((counts, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});

    let totalCost = 0;
    let totalSavings = 0;
    let receiptItems = [];

    for (const [item, count] of Object.entries(itemCounts)) {
      if (prices[item]) {
        const { unit, sale } = prices[item];
        let itemCost = 0;

        if (sale && saleActive) {
          const saleCount = Math.floor(count / sale.quantity);
          const regularCount = count % sale.quantity;
          itemCost = (saleCount * sale.price) + (regularCount * unit);
          totalSavings += (saleCount * (sale.quantity * unit - sale.price));
        } else {
          itemCost = count * unit;
        }

        totalCost += itemCost;
        receiptItems.push({ item, count, price: itemCost.toFixed(2) });
      }
    }

    return {
      receiptItems,
      totalCost: totalCost.toFixed(2),
      totalSavings: totalSavings.toFixed(2)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = input.split(',').map(item => item.trim().toLowerCase());
    const result = calculateCost(items);
    setReceipt(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Please enter all the items purchased separated by a comma:
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={saleActive} 
            onChange={() => setSaleActive(!saleActive)} 
          />
          Sale Live
        </label>
        <button type="submit">Calculate</button>
      </form>

      
    </div>
  );
}

export default GroceryForm;
