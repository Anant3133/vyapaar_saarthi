const { User } = require('../models');

// Get logged-in user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash', 'two_factor_secret'] },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update logged-in user profile
const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    // Remove password update here, it should have separate endpoint
    delete updates.password_hash;
    delete updates.role; // disallow role update here

    const [updated] = await User.update(updates, {
      where: { id: req.user.id },
    });

    if (!updated) return res.status(404).json({ message: 'User not found' });

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash', 'two_factor_secret'] },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// (Optional) Admin-only: list all users
const listUsers = async (req, res) => {
  try {
    if (req.user.role !== 'gov_employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const users = await User.findAll({
      attributes: { exclude: ['password_hash', 'two_factor_secret'] },
      order: [['createdAt', 'DESC']],
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  listUsers,
};J
