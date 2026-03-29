import { useEffect } from 'react';
import StickyContent from './components/StickyContent.jsx';
import Footer from './components/Footer.jsx';
import { ProjectsSection } from './Home.jsx';
import { getContent } from './content/helper.js';
import approachContent from './content/pages/approach.json';

const projectContent = getContent('projects');

export default function ApproachPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const pillars = Array.isArray(approachContent.pillars) ? approachContent.pillars : [];

  return (
    <>
      <StickyContent showBackLink backLinkTo="/home" />
      <main className="project full approach-page">
        <section className="project approach-hero">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Our </span>Approach
            </h2>
          </div>
          {approachContent.intro && (
            <p className="approach-intro">{approachContent.intro}</p>
          )}
        </section>

        {pillars.length > 0 && (
          <section className="project approach-pillars">
            <div className="approach-pillar-grid">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="approach-pillar-card">
                  <h3 className="approach-pillar-title edo">{pillar.title}</h3>
                  {pillar.subtitle && (
                    <span className="approach-pillar-subtitle">{pillar.subtitle}</span>
                  )}
                  <p className="approach-pillar-body">{pillar.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <ProjectsSection projects={projectContent} />
      </main>
      <Footer />
    </>
  );
}
