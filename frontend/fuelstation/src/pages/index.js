import LogoutButton from '../../components/LogoutButton';
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <LogoutButton />
        <Link href="/login">Login</Link>
        <Link href="/credit-sale">Credit Sale</Link>
        <Link href="/register">Register</Link>
    </div>
  );
}
