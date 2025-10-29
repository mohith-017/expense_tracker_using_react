import React from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

const ExpenseList = (props) => {
  // Show a message if there are no expenses
  if (props.items.length === 0) {
    return <h2 className="expenses-list-fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {/* We use .map() to transform our array of expense objects
        into an array of <ExpenseItem /> components
      */}
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          category={expense.category}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;