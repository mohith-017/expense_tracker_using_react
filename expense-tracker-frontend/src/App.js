import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './App.css';

import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import MainNavigation from './components/MainNavigation';
import Dashboard from './components/Dashboard';

// This is the URL of our new backend server
const API_URL = 'http://localhost:5000/api/expenses';

function App() {
  // Start with an empty array. Data will come from the API.
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // This function fetches data from the backend
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
      // The data is inside res.data.data
      setExpenses(res.data.data); 
      setLoading(false);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setLoading(false);
    }
  };

  // useEffect runs once when the component loads
  useEffect(() => {
    fetchExpenses();
  }, []); // The empty array [] means it only runs on mount

  // This function now POSTs data to our backend
  const addExpenseHandler = async (expenseData) => {
    try {
      // Send the new expense to the API
      const res = await axios.post(API_URL, expenseData);
      
      // Add the new expense (from the DB) to our state
      setExpenses((prevExpenses) => {
        // res.data.data is the new expense object from the database
        return [res.data.data, ...prevExpenses];
      });
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  // Show a loading message while fetching
  if (loading) {
    return (
      <div>
        <MainNavigation />
        <main className="app-container">
          <h1>Loading Expenses...</h1>
        </main>
      </div>
    );
  }
  
  // Once loaded, show the app
  return (
    <div>
      <MainNavigation />
      <main className="app-container">
        <Routes>
          {/* Route 1: The main expenses page */}
          <Route
            path="/"
            element={
              <>
                <h1>My Expense Tracker</h1>
                <ExpenseForm onAddExpense={addExpenseHandler} />
                <ExpenseList items={expenses} />
              </>
            }
          />
          
          {/* Route 2: The new dashboard page */}
          <Route
            path="/dashboard"
            element={
              <>
                <h1>Dashboard</h1>
                <Dashboard expenses={expenses} />
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;