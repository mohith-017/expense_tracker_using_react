const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, userId, password } = req.body;

  if (!name || !userId || !password) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  // Check if user exists
  const userExists = await User.findOne({ userId });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create user
  const user = await User.create({
    name,
    userId,
    password, // Password will be hashed by the 'pre-save' hook in the model
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      userId: user.userId,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Authenticate a user (login)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { userId, password } = req.body;

  // Check for user by userId
  const user = await User.findOne({ userId });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      userId: user.userId,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};