// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Get all scheme applications (admin only)
router.get('/applications', authenticateToken, authorizeRoles('admin'), adminController.getAllApplications);

// Submit a review for an application (admin only)
router.post('/review', authenticateToken, authorizeRoles('admin'), adminController.reviewApplication);

// Get all reviews (admin only)
router.get('/reviews', authenticateToken, authorizeRoles('admin'), adminController.getAllReviews);

module.exports = router;
