import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import StickyContent from './components/StickyContent.jsx';
import Footer from './components/Footer.jsx';
import missionContent from './content/pages/mission.json';
import { ProjectsSection } from './Home.jsx';
import { getContent } from './content/helper.js';

const projectContent = getContent('projects');

const MISSION_PREVIEW_LENGTH = 250;

export default function MissionPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <StickyContent showBackLink backLinkTo="/home" />
      <main className="project full mission-page">
        <section className="project mission-section">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Our </span>Mission
            </h2>
          </div>
          <Mission previewOnly={false} />
        </section>
        <ProjectsSection projects={projectContent}/>
        
      </main>
      <Footer />
    </>
  );
}

export function Mission({ previewOnly = true }) {
  const blurb = (missionContent.blurb ?? '').trim();
  const downloads = Array.isArray(missionContent.downloads) ? missionContent.downloads : [];

  if (!blurb) {
    return null;
  }

  const needsTruncate = blurb.length > MISSION_PREVIEW_LENGTH;
  const previewText = needsTruncate ? `${blurb.slice(0, MISSION_PREVIEW_LENGTH).trimEnd()}…` : blurb;

  return (
    <article className="mission-card">
      {previewOnly ? (
        <>
          <ReactMarkdown>{previewText}</ReactMarkdown>
          {needsTruncate && (
            <Link className="mission-card-btn" to="/mission">
              Read more
            </Link>
          )}
        </>
      ) : (
        <>
          <div className="mission-markdown">
            <ReactMarkdown>{blurb}</ReactMarkdown>
          </div>
          {downloads.length > 0 && (
            <div className="mission-downloads">
              <h4>Downloads</h4>
              <ul>
                {downloads.map((item, index) => {
                  const href = item.file ?? item.url ?? '#';
                  const label = item.name ?? item.title ?? `Download ${index + 1}`;
                  return (
                    <li key={`${href}-${label}`}>
                      <a href={href} target="_blank" rel="noreferrer">
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </article>
  );
}
