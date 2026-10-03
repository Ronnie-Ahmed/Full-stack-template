'use client';

import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await apiFetch('/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
