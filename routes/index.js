import { Router } from 'express';

// Import the AppController Module
import AppController from '../controllers/AppController';

const router = Router();
// Defining the API Endpoints
router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);

module.exports = app;
