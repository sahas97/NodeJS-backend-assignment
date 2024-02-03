const express = require('express');
const { body } = require('express-validator');
const Auth = require('../auth/auth.model');

const router = express.Router();

const authController = require('./auth.controller');

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please add valid Email.')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .notEmpty(),
], authController.userLogin);

module.exports = router;

