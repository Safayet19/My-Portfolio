'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScale(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${scale})` }} />;
}
