const express = require('express');
const router = express.Router();

// Import user routes
const userRoutes = require('./user/user.routes');
//Import auth routes
const authRoutes = require('./auth/auth.routes');
//Import auth routes
const bookRoutes = require('./book/book.routes');

//Import auth routes
const borrowRoutes = require('./borrowings/borrowings.routes');

// Forward requests to /library/user to user routes
router.use('/user', userRoutes);
// Forward requests to /library/auth to auth routes
router.use('/auth', authRoutes);
// Forward requests to /library/book to book routes
router.use('/book', bookRoutes);
// Forward requests to /library/book to book routes
router.use('/borrowings', borrowRoutes);

module.exports = router;

