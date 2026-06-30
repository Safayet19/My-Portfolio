'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { site } from '@/data/site';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a className="brand" href="#main-content" aria-label={`${site.name} home`}>
          <span className="brand-mark">SU</span>
          <span>{site.name}</span>
        </a>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          {site.nav.map((item) => (
            <a className="nav-link" href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          Let&apos;s Talk
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
