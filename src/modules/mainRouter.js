const express = require('express');
const router = express.Router();

// Import user routes
const userRoutes = require('./user/user.routes');
//Import auth routes
const authRoutes = require('./auth/auth.routes');

// Forward requests to /library/user to user routes
router.use('/user', userRoutes);
// Forward requests to /library/auth to auth routes
router.use('/auth', authRoutes);

module.exports = router;

