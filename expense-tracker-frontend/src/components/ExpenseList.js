import React, { useContext } from 'react'; // Import useContext
import AuthContext from '../context/AuthContext'; // Import AuthContext
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const { token } = useContext(AuthContext); // Get token

  const deleteExpenseHandler = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Add auth header
        },
      });
      onDeleteExpense(); // Re-fetch expenses
    } catch (err) {
      console.error(err.message);
    }
  };

  if (expenses.length === 0) {
    return <p className="expense-list-empty">No expenses found.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          id={expense._id}
          description={expense.description}
          amount={expense.amount}
          date={expense.date}
          onDelete={deleteExpenseHandler}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;