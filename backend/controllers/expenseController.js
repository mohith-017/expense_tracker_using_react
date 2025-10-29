const Expense = require('../models/Expense');

// @desc    Get all expenses for the logged-in user
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  try {
    // Only find expenses that belong to the logged-in user
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add a new expense for the logged-in user
// @route   POST /api/expenses
// @access  Private
const addExpense = async (req, res) => {
  const { description, amount, date } = req.body;

  try {
    const newExpense = new Expense({
      description,
      amount,
      date,
      user: req.user.id, // Associate expense with the user
    });

    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete an expense for the logged-in user
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Check if the expense belongs to the user
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await expense.remove();
    res.json({ message: 'Expense removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
};