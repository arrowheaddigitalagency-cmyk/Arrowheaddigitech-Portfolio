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
  openGraph: { title: 'Arrowhead DigiTech — Engineering the next possible.', description: 'Digital products. Connected intelligence. Lasting impact.', images: ['/og-arrowhead.jpg'] },
  icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
