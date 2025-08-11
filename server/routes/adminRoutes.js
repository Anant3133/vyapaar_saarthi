// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const complaintController = require('../controllers/ComplaintController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Get all scheme applications (admin only)
router.get('/applications', authenticateToken, authorizeRoles('admin'), adminController.getAllApplications);

// Submit a review for an application (admin only)
router.post('/review', authenticateToken, authorizeRoles('admin'), adminController.reviewApplication);

// Get all reviews (admin only)
router.get('/reviews', authenticateToken, authorizeRoles('admin'), adminController.getAllReviews);

// License application admin endpoints
router.get('/license-applications', authenticateToken, authorizeRoles('admin', 'gov_employee'), adminController.getAllLicenseApplications);
router.put('/license-applications/:id/status', authenticateToken, authorizeRoles('admin', 'gov_employee'), adminController.updateLicenseApplicationStatus);

// Complaints management
router.get('/complaints', authenticateToken, authorizeRoles('admin', 'gov_employee'), complaintController.listComplaints);
router.put('/complaints/:id/status', authenticateToken, authorizeRoles('admin', 'gov_employee'), complaintController.updateComplaintStatus);

module.exports = router;
