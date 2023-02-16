const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    firstName: {
        type: 'String',
        required: true
    },
    lastName: {
        type: 'String',
        required: true
    },
    userName: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    img: {
        type: 'String',
        required: true
    },

    createAt: {
        type: Date,
        default: Date.now
    },
    lastUpdateAt: {                 
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', UsersSchema)