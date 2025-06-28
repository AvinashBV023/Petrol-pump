import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AllCredits() {
  const router = useRouter();
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to view credit sales.");
      router.push('/login');
      return;
    }

    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/credit-sale`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCredits(res.data))
      .catch(() => alert("Failed to fetch credit sales"));
  }, []);

  return (
    <div>
      <h2>All Credit Sales</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Date</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {credits.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.customer}</td>
              <td>{sale.amount}</td>
              <td>{sale.note || '-'}</td>
              <td>{new Date(sale.createdAt).toLocaleString()}</td>
              <td>{sale.createdBy?.name || 'Unknown'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
