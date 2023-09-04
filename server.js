import express from 'express';
import router from './routes/index.js';
const port = process.env.port || 5000;

// Server.js will be used as a middleware to load routes
const app = express();

// Use route modules
app.use(express.json());
app.use('/', router);

// Listen on specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
