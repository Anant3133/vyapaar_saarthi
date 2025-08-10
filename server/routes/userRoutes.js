// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Get logged-in user's profile
router.get('/me', authenticateToken, userController.getProfile);

// Update logged-in user's profile
router.put('/me', authenticateToken, userController.updateProfile);

// List all users (gov_employee only)
router.get('/all', authenticateToken, authorizeRoles('gov_employee'), userController.listUsers);

module.exports = router;
