const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomId: {
        type: String, // Ye String hona bahut zaruri hai
        required: true
    },
    sender: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);