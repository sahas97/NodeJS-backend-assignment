const express = require('express');
const { body } = require('express-validator');
const Auth = require('../auth/auth.model');

const isAuth = require('../../middleware/auth.middleware');

const router = express.Router();

const userController = require('./user.controller');

router.put('/signup', [
    body('name')
        .trim() // remove white sapaces
        .notEmpty(),
    body('email')
        .isEmail()
        .withMessage('Please add valid Email.')
        .custom(async (value, { req }) => {
            const AuthDoc = await Auth.findOne({ _id: value });
            if (AuthDoc) return Promise.reject('E-mail address alredy exisit.')
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .notEmpty(),
    body('type')
        .trim()
        .notEmpty()
], userController.signupUser);

router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;