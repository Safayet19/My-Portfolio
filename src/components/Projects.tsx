import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { site } from '@/data/site';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Selected Work"
          title="Project cards that explain role, result, and stack quickly."
          copy="Dummy projects are included now. Replace them with real project screenshots, links, source code, and case-study details when ready."
        />

        <div className="projects-grid">
          {site.projects.map((project) => (
            <MouseGlow className="project-card" key={project.title}>
              <div className="project-image">
                <Image src={project.image} width={980} height={620} alt={`${project.title} preview`} />
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="project-tags">
                  {project.stack.map((tag) => (
                    <span className="project-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink size={16} /> Live demo
                  </a>
                  <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                    <Github size={16} /> Source
                  </a>
                </div>
              </div>
            </MouseGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
