const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static for uploaded files
app.use('/uploads', express.static('uploads'));

// Example test route
app.get('/', (req, res) => res.send('EODB API Running'));

// TODO: Add route imports here
// app.use('/api/users', require('./routes/userRoutes'));

module.exports = app;
