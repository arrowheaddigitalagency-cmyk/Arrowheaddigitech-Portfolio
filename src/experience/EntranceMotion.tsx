'use client';

import { useEffect, useState } from 'react';

const DESKTOP_SRC = '/entrance/desktop.html';
const MOBILE_SRC = '/entrance/mobile.html';
/** Phones only — laptop + tablet keep the Interactive landscape opening. */
const PHONE_MAX = 767;

function pickSrc() {
  if (typeof window === 'undefined') return DESKTOP_SRC;
  const phone = window.matchMedia(`(max-width: ${PHONE_MAX}px)`).matches;
  return phone ? MOBILE_SRC : DESKTOP_SRC;
}

/** Full-viewport canvas opening that auto-fits on resize / zoom / orientation. */
export default function EntranceMotion() {
  const [src, setSrc] = useState(DESKTOP_SRC);

  useEffect(() => {
    const sync = () => setSrc(pickSrc());
    sync();
    const phone = window.matchMedia(`(max-width: ${PHONE_MAX}px)`);
    phone.addEventListener('change', sync);
    window.addEventListener('orientationchange', sync);
    window.visualViewport?.addEventListener('resize', sync);
    return () => {
      phone.removeEventListener('change', sync);
      window.removeEventListener('orientationchange', sync);
      window.visualViewport?.removeEventListener('resize', sync);
    };
  }, []);

  return (
    <iframe
      key={src}
      className="entrance-motion-frame"
      src={src}
      title="Arrowhead DigiTech animated opening"
      loading="eager"
      referrerPolicy="no-referrer"
      allow="autoplay"
    />
  );
}
