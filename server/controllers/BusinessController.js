const { Business } = require('../models');

// Create new business (business owner)
const createBusiness = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    data.user_id = userId;

    const business = await Business.create(data);
    res.status(201).json(business);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get businesses of logged-in user
const getMyBusinesses = async (req, res) => {
  try {
    const userId = req.user.id;
    const businesses = await Business.findAll({ where: { user_id: userId } });
    res.json(businesses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get business by ID (only owner or gov_employee)
const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findByPk(id);
    if (!business) return res.status(404).json({ message: 'Business not found' });

    // Authorization: owner or gov_employee
    if (business.user_id !== req.user.id && req.user.role !== 'gov_employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(business);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update business (owner only)
const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findByPk(id);
    if (!business) return res.status(404).json({ message: 'Business not found' });

    if (business.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await business.update(req.body);
    res.json(business);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBusiness,
  getMyBusinesses,
  getBusinessById,
  updateBusiness,
};
