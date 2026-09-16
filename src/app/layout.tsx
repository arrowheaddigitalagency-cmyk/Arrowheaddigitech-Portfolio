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
    images: [
      {
        url: '/og-image.png',
        width: 1672,
        height: 941,
        alt: 'Arrowhead DigiTech — Built to work. Designed to stand out.',
        type: 'image/png',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arrowhead DigiTech — Engineering the next possible.',
    description: 'Digital products. Connected intelligence. Lasting impact.',
    images: ['/og-image.png'],
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
