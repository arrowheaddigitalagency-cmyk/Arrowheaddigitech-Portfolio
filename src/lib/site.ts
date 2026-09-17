/** Canonical site identity — single source for SEO, OG, robots, sitemap. */
export const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, '') || 'https://arrowheaddigitech-portfolio.com';

export const SITE_NAME = 'Arrowhead DigiTech';

export const SITE_TAGLINE = 'Software, AI & Digital Marketing';

/** ~55 chars — brand + primary offer for SERP title. */
export const SITE_TITLE = `${SITE_NAME} | Custom Software, AI & Growth Marketing`;

/** ~155 chars — benefit-led, scannable SERP description. */
export const SITE_DESCRIPTION =
  'Arrowhead DigiTech builds custom software, AI systems, mobile apps, and growth marketing — from Lahore to the world. Ship faster. Rank sharper. Scale with intent.';

export const SITE_KEYWORDS = [
  'Arrowhead DigiTech',
  'custom software development',
  'Next.js development agency',
  'AI software house',
  'MERN stack development',
  'Flutter mobile apps',
  'digital marketing agency Lahore',
  'Google Ads and Meta Ads',
  'SaaS product engineering',
  'AI chatbots and automation',
  'WordPress and Shopify development',
  'software company Pakistan',
] as const;
