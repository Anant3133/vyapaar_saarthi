// routes/activityLogRoutes.js
const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/ActivityLogController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Get all activity logs (admin only)
router.get('/', authenticateToken, authorizeRoles('admin'), activityLogController.getAllLogs);

// Get activity logs for a specific user (admin or self)
router.get('/:userId', authenticateToken, activityLogController.getUserLogs);

// Create a new activity log (authenticated users)
router.post('/', authenticateToken, activityLogController.createLog);

// Update a log (authenticated users)
router.put('/:id', authenticateToken, activityLogController.updateLog);

module.exports = router;
