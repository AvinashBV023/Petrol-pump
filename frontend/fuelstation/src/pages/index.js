import { useState, useEffect } from 'react';
export default function Home() {
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('username');
            if (userData && userData !== 'undefined') {
                setUserName(userData);
            }
        }
    }, []);
  return (
    <div>
        <h1>Welcome to Fuel Station{userName && `, ${userName}!`}</h1>
    </div>
  );
}
