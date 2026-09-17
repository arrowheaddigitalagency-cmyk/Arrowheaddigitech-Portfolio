'use client';

import { useEffect, useState } from 'react';

const DESKTOP_SRC = '/entrance/desktop.html';
const MOBILE_SRC = '/entrance/mobile.html';
const TABLET_MAX = 1024;

/** Canvas opening from Arrowhead Interactive / Mobile HTML exports. */
export default function EntranceMotion() {
  const [src, setSrc] = useState(DESKTOP_SRC);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${TABLET_MAX}px)`);
    const sync = () => setSrc(media.matches ? MOBILE_SRC : DESKTOP_SRC);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
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
