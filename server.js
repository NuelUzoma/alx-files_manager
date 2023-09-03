const express = require('express');
const app = express();
const port = 5000;

// Server.js will be used as a middleware to load routes
const indexRoutes = require('./routes/index');

// Use route modules
app.use('/index', indexRoutes);

// Listen on specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
