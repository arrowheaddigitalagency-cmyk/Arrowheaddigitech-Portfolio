'use client';

import { useEffect, useState } from 'react';

const DESKTOP_SRC = '/entrance/desktop.html';
const MOBILE_SRC = '/entrance/mobile.html';
/** Phones only — laptop + tablet keep the Interactive landscape opening. */
const PHONE_MAX = 767;

function pickSrc() {
  if (typeof window === 'undefined') return DESKTOP_SRC;
  const phone = window.matchMedia(`(max-width: ${PHONE_MAX}px)`).matches;
  // Tall phone / small device → Mobile portrait opening.
  // Laptop, desktop, and tablet → Interactive landscape opening (exact brand frame).
  return phone ? MOBILE_SRC : DESKTOP_SRC;
}

/** Canvas opening from Arrowhead Interactive / Mobile HTML exports. */
export default function EntranceMotion() {
  const [src, setSrc] = useState(DESKTOP_SRC);

  useEffect(() => {
    const sync = () => setSrc(pickSrc());
    sync();
    const phone = window.matchMedia(`(max-width: ${PHONE_MAX}px)`);
    phone.addEventListener('change', sync);
    window.addEventListener('orientationchange', sync);
    return () => {
      phone.removeEventListener('change', sync);
      window.removeEventListener('orientationchange', sync);
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
