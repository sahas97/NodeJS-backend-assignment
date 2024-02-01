const {Schema, model} = require('mongoose');

const AuthSchema = new Schema({
    _id: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});

const AuthModule = model('Auth', AuthSchema);

module.exports = AuthModule;