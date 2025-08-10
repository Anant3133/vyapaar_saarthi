// controllers/authController.js
const { User } = require('../models');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

exports.register = async (req, res) => {
  try {
    const { full_name, email, password, phone_number, city, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Validate role if provided
    const validRoles = ['business_owner', 'gov_employee'];
    const userRole = validRoles.includes(role) ? role : 'business_owner';

    // Hash password
    const password_hash = await hashPassword(password);

    // Create new user
    const user = await User.create({
      full_name,
      email,
      phone_number,
      city,
      role: userRole,
      password_hash,
    });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
