const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    users: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        required: true,
        default: []
    },
    isStarted: {
        type: Boolean,
        required: true,
        default: true
    },
    finishedUsers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tasks: {
            type: [String],
            required: true,
            default: []
        }
    }]
});

module.exports = mongoose.model('Room', RoomSchema);
