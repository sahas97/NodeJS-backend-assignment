const express = require('express');

const isAuth = require('../../middleware/auth.middleware');

const router = express.Router();

const borrowingController = require('./borrowings.controller');

router.get('/borrow/:bookId',isAuth, borrowingController.borrwBook);

router.patch('/return/:borrowId', isAuth, borrowingController.returnBook);

router.get('/view/user/:userId', isAuth, borrowingController.viewSelBorrows);

router.get('/view/admin', isAuth, borrowingController.viewBorrows);

module.exports = router;