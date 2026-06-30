'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { site } from '@/data/site';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { iconMap } from '@/components/ui/iconMap';

export function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div className="portrait-card reveal">
          <div className="portrait-frame">
            <Image src={site.profileImage} width={900} height={1000} alt={`${site.name} portrait`} priority />
            <div className="portrait-badge">
              <strong>{site.name}</strong>
              <span>
                <MapPin size={14} /> {site.location}
              </span>
            </div>
          </div>
        </div>

        <div className="about-content reveal">
          <SectionHeader
            eyebrow="About"
            title="Built around clarity, motion, and a memorable first impression."
            copy="This portfolio is designed for job applications, internships, freelance work, and university project presentation."
          />

          <div className="glass-card about-lead">
            <p>{site.intro}</p>
          </div>

          <div className="stats-grid">
            {site.stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="focus-grid">
            {site.focusCards.map((card) => {
              const Icon = iconMap[card.icon];
              return (
                <MouseGlow className="focus-card" key={card.title}>
                  <div className="card-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </MouseGlow>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
