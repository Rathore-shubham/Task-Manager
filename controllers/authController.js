const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Add bcrypt import

// Register function
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
