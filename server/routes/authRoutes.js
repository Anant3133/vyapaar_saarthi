const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user (role should be part of the request body)
router.post('/register', authController.register);

// Login user (returns token with role embedded)
router.post('/login', authController.login);

module.exports = router;
