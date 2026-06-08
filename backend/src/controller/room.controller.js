const RoomModel = require('../models/room.models');

// Naya room create karne ke liye
async function createRoom(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Room name is required" });
        }

        const existingRoom = await RoomModel.findOne({ name });
        if (existingRoom) {
            return res.status(400).json({ message: "Room already exists" });
        }

        const newRoom = await RoomModel.create({ name });
        res.status(201).json({ message: "Room created successfully", room: newRoom });
    } catch (error) {
        res.status(500).json({ message: "Error creating room", error: error.message });
    }
}

// Saare rooms fetch karne ke liye (Frontend sidebar ke liye)
async function getRooms(req, res) {
    try {
        const rooms = await RoomModel.find().sort({ createdAt: -1 });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
}

module.exports = { createRoom, getRooms };