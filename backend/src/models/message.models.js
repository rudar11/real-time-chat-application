const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room', 
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const MessageModel = mongoose.model("message", messageSchema);
module.exports = MessageModel;