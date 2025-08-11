// controllers/AdminController.js
const { ApplicationReview, SchemeApplication, GovernmentScheme, GovernmentEmployee, LicenseApplication } = require('../models');

module.exports = {
  async getAllApplications(req, res) {
    try {
      const applications = await SchemeApplication.findAll({ include: GovernmentScheme });
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch applications', error });
    }
  },

  async reviewApplication(req, res) {
    try {
      const { application_id, reviewer_id, review_notes, status } = req.body;

      const review = await ApplicationReview.create({
        application_id,
        reviewer_id,
        review_notes,
        status,
      });

      // Optional: update application status
      await SchemeApplication.update({ status }, { where: { id: application_id } });

      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: 'Review failed', error });
    }
  },

  async getAllReviews(req, res) {
    try {
      const reviews = await ApplicationReview.findAll({ include: [SchemeApplication, GovernmentEmployee] });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews', error });
    }
  },

  // License Applications (admin/gov view)
  async getAllLicenseApplications(req, res) {
    try {
      if (req.user.role !== 'admin' && req.user.role !== 'gov_employee') {
        return res.status(403).json({ message: 'Access denied' });
      }
      const apps = await LicenseApplication.findAll();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch license applications', error });
    }
  },

  async updateLicenseApplicationStatus(req, res) {
    try {
      if (req.user.role !== 'admin' && req.user.role !== 'gov_employee') {
        return res.status(403).json({ message: 'Access denied' });
      }
      const { id } = req.params;
      const { status, comments } = req.body;
      const app = await LicenseApplication.findByPk(id);
      if (!app) return res.status(404).json({ message: 'Application not found' });
      if (status) app.status = status;
      if (comments) app.comments = comments;
      await app.save();
      res.json(app);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update license application', error });
    }
  },
};
