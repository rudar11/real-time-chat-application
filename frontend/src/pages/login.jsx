import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig'; 
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert, 
  CircularProgress 
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/api/auth/login', formData);
      console.log("Login Successful:", response.data);
      
      localStorage.setItem('user', JSON.stringify({ 
        name: response.data.user.name, 
        id: response.data.user._id 
      }));

      navigate('/chat'); 
      
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="xs" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        px: 2 
      }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          boxShadow: 3, 
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Login</Typography>
        
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, height: '48px' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
          
          {/* Naya Link add kar diya */}
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
            Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>Register</Link>
          </Typography>
        
        </Box>
      </Box>
    </Container>
  );
};

export default Login;