import type { ReactNode } from 'react';
import type { ClientProject } from '../../data/client-projects';

type TechIcon = { id: string; label: string; node: ReactNode };

function IconShell({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span className="project-tech-glyph" style={{ color }} aria-hidden="true">
      {children}
    </span>
  );
}

const svgProps = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' as const };

function MernIcon() {
  return (
    <IconShell color="#3C873A">
      <svg {...svgProps}><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.2 6.7 3.7v7.2L12 19.8l-6.7-4.7V7.9L12 4.2Z" /></svg>
    </IconShell>
  );
}

function NextIcon() {
  return (
    <IconShell color="#111">
      <svg {...svgProps}><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.4 15.1h-1.7l-4.2-6.4v6.4H8.6V6.9h1.8l4.1 6.3V6.9h1.9Z" /></svg>
    </IconShell>
  );
}

function WordPressIcon() {
  return (
    <IconShell color="#21759B">
      <svg {...svgProps}><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1.1 15.6-3.7-10h2.1l2.4 7.2 2.3-7.2h2l-3.8 10Zm8.4-1.2a8.4 8.4 0 0 1-3.3 2.2l3.5-9.6a8.3 8.3 0 0 1-.2 7.4Z" /></svg>
    </IconShell>
  );
}

function ShopifyIcon() {
  return (
    <IconShell color="#96BF48">
      <svg {...svgProps}><path d="M15.4 4.4c-.1 0-.3 0-.5.1l-1 .3c-.2-.5-.5-.9-1-1.1-.7-.4-1.5-.3-2 .3l-.7.8c-.7-.2-1.4-.3-1.5-.3-.3 0-.4.2-.4.4L7.3 18l7.8 1.5 2.2-15c0-.2-.2-.3-.4-.3l-1.5.2Zm-3.4.9c.2 0 .4 0 .5.1-.3.2-.6.6-.8 1.1l-1.1.3c.2-.9.8-1.5 1.4-1.5Zm-1.6 3 .6-.2.5 1.7c0 .1.1.1.2.1h.1c.1 0 .1-.1.1-.1l.5-1.6.7-.2-.6 2.1c-.1.3-.4.5-.7.5-.4 0-.7-.3-.8-.7l-.6-1.7Z" /></svg>
    </IconShell>
  );
}

function FacebookIcon() {
  return (
    <IconShell color="#1877F2">
      <svg {...svgProps}><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" /></svg>
    </IconShell>
  );
}

function InstagramIcon() {
  return (
    <IconShell color="#E4405F">
      <svg {...svgProps}><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.4-2.7a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" /></svg>
    </IconShell>
  );
}

function GoogleAdsIcon() {
  return (
    <IconShell color="#FBBC04">
      <svg {...svgProps}><path d="m12.8 4.2 5.7 10a2.4 2.4 0 0 1-2.1 3.6H5.6a2.4 2.4 0 0 1-2.1-3.6l5.7-10a2.4 2.4 0 0 1 3.6 0ZM12 7.1 7.4 15.2h9.2L12 7.1Zm-6.5 10.7a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6Z" /></svg>
    </IconShell>
  );
}

function MetaAdsIcon() {
  return (
    <IconShell color="#0668E1">
      <svg {...svgProps}><path d="M12 5c-2.2 0-3.7 1.7-4.5 3.3C6.6 6.7 5.1 5 2.9 5A4.2 4.2 0 0 0 1 12.6C2.4 15.5 6.2 19 8.7 19c1.5 0 2.3-1 4.3-1s2.8 1 4.3 1c2.5 0 6.3-3.5 7.7-6.4A4.2 4.2 0 0 0 21.1 5c-2.2 0-3.7 1.7-4.5 3.3C15.7 6.7 14.2 5 12 5Z" /></svg>
    </IconShell>
  );
}

function MobileAppIcon() {
  return (
    <IconShell color="#6366F1">
      <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
    </IconShell>
  );
}

function ChatbotIcon() {
  return (
    <IconShell color="#0EA5E9">
      <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12a8 8 0 0 1 14.5-4.5M20 12a8 8 0 0 1-14.5 4.5L4 20l3.5-1.5" /><circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" /></svg>
    </IconShell>
  );
}

function AppleStoreGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83ZM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11Z" />
    </svg>
  );
}

function PlayStoreGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 2.5A1.3 1.3 0 0 0 3 3.3v17.4c0 .5.2.9.55 1.1l.1.05 9.85-9.85v-.2L3.28 2.45l-.1.05Zm12.02 7.05-2.35 2.35 2.35 2.35 5.35-3.05c.65-.35.65-1.25 0-1.6l-5.35-3.05v3Zm-10.9 10.2 8.55-8.55 2.6 2.6-9.55 5.45c-.6.35-1.25.2-1.6.5Zm11.15-11.15L4.3 3.45c.2-.05.85-.15 1.5.25l9.55 5.45-2.6 2.6-.35-.15Z" />
    </svg>
  );
}

/** App Store / Play Store row for projects that include a mobile app. */
export function ProjectStoreBadges({ project }: { project: ClientProject }) {
  if (!project.mobile) return null;
  const inDev = /develop|soon|coming/i.test(project.mobile);
  return (
    <div className="project-store-badges" aria-label={`${project.client} mobile apps`}>
      <span className="project-store-badge" title="App Store">
        <AppleStoreGlyph />
        <span>App Store</span>
      </span>
      <span className="project-store-badge" title="Google Play">
        <PlayStoreGlyph />
        <span>Google Play</span>
      </span>
      <p className="project-store-note">
        {inDev ? `${project.mobile}` : `Also shipping on ${project.mobile}`}
      </p>
    </div>
  );
}

/** Map a project's stack + services to brand/tech icons for the card. */
export function iconsForProject(project: ClientProject): TechIcon[] {
  const icons: TechIcon[] = [];
  const push = (icon: TechIcon) => {
    if (!icons.some(i => i.id === icon.id)) icons.push(icon);
  };

  if (project.stack === 'MERN') push({ id: 'mern', label: 'MERN', node: <MernIcon /> });
  if (project.stack === 'Next.js') push({ id: 'next', label: 'Next.js', node: <NextIcon /> });
  if (project.stack === 'WordPress') push({ id: 'wordpress', label: 'WordPress', node: <WordPressIcon /> });
  if (project.stack === 'Shopify') push({ id: 'shopify', label: 'Shopify', node: <ShopifyIcon /> });

  if (project.mobile || project.services.some(s => /iOS|Android|Flutter|app/i.test(s))) {
    push({ id: 'mobile', label: 'Mobile app', node: <MobileAppIcon /> });
  }
  if (project.services.some(s => /Chatbot/i.test(s))) {
    push({ id: 'chatbot', label: 'Chatbot', node: <ChatbotIcon /> });
  }
  if (project.services.includes('Social media marketing')) {
    push({ id: 'facebook', label: 'Facebook', node: <FacebookIcon /> });
    push({ id: 'instagram', label: 'Instagram', node: <InstagramIcon /> });
    push({ id: 'meta', label: 'Meta Ads', node: <MetaAdsIcon /> });
  }
  if (project.services.includes('Google Ads')) {
    push({ id: 'google-ads', label: 'Google Ads', node: <GoogleAdsIcon /> });
  }

  return icons;
}
