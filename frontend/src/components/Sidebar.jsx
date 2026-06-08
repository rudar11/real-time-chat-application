import React from 'react';
import { Box, Typography, Button, Divider, List, ListItem, ListItemText, Avatar, ListItemAvatar } from '@mui/material';

const Sidebar = ({ availableRooms, activeRoom, setActiveRoom, onlineUsers, handleLogout, onOpenDialog }) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#f4f7f6' }}>
      
    
      <Box sx={{ p: 2, bgcolor: '#1976d2', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ display: { xs: 'none', md: 'block' } }}>
          ChatHub
        </Typography>
        
    
        <Button 
          onClick={onOpenDialog} 
          size="small" 
          sx={{ 
            bgcolor: 'white', 
            color: '#1976d2', 
            fontWeight: 'bold', 
            textTransform: 'none',
            borderRadius: 1.5,
            px: { xs: 1, sm: 1.5 },
            minWidth: 'auto',
            boxShadow: 2,
            '&:hover': { bgcolor: '#f0f0f0' }
          }}
        >
          <span style={{ fontSize: '1.2rem', marginRight: '4px', lineHeight: 1 }}>+</span>
          <span style={{ fontSize: '0.9rem' }}>New Room</span>
        </Button>
      </Box>

       {/* Rooms List  */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
        <Typography variant="caption" color="textSecondary" sx={{ px: { xs: 0.5, sm: 2 }, fontWeight: 'bold' }}>ROOMS</Typography>
        <List sx={{ px: { xs: 0, sm: 1 } }}>
          {availableRooms.map((room) => (
            <ListItem 
              button 
              key={room} 
              onClick={() => setActiveRoom(room)}
              sx={{ 
                bgcolor: activeRoom === room ? '#e3f2fd' : 'transparent',
                borderRadius: 2, mb: 0.5, cursor: 'pointer',
                transition: '0.3s', '&:hover': { bgcolor: '#e0e0e0' }
              }}
            >
              <Typography sx={{ mr: 1, opacity: activeRoom === room ? 1 : 0.5, display: { xs: 'none', sm: 'block' } }}>#️⃣</Typography>
              <ListItemText 
                primary={room} 
                primaryTypographyProps={{ 
                  fontWeight: activeRoom === room ? 'bold' : 'normal', 
                  color: activeRoom === room ? '#1976d2' : 'inherit',
                  fontSize: { xs: '0.85rem', sm: '1rem' } 
                }} 
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Online Users */}
        <Typography variant="caption" color="textSecondary" sx={{ px: { xs: 0.5, sm: 2 }, fontWeight: 'bold' }}>
          ONLINE ({onlineUsers.length})
        </Typography>
        <List sx={{ px: { xs: 0, sm: 1 } }}>
          {onlineUsers.map((u, i) => (
            <ListItem key={i} sx={{ px: { xs: 0.5, sm: 2 }, py: 0.5 }}>
              <ListItemAvatar sx={{ minWidth: { xs: 30, sm: 40 } }}>
                <Avatar sx={{ width: { xs: 24, sm: 30 }, height: { xs: 24, sm: 30 }, bgcolor: '#4caf50', fontSize: 12, fontWeight: 'bold' }}>
                  {u.username.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={u.username} primaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />
              <Typography sx={{ fontSize: '10px', display: { xs: 'none', sm: 'block' } }}>🟢</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Area */}
      <Box sx={{ p: { xs: 1, sm: 2 }, bgcolor: '#ffffff', borderTop: '1px solid #e0e0e0' }}>
        <Button variant="outlined" color="error" fullWidth sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.9rem' } }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;