import { io } from 'socket.io-client';

// Backend ka URL
const socket = io('http://localhost:3000');

export default socket;