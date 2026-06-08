const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    }
}, { timestamps: true });

const RoomModel = mongoose.model("room", roomSchema);
module.exports = RoomModel;