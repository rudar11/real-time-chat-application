require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app'); 
const MessageModel = require('./src/models/message.models'); 

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173", 
            "https://real-time-chat-application-coral-chi.vercel.app" // Tumhara live Vercel link
        ], 
        methods: ["GET", "POST"],
        credentials: true 
    }
});

const activeUsers = new Map(); 

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // 1. Join Room Event (FIXED: Leave old room before joining new)
    socket.on('joinRoom', async ({ username, room }) => {
        
     // BUG FIX: Remove the user from the old room to prevent duplicate messages.
        const previousData = activeUsers.get(socket.id);
        if (previousData && previousData.room !== room) {
            socket.leave(previousData.room); // Leave old room
            
          // Notify the users in the old room that this user has left.
            const oldRoomUsers = Array.from(activeUsers.values()).filter(u => u.room === previousData.room && u.username !== username);
            io.to(previousData.room).emit('onlineUsers', oldRoomUsers);
        }

     
        socket.join(room);
        activeUsers.set(socket.id, { username, room });
        
        try {
            const messages = await MessageModel.find({ roomId: room }).sort({ createdAt: 1 });
            socket.emit('chatHistory', messages);
        } catch (err) {
            console.error("Error loading history:", err);
        }

    // Update and send the online user list to users who joined the new room.
        const roomUsers = Array.from(activeUsers.values()).filter(u => u.room === room);
        io.to(room).emit('onlineUsers', roomUsers);
    });

    // 2. Chat Message Event
    socket.on('chatMessage', async (data) => {
        const { room, senderName, text } = data; 
        try {
            const newMessage = await MessageModel.create({
                roomId: room,
                sender: senderName,
                content: text
            });
            io.to(room).emit('message', newMessage);
        } catch (err) {
            console.error("Error saving message:", err);
        }
    });

    // 3. Typing Indicator
    socket.on('typing', (data) => {
        const { room, username } = data;
        socket.to(room).emit('userTyping', { username });
    });

    // 4. Room Created Event
    socket.on('roomCreated', (newRoomName) => {
        socket.broadcast.emit('newRoom', newRoomName); 
    });

    // 5. Disconnect
    socket.on('disconnect', () => {
        const user = activeUsers.get(socket.id);
        if (user) {
            activeUsers.delete(socket.id);
            const roomUsers = Array.from(activeUsers.values()).filter(u => u.room === user.room);
            io.to(user.room).emit('onlineUsers', roomUsers);
        }
        console.log('User Disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});