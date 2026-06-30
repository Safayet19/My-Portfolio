'use client';

import { site } from '@/data/site';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Testimonials() {
  return (
    <section className="section section-tight">
      <div className="container">
        <SectionHeader
          center
          eyebrow="Signal"
          title="Small trust section for recommendations and achievements."
          copy="Replace these dummy quotes with real mentor feedback, client reviews, award notes, or project evaluation comments."
        />

        <div className="testimonials-grid">
          {site.testimonials.map((testimonial) => (
            <MouseGlow className="testimonial-card" key={testimonial.author}>
              <blockquote>“{testimonial.quote}”</blockquote>
              <strong>{testimonial.author}</strong>
              <span>{testimonial.role}</span>
            </MouseGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
