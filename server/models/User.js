const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    roomCode: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        default: "Anonymous"
    }
});

module.exports = mongoose.model('User', UserSchema);
