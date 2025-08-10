const express = require('express');
const router = express.Router();
const documentController = require('../controllers/DocumentController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // ✅ Add this line for multer

// Upload a document (business_owner only)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('business_owner'),
  upload.single('file'), // ✅ Add multer middleware here
  documentController.uploadDocument
);

// Get logged-in user's documents
router.get('/me', authenticateToken, documentController.getMyDocuments);

// Get documents for a specific user (admin or gov_employee)
router.get('/user/:userId', authenticateToken, authorizeRoles('gov_employee', 'admin'), documentController.getUserDocuments);

// Delete a document by ID (only owner)
router.delete('/:id', authenticateToken, documentController.deleteDocument);

module.exports = router;
