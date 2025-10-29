const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
  deleteExpense,
} = require('../controllers/expenseController');

// Import auth middleware
const { protect } = require('../middleware/authMiddleware');

// Add 'protect' to your routes
router.route('/').get(protect, getExpenses).post(protect, addExpense);
router.route('/:id').delete(protect, deleteExpense);

module.exports = router;