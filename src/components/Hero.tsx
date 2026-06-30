import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowDownRight, Download, Sparkle } from 'lucide-react';
import { site } from '@/data/site';

const InteractiveScene = dynamic(() => import('@/components/three/InteractiveScene').then((mod) => mod.InteractiveScene), {
  ssr: false,
  loading: () => (
    <div className="canvas-fallback">
      <div className="canvas-fallback-card">
        <strong>Loading interactive 3D scene</strong>
        <p>Optimized procedural WebGL visual for a premium first impression.</p>
      </div>
    </div>
  )
});

export function Hero() {
  const keywords = [...site.keywords, ...site.keywords];

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <div className="pill-row">
            <span className="pill">
              <Sparkle size={16} /> {site.university}
            </span>
            <span className="pill">Available for modern web work</span>
          </div>

          <h1>
            {site.name.split(' ')[0]}
            <span className="small-line gradient-text">{site.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p className="hero-lede">{site.headline}</p>

          <div className="hero-actions">
            <a className="button primary" href="#projects">
              View Projects <ArrowDownRight size={18} />
            </a>
            <a className="button secondary" href={site.resumePath} download>
              Download Resume <Download size={18} />
            </a>
          </div>

          <div className="hero-socials" aria-label="Social links">
            {site.social.map((item) => {
              const Icon = item.icon;
              return (
                <a className="icon-link" href={item.href} key={item.label} aria-label={item.label} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="canvas-shell">
            <InteractiveScene />
          </div>
          <div className="hero-floating-card">
            <div className="profile-mini">
              <Image src={site.profileImage} width={116} height={116} alt={`${site.name} profile`} />
              <div>
                <strong>{site.role}</strong>
                <span>{site.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {keywords.map((keyword, index) => (
            <span key={`${keyword}-${index}`}>✦ {keyword}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
