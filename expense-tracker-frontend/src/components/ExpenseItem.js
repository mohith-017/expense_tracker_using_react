import React from 'react';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  // Convert the date string from the database back into a Date object
  const date = new Date(props.date);

  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  const year = date.getFullYear();

  return (
    <li className="expense-item">
      <div className="expense-date">
        <div className="expense-date-month">{month}</div>
        <div className="expense-date-year">{year}</div>
        <div className="expense-date-day">{day}</div>
      </div>
      <div className="expense-item-description">
        <h2>{props.title}</h2>
        <div className="expense-item-category">{props.category}</div>
      </div>
      <div className="expense-item-price">₹{props.amount.toFixed(2)}</div>
    </li>
  );
};

export default ExpenseItem;