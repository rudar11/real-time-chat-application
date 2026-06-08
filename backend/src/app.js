require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectdb = require('./db/db');
const authRouter = require('./routes/auth.routes');
const app = express();
const roomRouter = require('./routes/room.routes');

// --- CORS CONFIGURATION ---
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,               
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database connection
connectdb();

// Test Route
app.get('/', (req, res) => {
    res.send("Chat Server is running...");
});

app.use('/api/auth', authRouter);
app.use('/api/rooms', roomRouter);

module.exports = app;