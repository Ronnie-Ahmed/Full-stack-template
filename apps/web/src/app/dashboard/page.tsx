import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import { API_URL } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  // Forward the auth cookie from the incoming request to the API (server-side)
  const res = await fetch(`${API_URL}/users/me`, {
    headers: { cookie: cookies().toString() },
    cache: 'no-store',
  });
  if (!res.ok) redirect('/login');
  const { user } = (await res.json()) as { user: { name: string; email: string; role: string } };

  return (
    <main>
      <div className="card">
        <h1>Hi, {user.name} 👋</h1>
        <p className="muted">{user.email} · {user.role}</p>
        <LogoutButton />
      </div>
    </main>
  );
}
