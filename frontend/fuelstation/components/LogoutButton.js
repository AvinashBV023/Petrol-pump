import { useRouter } from 'next/router';

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return <button onClick={logout}>Logout</button>;
}
