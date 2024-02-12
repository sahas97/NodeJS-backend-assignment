const User = require('../user/user.model');
const Book = require('../book/books.model');
const Boorrow = require('./borrowings.model');

exports.borrwBook = async (req, res, next) => {
    const bookId = req.params.bookId;
    let availableCopies;

    try {
        //check the user is reguler user
        const user = await User.findById(req.userId);
        if (user.type !== 'user') {
            const error = new Error('Can not borrw book, Access denied!!');
            error.statusCode = 403;
            throw error;
        }

        //check wether the borrowing book is avalble in book model
        const book = await Book.findById(bookId);
        if (!book) {
            const error = new Error('Book not found!');
            error.statusCode = 404;
            throw error;
        } else if (book.avaiableCopies <= 0) {
            const error = new Error('Out of copies!');
            error.statusCode = 404;
            throw error;
        }

        const borrow = new Boorrow({
            user: {
                _id: user._id,
                name: user.name
            },
            book: {
                _id: book._id,
                name: book.name
            },
            isReturned: false
        });

        //save borrow
        const borrowdoc = await borrow.save();

        // subtract availableCopies from book model
        availableCopies = book.avaiableCopies - 1;
        const updatedBook = await Book.findByIdAndUpdate(
            bookId, // ID of the book document to update
            { $set: { avaiableCopies: availableCopies } }, // Update the specified field with the new value
            { new: true } // Return the updated document after the update operation
        );
        if (updatedBook) {
            res.status(200).json({
                message: 'book borrowed successfully',
                userId: borrowdoc._id
            });
        }

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}


exports.returnBook = async (req, res, next) => {
    const borrowId = req.params.borrowId;
    let avaiableCopies;

    try {
        //check the user is admin
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('No such user!');
            error.statusCode = 404;
            throw error;
        } else if (user.type !== 'admin') {
            const error = new Error('Can not return book, Access denied!!');
            error.statusCode = 403;
            throw error;
        }
        // set returend true in borrowings
        const updateBorrowing = await Boorrow.findByIdAndUpdate(
            borrowId, // ID of the borrow document to update
            { $set: { isReturned: true } }, // Update the specified field with the new value
            { new: true } // Return the updated document after the update operation
        );
        if (!updateBorrowing) {
            const error = new Error('No such record!');
            error.statusCode = 404;
            throw error;
        }

        // find the book using updateBorrowing bookId
        const book = await Book.findById(updateBorrowing.book._id);
        avaiableCopies = book.avaiableCopies;

        //get the bookId from updatedBorrowing and increse the aviablecopies
        const updatedBook = await Book.findByIdAndUpdate(
            book._id, // ID of the book document to update
            { $set: { avaiableCopies: avaiableCopies + 1 } }, // Update the specified field with the new value
            { new: true } // Return the updated document after the update operation
        );

        if (updatedBook) {
            res.status(200).json({
                message: 'book returned successfully',
                userId: updateBorrowing._id
            });
        }

    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

exports.viewSelBorrows = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        //check weather the user is regular user
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('No such user!');
            error.statusCode = 404;
            throw error;
        } else if (user.type !== 'user') {
            const error = new Error('Access denied!!');
            error.statusCode = 403;
            throw error;
        }

        // find the all borrowings
        const borrowings = await Boorrow.find({ 'user._id': userId });
        const allBorrowings = borrowings;
        //filter out the currently active borrowings
        const activeBorrowings = borrowings.filter(borrowing => !borrowing.isReturned);
        if (!borrowings) {
            const error = new Error('No record found!');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            allBorrowings: allBorrowings,
            activeBorrowings: activeBorrowings
        });
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

exports.viewSelBorrows = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        //check weather the user is regular user
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('No such user!');
            error.statusCode = 404;
            throw error;
        } else if (user.type !== 'user') {
            const error = new Error('Access denied!!');
            error.statusCode = 403;
            throw error;
        }

        // find the all borrowings
        const borrowings = await Boorrow.find({ 'user._id': userId });
        const allBorrowings = borrowings;
        //filter out the currently active borrowings
        const activeBorrowings = borrowings.filter(borrowing => !borrowing.isReturned);
        if (!borrowings) {
            const error = new Error('No record found!');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            allBorrowings: allBorrowings,
            activeBorrowings: activeBorrowings
        });
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}

exports.viewBorrows = async (req, res, next) => {

    try {
        //check weather the user is regular user
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('No such user!');
            error.statusCode = 404;
            throw error;
        } else if (user.type !== 'admin') {
            const error = new Error('Access denied!!');
            error.statusCode = 403;
            throw error;
        }

        // find the all borrowings
        const borrowings = await Boorrow.find();
        const borrowingsArray = [];
        const borrowingsByUser = {};
        borrowings.forEach(borrowing => {
            const userId = borrowing.user._id.toString();
            // inistalize the object of the user first if ther is no object of user by that userId
            if (!borrowingsByUser[userId]) {
                borrowingsByUser[userId] = {
                    allBorrowings: [],
                    activeBorrowings: []
                };
            }
            borrowingsByUser[userId].allBorrowings.push(borrowing);
            if (!borrowing.isReturned) {
                borrowingsByUser[userId].activeBorrowings.push(borrowing);
            }
            
        });
        if (!borrowings) {
            const error = new Error('No records found!');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(borrowingsByUser);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}