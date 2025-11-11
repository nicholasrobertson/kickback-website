import { Link, useParams } from 'react-router-dom';
import './App.css';
import { getProjectTitleClass, parseDescription } from './utils/projects.js';

function normalizeActions(project = {}) {
  if (!Array.isArray(project.actions)) {
    return [];
  }
  return [...project.actions]
    .map((action, index) => ({
      ...action,
      order: typeof action.order === 'number' ? action.order : index,
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function openLink(url) {
  const target = url?.trim();
  if (!target) {
    return;
  }
  if (target.startsWith('#')) {
    window.location.href = `/${target}`;
    return;
  }
  window.open(target, '_blank');
}

function ProjectPage({ projects = [] }) {
  const { projectId } = useParams();
  const project =
    projects.find((item) => (item.id ?? item.slug ?? item.title) === projectId) ?? null;

  if (!project) {
    return (
      <main className="project full">
        <section className="project full">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Project </span>Not Found
            </h2>
          </div>
          <Link className="btn cool" to="/">
            Back to home
          </Link>
        </section>
      </main>
    );
  }

  const titleClass = getProjectTitleClass(project);
  const { taglineHtml, bodyHtml } = parseDescription(project.description ?? '');
  const actions = normalizeActions(project);
  const bannerSrc =
    project.banner ||
    (Array.isArray(project.gallery) ? project.gallery[0] : '') ||
    './images/header-placeholder.jpg';
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];

  return (
    <main>
      <section className="project full">
        <div className="header-2">
          <h2 className="italic edo">
            <span className="prom-2">Our </span>Mahi
          </h2>
        </div>
      </section>
      <section className="project full project-detail">
        <div className="project-detail-header">
          <Link className="back-link" to="/">
            ← Back to projects
          </Link>
        </div>
        <div className="project-card project-card--detail">
          <div className="modal-image-container detail">
            <img
              className="p-header-img"
              src={bannerSrc}
              alt={`${project.title} banner`}
              onClick={() => openLink(project.imageLink ?? project.link)}
            />
          </div>
          <h2 className={titleClass}>{project.title}</h2>
          {taglineHtml && (
            <div className="p-header bold" dangerouslySetInnerHTML={{ __html: taglineHtml }} />
          )}
          {bodyHtml && (
            <div className="p-body italic" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          )}
          {actions.length > 0 && (
            <div className="socials detail">
              {actions.map((action, index) => {
                const key = `${projectId}-action-${action.url ?? index}-${action.order ?? index}`;
                const label = action.label ?? project.title ?? 'Link';
                if (action.icon) {
                  const normalizedLabel = label
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                  const iconClass = normalizedLabel || 'link';
                  const iconMarkup = (
                    <span className={`socicon socicon-${iconClass}`}>
                      <img src={action.icon} alt={`${label} icon`} />
                    </span>
                  );
                  if (action.url?.startsWith('#')) {
                    return (
                      <div className="soc-item" key={key}>
                        <span
                          onClick={(event) => {
                            event.preventDefault();
                            openLink(action.url);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              openLink(action.url);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={label}
                        >
                          {iconMarkup}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <div className="soc-item" key={key}>
                      <a
                        href={action.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => {
                          event.preventDefault();
                          openLink(action.url);
                        }}
                        aria-label={label}
                      >
                        {iconMarkup}
                      </a>
                    </div>
                  );
                }

                return (
                  <div
                    key={key}
                    className="btn give"
                    onClick={() => openLink(action.url)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openLink(action.url);
                      }
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {gallery.length > 0 && (
          <div className="project-gallery">
            {gallery.map((imageSrc, index) => (
              <div className="project-gallery-item" key={`${projectId}-gallery-${index}`}>
                <img src={imageSrc} alt={`${project.title} gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProjectPage;
