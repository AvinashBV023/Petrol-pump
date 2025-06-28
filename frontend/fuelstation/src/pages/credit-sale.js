import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CreditSale() {
  const router = useRouter();
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  // 🔐 Check if token exists
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
      await axios.post('http://localhost:4000/api/credit-sale', {
        customer,
        amount: parseFloat(amount),
        note
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Credit sale recorded');
    } catch {
      alert('Error submitting sale');
    }
  }

  return (
    <div>
      <h2>Credit Sale</h2>
      <input placeholder="Customer Name" onChange={e => setCustomer(e.target.value)} /><br />
      <input placeholder="Amount" onChange={e => setAmount(e.target.value)} /><br />
      <input placeholder="Note" onChange={e => setNote(e.target.value)} /><br />
      <button onClick={submitSale}>Submit</button>
    </div>
  );
}
