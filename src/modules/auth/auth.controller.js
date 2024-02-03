const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../user/user.model');
const Auth = require('./auth.model');
require('dotenv').config();

exports.userLogin = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;

    try {

        const auth = await Auth.findOne({ _id: email });
        if (!auth) {
            const error = new Error('A user with this email is not Authenticated!');
            error.statusCode = 404;
            next(error);
        }

        const isEqual = await bcrypt.compare(password, auth.password);

        if (!isEqual) {
            const error = new Error('Wrong password.');
            error.statusCode = 401;
            next(error);
        }

        // find the user with that email from user collection using ref authId
        const user = await User.findOne({ authId: auth._id });
        if (!user) {
            const error = new Error('A user with this email not found.');
            error.statusCode = 404;
            next(error);
        }
        const token = jwt.sign({
            email: auth._id,
            userId: user._id.toString(),
        }, process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );
        res.status(200).json({
            token: token,
            userId: user._id.toString()
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}