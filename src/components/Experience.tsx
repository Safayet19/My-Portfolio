'use client';

import { site } from '@/data/site';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Experience() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Journey"
          title="A simple timeline for study, practice, and growth."
          copy="Use this section for education, internships, freelance experience, certifications, hackathons, or achievements."
        />

        <div className="timeline">
          {site.experience.map((item) => (
            <MouseGlow className="timeline-item" key={`${item.role}-${item.period}`}>
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <span>{item.period}</span>
                <h3>{item.role} · {item.organization}</h3>
                <p>{item.description}</p>
              </div>
            </MouseGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
