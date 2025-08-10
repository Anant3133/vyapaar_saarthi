// routes/schemeApplicationRoutes.js
const express = require('express');
const router = express.Router();
const schemeAppController = require('../controllers/SchemeApplicationController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Apply for a government scheme (logged-in user)
router.post('/apply', authenticateToken, schemeAppController.applyForScheme);

// Get scheme applications of the logged-in user
router.get('/my-applications', authenticateToken, schemeAppController.getMySchemeApplications);

// Get all scheme applications (gov_employee only)
router.get('/all', authenticateToken, authorizeRoles('gov_employee'), schemeAppController.getAllSchemeApplications);

// Update scheme application status (gov_employee only)
router.put('/:id/status', authenticateToken, authorizeRoles('gov_employee'), schemeAppController.updateSchemeApplicationStatus);

module.exports = router;
