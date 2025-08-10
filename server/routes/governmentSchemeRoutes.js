// routes/governmentSchemeRoutes.js
const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/GovernmentSchemeController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Create a new scheme (gov_employee only)
router.post('/', authenticateToken, authorizeRoles('gov_employee'), schemeController.createScheme);

// Get all schemes (public access)
router.get('/', authenticateToken, schemeController.getAllSchemes);

// Get a single scheme by ID
router.get('/:id', authenticateToken, schemeController.getSchemeById);

// Update a scheme (gov_employee only)
router.put('/:id', authenticateToken, authorizeRoles('gov_employee'), schemeController.updateScheme);

// Delete a scheme (gov_employee only)
router.delete('/:id', authenticateToken, authorizeRoles('gov_employee'), schemeController.deleteScheme);

module.exports = router;
