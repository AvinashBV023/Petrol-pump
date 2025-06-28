import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

export default function CreditSale() {
  const router = useRouter();
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      router.push('/login');
    }
  }, []);

  async function submitSale() {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/credit-sale`, {
        customer,
        amount: parseFloat(amount),
        note,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Credit sale recorded');
    } catch {
      alert('Error submitting sale');
    }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Record Credit Sale</Typography>
      <TextField label="Customer" fullWidth margin="normal" onChange={e => setCustomer(e.target.value)} />
      <TextField label="Amount" fullWidth margin="normal" onChange={e => setAmount(e.target.value)} />
      <TextField label="Note" fullWidth margin="normal" onChange={e => setNote(e.target.value)} />
      <Button variant="contained" color="primary" onClick={submitSale} sx={{ mt: 2 }}>Submit</Button>
    </Box>
  );
}
