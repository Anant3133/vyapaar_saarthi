const { GovernmentScheme } = require('../models');

// Create a new scheme (gov_employee only)
const createScheme = async (req, res) => {
  try {
    if (req.user.role !== 'gov_employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { title, description, eligibility_criteria, start_date, end_date } = req.body;

    const scheme = await GovernmentScheme.create({
      title,
      description,
      eligibility_criteria,
      start_date,
      end_date,
    });

    res.status(201).json(scheme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create scheme' });
  }
};

// Get all schemes (accessible to all roles)
const getAllSchemes = async (req, res) => {
  try {
    const schemes = await GovernmentScheme.findAll();
    res.json(schemes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch schemes' });
  }
};

// Get a scheme by ID
const getSchemeById = async (req, res) => {
  try {
    const { id } = req.params;

    const scheme = await GovernmentScheme.findByPk(id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.json(scheme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch scheme' });
  }
};

// Update a scheme (gov_employee only)
const updateScheme = async (req, res) => {
  try {
    if (req.user.role !== 'gov_employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;
    const updates = req.body;

    const scheme = await GovernmentScheme.findByPk(id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    await scheme.update(updates);
    res.json(scheme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update scheme' });
  }
};

// Delete a scheme (gov_employee only)
const deleteScheme = async (req, res) => {
  try {
    if (req.user.role !== 'gov_employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;

    const scheme = await GovernmentScheme.findByPk(id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    await scheme.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete scheme' });
  }
};

module.exports = {
  createScheme,
  getAllSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme,
};
