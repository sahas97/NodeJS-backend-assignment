const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    authId: {
        type: String,
        ref: 'Auth',
        required: true
    },
    name: {
        type: String,
        requird: true,
    },
    type: {
        type: String,
        required: true
    }
});

const Usermodel = model('User', UserSchema);

module.exports = Usermodel;