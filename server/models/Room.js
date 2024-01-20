const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    users: {
        type: Array,
        required: true,
        default: []
    },
});

module.exports = mongoose.model('Room', RoomSchema);
