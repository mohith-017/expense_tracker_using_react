import React, { useState, useEffect, useContext } from 'react';
import Dashboard from '../components/Dashboard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import AuthContext from '../context/AuthContext';

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const { token } = useContext(AuthContext); // Get token from context

  const fetchExpenses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`, // Add auth header
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Re-fetch if token changes (e.g., on login)

  return (
    <>
      <Dashboard expenses={expenses} />
      <ExpenseForm onAddExpense={fetchExpenses} />
      <ExpenseList expenses={expenses} onDeleteExpense={fetchExpenses} />
    </>
  );
};

export default DashboardPage;