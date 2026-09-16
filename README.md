# Arrowhead DigiTech

Digital product and AI engineering portfolio built with Next.js App Router, TypeScript, GSAP ScrollTrigger, Lenis, and React Three Fiber.

## Run

Node.js 20.9+ is required. Install with `npm install`, then run `npm run dev` and visit http://localhost:3000. Use `npm run build` followed by `npm start` for production. `npm run typecheck` checks TypeScript.

## Contact delivery

Copy `.env.example` to `.env.local` and configure Resend with a verified sending domain. The form posts to `/api/contact`. Missing credentials return an explicit error. The endpoint validates lengths and types, escapes HTML, and includes a honeypot. No live emails are sent by development checks.

## Content and assets

- `src/experience/Experience.tsx`: new experience and working interactions.
- `src/experience/IntelligenceCore.tsx`: desktop procedural WebGL core.
- `src/app/globals.css`: responsive visual system and reduced-motion treatment.
- `src/data/portfolio.ts`: original project, testimonial, leadership, history, process and service content.
- `public/images`: all existing client logos, project images, service imagery and portraits retained.
- Original Vite components, API and configuration remain as source reference but are not Next.js entry points.

The mobile showcase uses existing images as placeholders. Replace `yalaride_macbook_screenshot.jpg.png` and `america_needs_nurses_iphone_screenshot.jpg.png` or update their paths in the mobile showcase when final screenshots arrive. The full logo asset says Marketing, so the header uses the existing mark with a DigiTech wordmark.

Project outcome numbers and testimonials are retained from the original portfolio, not independently verified. Dashboard and AI workflow are explicitly labeled illustrative/demo and do not call production systems. Flutter is presented as a capability rather than an unverified claim about an existing client app.

## Motion and accessibility

Desktop has a scrubbed 3D camera approach, pinned capability narrative, and scroll-driven product/device depth. Small screens use a CSS core and ordinary document flow. Reduced motion removes smooth scrolling and animation. Content renders without WebGL. Navigation, project selection, forms, native disclosure sections and project dialogs support keyboard access.

## Deployment

Deploy as a Next.js Node application. A static file server cannot run the inquiry endpoint. Set contact environment variables in the hosting environment. This rebuild does not publish the site.

## Reference-led motion chapters

- `src/experience/sections/EngineeringStory.tsx` contains sections 02–05 and the founder-message draft. The founder copy is newly drafted for this portfolio, not a sourced quotation.
- `src/experience/EngineeringMachine.tsx` renders the original chrome/glass scene. It pauses off-screen and has a static reduced-motion fallback.
- `src/app/refinement.css` contains the reference-led layout, typography, responsive sticky styles, growth palette and contact/footer refinements.
- `public/images/mobile/` contains the two client-supplied mobile screenshots.
- `public/fonts/` contains self-hosted variable Manrope and DM Sans with their OFL licenses.

The supplied Sharplink recordings are visual references only. Their text, branding and recorded footage are not shipped in the site.
