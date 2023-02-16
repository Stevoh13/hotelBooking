const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelsSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    noRooms: {
        type: Number,
        required: true
    },
    lounge: {
        type: 'String',
        required: Boolean
    },
    restaurant: {
        type: 'String',
        required: true
    },
    swimPool: {
        type: 'String',
        required: Boolean
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

module.exports = mongoose.model('hotels', HotelsSchema)