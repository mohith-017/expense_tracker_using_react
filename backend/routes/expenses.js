const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
} = require('../controllers/expenseController');

// This line connects to the controller
router.route('/').get(getExpenses).post(addExpense);

module.exports = router;