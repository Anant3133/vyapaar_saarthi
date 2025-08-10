// routes/complianceRoutes.js
const express = require('express');
const router = express.Router();
const complianceController = require('../controllers/ComplianceController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Get all compliance actions (gov_employee only)
router.get('/actions', authenticateToken, authorizeRoles('gov_employee'), complianceController.getComplianceActions);

// Get all compliance reminders (gov_employee only)
router.get('/reminders', authenticateToken, authorizeRoles('gov_employee'), complianceController.getComplianceReminders);

// Create compliance action (gov_employee only)
router.post('/actions', authenticateToken, authorizeRoles('gov_employee'), complianceController.createComplianceAction);

// Create compliance reminder (gov_employee only)
router.post('/reminders', authenticateToken, authorizeRoles('gov_employee'), complianceController.createComplianceReminder);

module.exports = router;
