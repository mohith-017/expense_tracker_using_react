const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenses');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow requests from our frontend
app.use(express.json()); // Allow us to accept JSON data in the body

// API Routes
app.use('/api/expenses', expenseRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Expense Tracker API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));