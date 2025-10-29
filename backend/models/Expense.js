const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Expense', ExpenseSchema);