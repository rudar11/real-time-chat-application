import { io } from 'socket.io-client';

// Backend ka URL
const socket = io('https://real-time-chat-application-x0ts.onrender.com');

export default socket;