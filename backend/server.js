require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app'); 
const MessageModel = require('./src/models/message.models'); 

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

// User tracking for "Online Users" 
const activeUsers = new Map(); 

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // 1. Join Room Event
    socket.on('joinRoom', async ({ username, room }) => {
        socket.join(room);
        
        // Add to active users tracker
        activeUsers.set(socket.id, { username, room });
        
        console.log(`${username} joined room: ${room}`);

        // Load chat history from MongoDB
        try {
            const messages = await MessageModel.find({ roomId: room }).sort({ createdAt: 1 });
            socket.emit('chatHistory', messages);
        } catch (err) {
            console.error("Error loading history:", err);
        }

        // Broadcast updated online users list to the room
        const roomUsers = Array.from(activeUsers.values()).filter(u => u.room === room);
        io.to(room).emit('onlineUsers', roomUsers);
    });

    // 2. Chat Message Event
    socket.on('chatMessage', async (data) => {
        const { room, senderId, text } = data; 

        // Save to Database
        const newMessage = await MessageModel.create({
            roomId: room,
            sender: senderId,
            content: text
        });

        // Broadcast to everyone in that room
        io.to(room).emit('message', newMessage);
    });

    // 3. Typing Indicator
    socket.on('typing', (data) => {
        const { room, username } = data;
        socket.to(room).emit('userTyping', { username });
    });

    // 4. Disconnect
    socket.on('disconnect', () => {
        const user = activeUsers.get(socket.id);
        if (user) {
            activeUsers.delete(socket.id);
            // Update online users list for that room after user leaves
            const roomUsers = Array.from(activeUsers.values()).filter(u => u.room === user.room);
            io.to(user.room).emit('onlineUsers', roomUsers);
        }
        console.log('User Disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});