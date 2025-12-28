const express = require('express');
const app = express();
// Import Index Models to initialize database connection
const db = require('../models/index.js');
const cors = require('cors');


// Initialize DB connection
require('module-alias/register');
require('@connection/connection.js');
require('dotenv').config();
require('@config/passport.js');


// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());


// Import and mount user routes
const userRoutes = require('@routes/user.index.routes.js');
const { authenticateRoute } = require('../middlewares/auth.middleware.js');
const protectedRoute = require('../routes/protected/protected.routes.js');

app.use('/api', protectedRoute);
app.use('/api/users', userRoutes);


// (async () => {
//     try {
//         await db.sequelize.sync({force:true});
//         console.log('Database synchronized successfully');
//     } catch (err) {
//         console.error('Error synchronizing database:', err.message);
//     }
// })();



module.exports = { app };