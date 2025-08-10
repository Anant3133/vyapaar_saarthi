// routes/businessRoutes.js
const express = require('express');
const router = express.Router();
const businessController = require('../controllers/BusinessController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Create a new business (business_owner)
router.post('/', authenticateToken, authorizeRoles('business_owner'), businessController.createBusiness);

// Get all businesses of the logged-in user (business_owner)
router.get('/my', authenticateToken, authorizeRoles('business_owner'), businessController.getMyBusinesses);

// Get a business by ID (owner or gov_employee)
router.get('/:id', authenticateToken, businessController.getBusinessById);

// Update a business (business_owner)
router.put('/:id', authenticateToken, authorizeRoles('business_owner'), businessController.updateBusiness);

module.exports = router;
