// controllers/AdminController.js
const { ApplicationReview, SchemeApplication, GovernmentScheme, GovernmentEmployee } = require('../models');

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
};
