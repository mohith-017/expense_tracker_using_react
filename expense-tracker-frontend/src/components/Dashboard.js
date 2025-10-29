import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = (props) => {
  const { expenses } = props;

  // --- 1. Summary Logic ---
  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  
  const totalItems = expenses.length;
  const averageExpense = totalItems === 0 ? 0 : totalExpense / totalItems;

  // --- 2. Chart Data Logic ---
  const categoryExpenses = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryExpenses),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
        font: {
            size: 18
        }
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>Expenses Summary</h2>
      <div className="summary-grid">
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <p>₹{totalExpense.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Total Items</h3>
          <p>{totalItems}</p>
        </div>
        <div className="summary-card">
          <h3>Average Expense</h3>
          <p>₹{averageExpense.toFixed(2)}</p>
        </div>
      </div>

      <h2>Expenses by Category</h2>
      <div className="chart-container">
        {expenses.length > 0 ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <p>No expenses to display in chart.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;