import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredCategory, setEnteredCategory] = useState('Food');

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault(); 

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate), 
      category: enteredCategory,
      id: Math.random().toString(), 
    };

    props.onAddExpense(expenseData);

    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
    setEnteredCategory('Food');
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <div className="form-controls">
          <div className="form-control">
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
              required
            />
          </div>
          <div className="form-control">
            <label>Amount (₹)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
              required
            />
          </div>
          <div className="form-control">
            <label>Date</label>
            <input
              type="date"
              min="2024-01-01"
              max="2028-12-31"
              value={enteredDate}
              onChange={dateChangeHandler}
              required
            />
          </div>
          <div className="form-control">
            <label>Category</label>
            <select value={enteredCategory} onChange={categoryChangeHandler}>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;