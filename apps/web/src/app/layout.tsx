import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fullstack Template',
  description: 'Next.js + Node.js + MongoDB production template',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
