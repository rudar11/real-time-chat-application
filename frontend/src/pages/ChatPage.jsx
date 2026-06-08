import React, { useState, useEffect } from 'react';
import socket from '../socket';
import { 
  Container, Box, TextField, Button, Paper, 
  List, ListItem, Typography, Divider 
} from '@mui/material';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const room = "General"; 

  // LocalStorage  User fetch 
  const user = JSON.parse(localStorage.getItem('user')) || { name: "Guest", id: socket.id };

  useEffect(() => {
    // Join room
    socket.emit('joinRoom', { username: user.name, room });

    // Events Listeners
    socket.on('chatHistory', (history) => setMessages(history));
    socket.on('message', (msg) => setMessages((prev) => [...prev, msg]));

    return () => {
      socket.off('chatHistory');
      socket.off('message');
    };
  }, [user.name, room]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chatMessage', { 
        room, 
        senderId: user.id, 
        senderName: user.name, 
        text: input 
      });
      setInput('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, height: '90vh' }}>
      <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Room: {room}</Typography>
        <Divider />
        
        {/* Messages List */}
        <List sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
          {messages.map((msg, i) => (
            <ListItem key={i} sx={{ flexDirection: 'column', alignItems: msg.sender === user.name ? 'flex-end' : 'flex-start' }}>
              <Box sx={{ bgcolor: msg.sender === user.name ? '#dcf8c6' : '#f1f0f0', p: 1.5, borderRadius: 2, maxWidth: '80%' }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{msg.senderName || msg.sender}</Typography>
                <Typography>{msg.content}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        {/* Input Area */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField 
            fullWidth 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..." 
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatPage;