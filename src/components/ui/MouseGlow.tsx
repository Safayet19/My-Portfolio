'use client';

import type { CSSProperties, MouseEvent, ReactNode } from 'react';

export function MouseGlow({ children, className = '' }: { children: ReactNode; className?: string }) {
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <article onMouseMove={handleMove} className={className} style={{ '--x': '50%', '--y': '20%' } as CSSProperties}>
      {children}
    </article>
  );
}
