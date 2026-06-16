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
        required: true // Normal text ho ya ImageKit ka URL, dono isi mein aayenge
    },
    // 🔥 YEH NAYA FIELD IMAGE KE LIYE ADD KIYA HAI 🔥
    msgType: {
        type: String,
        enum: ['text', 'image'], // Ya toh 'text' hoga ya 'image'
        default: 'text' // By default hum sabko text maanenge
    },
    // 🔥 YEH FIELD TICKS KE LIYE HAI 🔥
    status: {
        type: String,
        enum: ['sent', 'seen'],
        default: 'sent'
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);