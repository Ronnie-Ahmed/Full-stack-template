'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ApiRequestError, apiFetch } from '@/lib/api';

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const body = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await apiFetch(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(body) });
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <form className="card" onSubmit={onSubmit}>
        <h1>{mode === 'login' ? 'Log in' : 'Create account'}</h1>
        {mode === 'register' && <input name="name" placeholder="Name" required minLength={2} />}
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password (min 8 chars)" required minLength={8} />
        {error && <p className="error">{error}</p>}
        <button disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}</button>
        <p className="muted">
          {mode === 'login' ? (
            <>No account? <Link href="/register">Register</Link></>
          ) : (
            <>Have an account? <Link href="/login">Log in</Link></>
          )}
        </p>
      </form>
    </main>
  );
}
