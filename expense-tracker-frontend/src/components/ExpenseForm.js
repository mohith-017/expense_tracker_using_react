import React, { useState, useContext } from 'react'; // Import useContext
import AuthContext from '../context/AuthContext'; // Import AuthContext
import './ExpenseForm.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  
  const { token } = useContext(AuthContext); // Get token

  const addExpenseHandler = async (e) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    try {
      await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add auth header
        },
        body: JSON.stringify({
          description,
          amount: +amount,
          date,
        }),
      });

      onAddExpense(); // Re-fetch expenses
      setDescription('');
      setAmount('');
      setDate('');
    } catch (err) {
      console.error(err.message);
    }
  };
  
  // ... rest of your component (return JSX) ...
  // No changes needed in the JSX
  return (
    <form onSubmit={addExpenseHandler} className="expense-form">
      {/* ... your input fields ... */}
    </form>
  );
};

export default ExpenseForm;