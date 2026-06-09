import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, List, ListItem, TextField, Button, Avatar } from '@mui/material';

const ChatArea = ({ activeRoom, messages, user, onSendMessage, onTyping, typingUser }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUser]); 

  const handleChange = (e) => {
    setInput(e.target.value);
    if (onTyping) onTyping(); 
  };

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput(''); 
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ece5dd' }}> 
      
   
      <Box sx={{ p: 2, bgcolor: '#f0f2f5', borderBottom: '1px solid #d1d7db', display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: '#1976d2', mr: 2, fontSize: '1.2rem', width: 45, height: 45 }}>#️⃣</Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold" color="textPrimary" sx={{ lineHeight: 1.1 }}>{activeRoom}</Typography>
          <Typography variant="caption" color="textSecondary">Tap here for group info</Typography>
        </Box>
      </Box>
      
      {/* Messages Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 2, sm: 3 }, pb: 1 }}>
        <List sx={{ p: 0 }}>
          {messages.map((msg, i) => {
            
         
            const isMe = msg.sender === user?.name;
            
            return (
              <ListItem key={i} sx={{ flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', px: 0, py: 0.5 }}>
                <Box sx={{ display: 'flex', flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-start', gap: 1, maxWidth: { xs: '90%', sm: '75%' } }}>
                  
               
                  {!isMe && (
                    <Avatar sx={{ width: 28, height: 28, bgcolor: '#757575', fontSize: 12, mt: 0.5 }}>
                      {(msg.sender || '?').charAt(0).toUpperCase()}
                    </Avatar>
                  )}

                 
                  <Box sx={{ 
                    bgcolor: isMe ? '#dcf8c6' : '#ffffff', 
                    p: 1.5, px: 2, 
                   
                    borderRadius: isMe ? '16px 0px 16px 16px' : '0px 16px 16px 16px', 
                    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                    position: 'relative'
                  }}>
                    
                   
                    {!isMe && (
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1976d2', display: 'block', mb: 0.2, fontSize: '0.75rem' }}>
                        {msg.sender}
                      </Typography>
                    )}
                    
                    {/* Main Message Content */}
                    <Typography variant="body1" sx={{ wordBreak: 'break-word', fontSize: { xs: '0.95rem', sm: '1rem' }, color: '#303030' }}>
                      {msg.content}
                    </Typography>
                    
                  
                    <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#999', display: 'block', textAlign: 'right', mt: 0.5, mb: -0.5 }}>
                      {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>

                  </Box>
                </Box>
              </ListItem>
            );
          })}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Typing Indicator Box */}
      <Box sx={{ px: 3, py: 0.5, minHeight: '28px', bgcolor: 'transparent' }}>
        {typingUser && (
          <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#555', fontWeight: 'bold', bgcolor: 'rgba(255,255,255,0.8)', px: 1.5, py: 0.5, borderRadius: 5 }}>
             {typingUser} is typing...
          </Typography>
        )}
      </Box>

      {/* Input Area  */}
      <Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: '#f0f2f5', display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField 
          fullWidth 
          size="small"
          value={input} 
          onChange={handleChange} 
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message" 
          sx={{ 
            bgcolor: '#ffffff', 
            borderRadius: 5, 
            '& fieldset': { border: 'none' }, 
            boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
          }}
        />
        <Button variant="contained" onClick={handleSend} sx={{ borderRadius: 5, px: { xs: 2, sm: 3 }, fontWeight: 'bold', minWidth: 'unset', bgcolor: '#00a884', '&:hover': { bgcolor: '#008f6f' } }}>
          <span style={{ display: 'none' }} className="sm-block">Send</span> 🚀
        </Button>
      </Box>
    </Box>
  );
};

export default ChatArea;