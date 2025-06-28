import { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  async function handleRegister() {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
        name,
        email,
        password,
        role,
      });
      alert('Registration successful! Please log in.');
      router.push('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>Register</Typography>
      
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextField
        label="Role (e.g. owner, employee)"
        fullWidth
        margin="normal"
        onChange={(e) => setRole(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
        sx={{ mt: 2 }}
      >
        Register
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account? <Link href="/login">Login</Link>
      </Typography>
    </Box>
  );
}
