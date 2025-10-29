const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }); // Get newest first
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add an expense
// @route   POST /api/expenses
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;

    const newExpense = await Expense.create(req.body);

    res.status(201).json({
      success: true,
      data: newExpense,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};