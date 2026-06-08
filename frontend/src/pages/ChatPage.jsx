import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Box, CssBaseline } from '@mui/material'; 

import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import CreateRoomDialog from '../components/CreateRoomDialog';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [activeRoom, setActiveRoom] = useState('General'); 
  const [onlineUsers, setOnlineUsers] = useState([]); 
  const [availableRooms, setAvailableRooms] = useState(['General']); 
  
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const typingTimeoutRef = useRef(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Fetch Rooms Fix (Hamesha 'General' list mein rahega)
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/api/rooms');
        const roomNames = response.data.map(r => r.name);
        
        //  BUG FIX: 'General' ko forcefully array  merge kiya taaki wo gayab na ho
        const allRooms = Array.from(new Set(['General', ...roomNames]));
        setAvailableRooms(allRooms);
        
        if (!allRooms.includes(activeRoom)) setActiveRoom(allRooms[0]);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Socket Fix (No Duplicate/Triple Events)
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Pehle existing events clear karo taaki double trigger na ho
    socket.off('chatHistory');
    socket.off('message');
    socket.off('onlineUsers');
    socket.off('userTyping');
    socket.off('newRoom');

    socket.emit('joinRoom', { username: user.name, room: activeRoom });

    const handleChatHistory = (history) => setMessages(history);
    const handleMessage = (msg) => setMessages((prev) => [...prev, msg]);
    const handleOnlineUsers = (users) => setOnlineUsers(users);
    
    const handleUserTyping = ({ username }) => {
      if (username !== user.name) { 
        setTypingUser(username);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setTypingUser(''); 
        }, 2000);
      }
    };

    const handleNewRoom = (newRoomName) => {
      setAvailableRooms((prevRooms) => {
        if (!prevRooms.includes(newRoomName)) {
          return [...prevRooms, newRoomName];
        }
        return prevRooms;
      });
    };

    socket.on('chatHistory', handleChatHistory);
    socket.on('message', handleMessage);
    socket.on('onlineUsers', handleOnlineUsers);
    socket.on('userTyping', handleUserTyping); 
    socket.on('newRoom', handleNewRoom); 

    return () => {
      socket.off('chatHistory', handleChatHistory);
      socket.off('message', handleMessage);
      socket.off('onlineUsers', handleOnlineUsers);
      socket.off('userTyping', handleUserTyping);
      socket.off('newRoom', handleNewRoom); 
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoom, navigate, user?.name, user?.id]);

  const handleSendMessage = (text) => {
    socket.emit('chatMessage', { 
      room: activeRoom, 
      senderId: user.id, 
      senderName: user.name, 
      text 
    });
  };

  const handleTyping = () => {
    socket.emit('typing', { room: activeRoom, username: user.name });
  };

  const handleCreateRoom = async (newRoomName) => {
    try {
      await api.post('/api/rooms/create', { name: newRoomName });
      
      setAvailableRooms([...availableRooms, newRoomName]);
      setActiveRoom(newRoomName);
      setOpenRoomDialog(false);

      socket.emit('roomCreated', newRoomName);
      
    } catch (error) {
      alert(error.response?.data?.message || "Error creating room");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', bgcolor: '#e0e7ff', p: { xs: 0, sm: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', width: '100%', height: '100%', bgcolor: 'white', borderRadius: { xs: 0, sm: 3 }, boxShadow: 24, overflow: 'hidden' }}>
          
          <Box sx={{ width: { xs: '35%', sm: '250px', md: '300px' }, minWidth: '150px', height: '100%', borderRight: '1px solid #e0e0e0' }}>
            <Sidebar 
              availableRooms={availableRooms} 
              activeRoom={activeRoom} 
              setActiveRoom={setActiveRoom} 
              onlineUsers={onlineUsers} 
              handleLogout={handleLogout}
              onOpenDialog={() => setOpenRoomDialog(true)}
            />
          </Box>

          <Box sx={{ flexGrow: 1, height: '100%' }}>
            <ChatArea 
              activeRoom={activeRoom} 
              messages={messages} 
              user={user} 
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}    
              typingUser={typingUser}    
            />
          </Box>

        </Box>
      </Box>

      <CreateRoomDialog open={openRoomDialog} onClose={() => setOpenRoomDialog(false)} onCreateRoom={handleCreateRoom} />
    </>
  );
};

export default ChatPage;