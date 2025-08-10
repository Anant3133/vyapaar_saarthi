const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder for uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/schemes', require('./routes/schemeApplicationRoutes'));
app.use('/api/gov-schemes', require('./routes/governmentSchemeRoutes'));
app.use('/api/compliance', require('./routes/complianceRoutes'));
app.use('/api/activity-log', require('./routes/activityLogRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health check
app.get('/', (req, res) => res.send('EODB API Running'));

module.exports = app;
