require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectdb = require('./db/db');
const authRouter = require('./routes/auth.routes');
const app = express();
const roomRouter = require('./routes/room.routes');

// --- CORS CONFIGURATIONy //  ---
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://real-time-chat-application-coral-chi.vercel.app" //  live Vercel link
    ], 
    credentials: true,               
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]//jo data laya hu wo JSON format mein hai
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