const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../user/user.model');
const Auth = require('../auth/auth.model');
const Book = require('./books.model');


exports.createBook = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }

    const bookName = req.body.name;
    const totalCopies = req.body.totalCopies;
    const avaiableCopies = req.body.avaiableCopies;
    try {

        // check wether the user type is admin
        const user = await User.findById(req.userId);
        if (user.type !== 'admin') {
            const error = new Error('Can not add book, Access denied!!');
            error.statusCode = 403;
            error.data = errors.array();
            throw error;
        }

        const book = new Book({
            name: bookName,
            totalCopies: totalCopies,
            avaiableCopies: avaiableCopies
        });

        const createdBook = await book.save();

        res.status(201).json({
            message: 'book created successfully',
            userId: createdBook._id
        });

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

exports.deleteBook = async (req, res, next) => {
    const bookId = req.params.bookId;
    try {

        // check wether the user type is admin
        const user = await User.findById(req.userId);
        if (user.type !== 'admin') {
            const error = new Error('Can not add book, Access denied!!');
            error.statusCode = 403;
            throw error;
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);

        res.status(200).json({
            message: 'book deleted successfully',
            userId: deletedBook._id
        });

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

exports.getBooks = async (req, res, next) => {

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const totalItems = await Book.find().countDocuments();
        const books = await Book.find();
        res.status(200).json({
            message: 'Fetched books successfuly.',
            books: books,
            totalItems: totalItems
        });

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}