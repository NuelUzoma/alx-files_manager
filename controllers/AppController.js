const express = require('express');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

// Define the appcontroller
const appController = express.Router();

// GET /status endpoint
appController.get('/status', async(req, res) => {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();

    const status = {
        redis: redisStatus,
        db: dbStatus
    };

    res.status(200).json(status);
});

// GET /stats endpoint
appController.get('/stats', async(req, res) => {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();

    const stats = {
        users: nbUsers,
        files: nbFiles
    };

    res.status(200).json(stats);
});

module.exports = appController;
