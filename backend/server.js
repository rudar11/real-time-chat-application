require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app'); // Sahi path select kiya

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Production mein yahan frontend URL aayega
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Yahan hum events handle karenge
    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});