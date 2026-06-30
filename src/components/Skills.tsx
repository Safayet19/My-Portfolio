import { site } from '@/data/site';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Skills() {
  return (
    <section id="skills" className="section section-tight">
      <div className="container">
        <SectionHeader
          center
          eyebrow="Skills"
          title="A toolkit for polished interfaces and interactive products."
          copy="Edit these skill groups from src/data/site.ts. The layout automatically adapts across desktop, tablet, and phone screens."
        />

        <div className="skills-layout">
          {site.skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <MouseGlow className="skill-card" key={group.title}>
                <div className="card-icon">
                  <Icon size={22} />
                </div>
                <h3>{group.title}</h3>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <span className="skill-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </MouseGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}
