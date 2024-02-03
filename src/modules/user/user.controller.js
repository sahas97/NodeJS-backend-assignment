const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('./user.model');
const Auth = require('../auth/auth.model');


exports.signupUser = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('validation failed, entered data is incorrect or duplicated.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const type = req.body.type

    try {
        const hashPw = await bcrypt.hash(password, 16);
        // creating auth object
        const auth = new Auth({
            _id: email,
            password: hashPw
        });
        // saving auth object
        const authResult = await auth.save();
        if (!authResult) {
            const error = new Error('Authentication failed');
            error.statusCode = 500;
            next(error);
        }

        // creating user object
        const user = new User({
            authId: authResult._id,
            name: name,
            type: type
        });

        //saving user object
        const ceratedUser = await user.save();
        console.log('user');
        res.status(201).json({
            message: 'user created successfully',
            userId: ceratedUser._id
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
//check the userId of the logeduser is admin
// const user = await User.findById(req.userId);
// if (!user.type == 'admin') {
//     const error = new Error('Can not delete, Access denied!!');
//     error.statusCode = 403 ;
//     throw error;
// }

exports.deleteUser = async (req, res, next) => {
    const errors = validationResult(req);
    const userId = req.params.userId;

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    try {

        //then delete the userbyid from users collection
        const userDoc = await User.findByIdAndDelete(userId);
        if (!userDoc) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        console.log(userDoc.authId);
        // then using ref delete authdoc by authid from auth collection
        const authdoc = await Auth.deleteOne({ _id: userDoc.authId });
        if (!authdoc) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'User deleted successfully',
            userId: userDoc._id
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// exports.deleteUser = async (req, res, next) => {
//     const userId = req.params.userId;

//     try {
//         const userDoc = await User.findByIdAndDelete(userId);
//         if (!userDoc) {
//             const error = new Error('User not found');
//             error.statusCode = 404;
//             throw error;
//         }

//         const authdoc = await Auth.deleteOne({ authId: userDoc.authId });
//         if (authdoc) {
//             res.status(200).json({
//                 message: 'User deleted successfully',
//                 userId: userDoc._id
//             });
//         }
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         next(error); // Pass the error to the error handling middleware
//     }
// };