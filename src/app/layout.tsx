import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Valet — AI Strategic Planner',
  description:
    'Transform your career goals into actionable, milestone-driven execution plans. Structured strategy powered by AI.',
  keywords: [
    'career planning',
    'AI strategy',
    'career development',
    'learning roadmap',
    'skill development',
  ],
  authors: [{ name: 'Valet' }],
  openGraph: {
    title: 'Valet — AI Strategic Planner',
    description:
      'Transform your career goals into actionable, milestone-driven execution plans.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Footer } from '@/components/layout/footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
