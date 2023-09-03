const express = require('express');
const app = express();

// Import the AppController Module
const AppController = require('../controllers/AppController');

// Defining the API Endpoints
app.get('/status', AppController.getStatus);
app.get('/stats', AppController.getStats);

module.exports = app;
