import { Mail, MapPin, Send } from 'lucide-react';
import { site } from '@/data/site';

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact-shell">
        <div className="contact-card">
          <span className="eyebrow">Contact</span>
          <h2>
            Let&apos;s build something <span className="gradient-text">impressive.</span>
          </h2>
          <p>
            This form is prepared as a mailto workflow so it works without a backend. For production, connect it to Formspree, Resend, EmailJS, or your own API route.
          </p>
          <div className="contact-list">
            <a href={`mailto:${site.email}`}>
              <Mail size={18} /> {site.email}
            </a>
            <span>
              <MapPin size={18} /> {site.location}
            </span>
          </div>
        </div>

        <form
          className="contact-card contact-form"
          action={`mailto:${site.email}`}
          method="post"
          encType="text/plain"
        >
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" placeholder="John Doe" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Tell me about your project or opportunity..." required />
          </div>
          <button className="button primary" type="submit">
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
