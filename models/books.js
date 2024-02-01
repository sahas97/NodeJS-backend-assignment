const {Schema, model, models} = require('mongoose');

const BooksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    totalCopies: {
        type: Number,
        requird: true
    },
    avaiableCopies: {
        type: Number,
        requird: true
    }
});

const BooksModel = model('Book', BooksSchema);

module.exports = BooksModel;