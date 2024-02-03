const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../../middleware/auth.middleware');

const router = express.Router();

const borrowingController = require('./book.controller');

router.post('/borrow', [
    body('name')
        .trim() // remove white sapaces
        .notEmpty(),
    body('totalCopies')
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage('Please add valid Number.')
        .custom((value) => {
            if (parseInt(value) <= 0) {
                throw new Error('Total copies must be greater than zero.');
            }
            return true;
        }),
    body('avaiableCopies')
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage('Please add valid Number.')
],isAuth, bookController.createBook);

router.delete('/delete/:bookId', isAuth, bookController.deleteBook);

router.get('/books', isAuth, bookController.getBooks);

module.exports = router;