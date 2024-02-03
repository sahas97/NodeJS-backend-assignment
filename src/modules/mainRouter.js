const express = require('express');
const router = express.Router();

// Import user routes
const userRoutes = require('./user/user.routes');

// Forward requests to /library/user to user routes
router.use('/user', userRoutes);

module.exports = router;

