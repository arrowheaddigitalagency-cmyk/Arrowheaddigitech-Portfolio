import type { Metadata } from 'next';
import './globals.css';
import './studio.css';
import './outclass.css';
import './refinement.css';
import './finishing.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://arrowheaddigitech-portfolio.com'),
  title: 'Arrowhead DigiTech — Software, Design & Digital Marketing',
  description: 'We design, engineer, automate and scale serious digital products. Custom software, SaaS, AI agents, mobile applications and growth systems. Based in Lahore. Building globally.',
  openGraph: {
    title: 'Arrowhead DigiTech — Engineering the next possible.',
    description: 'Digital products. Connected intelligence. Lasting impact.',
    images: [{ url: '/og-arrowhead.jpg', width: 1200, height: 630, alt: 'Arrowhead DigiTech' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arrowhead DigiTech — Engineering the next possible.',
    description: 'Digital products. Connected intelligence. Lasting impact.',
    images: ['/og-arrowhead.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
