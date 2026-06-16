const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomId: {
        type: String, 
        required: true
    },
    sender: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // 🔥 YEH NAYA FIELD ADD KIYA HAI TICKS KE LIYE 🔥
    status: {
        type: String,
        enum: ['sent', 'seen'],
        default: 'sent'
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);