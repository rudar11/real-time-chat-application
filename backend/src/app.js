require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Install this: npm install cors
const connectdb = require('./db/db');
const authRouter = require('./routes/auth.routes')
const app = express();

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json());
app.use(cookieParser());

// Database connection
connectdb();

// Test Route
app.get('/', (req, res) => {
    res.send("Chat Server is running...");
});


app.use('/api/auth', authRouter)

module.exports = app;