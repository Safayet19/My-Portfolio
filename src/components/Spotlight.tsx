import { site } from '@/data/site';
import { MouseGlow } from '@/components/ui/MouseGlow';

export function Spotlight() {
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="spotlight-shell">
          <div className="spotlight-copy">
            <span className="eyebrow">Design Logic</span>
            <h2>
              More than a template — <span className="gradient-text">a reusable portfolio system.</span>
            </h2>
            <p>
              The goal is not just to look expensive. The goal is to make your profile easy to update, easy to deploy, and easy for recruiters or clients to understand within seconds.
            </p>
          </div>

          <div className="principles-grid">
            {site.principles.map((item) => {
              const Icon = item.icon;
              return (
                <MouseGlow className="principle-card" key={item.title}>
                  <div className="card-icon">
                    <Icon size={21} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </MouseGlow>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
