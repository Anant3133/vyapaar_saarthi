const { SchemeApplication, GovernmentScheme, User } = require('../models');

// Apply for a government scheme
const applyForScheme = async (req, res) => {
  try {
    const userId = req.user.id;
    const { scheme_id, application_data } = req.body;

    const scheme = await GovernmentScheme.findByPk(scheme_id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    const application = await SchemeApplication.create({
      user_id: userId,
      scheme_id,
      application_data,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to apply for scheme' });
  }
};

// Get all scheme applications by the logged-in user
const getMySchemeApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await SchemeApplication.findAll({
      where: { user_id: userId },
    });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

// Get all scheme applications (admin only)
const getAllSchemeApplications = async (req, res) => {
  try {
    if (req.user.role !== 'gov_employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const applications = await SchemeApplication.findAll({
      include: [{ model: User, attributes: ['full_name', 'email'] }],
    });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

// Update scheme application status (admin only)
const updateSchemeApplicationStatus = async (req, res) => {
  try {
    if (req.user.role !== 'gov_employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;
    const { status, feedback } = req.body;

    const application = await SchemeApplication.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status || application.status;
    application.feedback = feedback || application.feedback;
    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update application' });
  }
};

module.exports = {
  applyForScheme,
  getMySchemeApplications,
  getAllSchemeApplications,
  updateSchemeApplicationStatus,
};
