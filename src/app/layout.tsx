import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: `${site.name} — Interactive 3D Portfolio`,
  description: site.headline,
  keywords: [...site.keywords, 'portfolio', 'developer portfolio', 'interactive portfolio', '3D portfolio'],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    title: `${site.name} — Interactive 3D Portfolio`,
    description: site.headline,
    type: 'website',
    images: ['/images/og-card.svg']
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f6efe3'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
