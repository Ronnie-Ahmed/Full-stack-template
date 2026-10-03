import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="card">
        <h1>Fullstack Template</h1>
        <p className="muted">Next.js · Express · MongoDB</p>
        <Link className="btn" href="/login">Log in</Link>
        <Link className="btn" href="/register">Create account</Link>
      </div>
    </main>
  );
}
