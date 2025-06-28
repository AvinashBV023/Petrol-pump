import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { TextField, Button, Typography, Box, Link } from '@mui/material';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      router.push('/');
    } catch {
      alert('Login failed');
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
      <Typography variant="h5" gutterBottom>Login</Typography>
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        New user? <Link href="/register">Register</Link>
      </Typography>
    </Box>
  );
}
