import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function Login() {
  const router = useRouter(); // ✅ Use Next.js router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      router.push('/'); // ✅ Redirect to home
    } catch {
      alert('Login failed');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: '10px' }}>
        New user? <Link href="/register">Register</Link>
      </p>
    </div>
  );
}
