const { Schema, model } = require('mongoose');

const BorrowingsSchema = new Schema({
    user: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    book: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    isReturned: {
        type: Boolean,
        required: true
    }

});

const BorrowingsModel = model('Borrowing', BorrowingsSchema);

module.exports = BorrowingsModel;