import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; 

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      const res = await axios.post('http://localhost:4000/api/register', {
        name, email, password, role
      });
      alert("Registration successful. Now you can log in.");
    } catch (err) {
        console.log(err);
      alert("Registration failed: " + err.response?.data?.error || err.message);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} /><br />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} /><br />
      <select onChange={e => setRole(e.target.value)} value={role}>
        <option value="employee">Employee</option>
        <option value="maintainer">Maintainer</option>
        <option value="owner">Owner</option>
      </select><br />
      <button onClick={handleRegister}>Register</button>
      <Link href="/login">Login</Link>
    </div>
  );
}
