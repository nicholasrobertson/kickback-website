import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';
import { getContent } from './content/helper.js';
import { ProjectMiniCard } from './components/ProjectMiniCard.jsx';
import StickyContent from './components/StickyContent.jsx';
import {
  formatInline,
  getPrimaryGalleryImage,
  getProjectTitleClass,
  parseDescription,
} from './utils/projects.js';

const fallbackProjects = getContent('projects');

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

function ProjectPage({ projects = fallbackProjects }) {
  const { projectId } = useParams();
  const project =
    projects.find((item) => (item.id ?? item.slug ?? item.title) === projectId) ?? null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [projectId]);

  if (!project) {
    return (
      <>
        <StickyContent />
        <main className="project full">
          <section className="project full">
            <div className="header-2">
              <h2 className="italic edo">
                <span className="prom-2">Project </span>Not Found
              </h2>
            </div>
            <Link className="btn cool" to="/home">
              Back to home
            </Link>
          </section>
        </main>
      </>
    );
  }

  const titleClass = getProjectTitleClass(project);
  const { taglineHtml, bodyHtml } = parseDescription(project.description ?? '');
  const actions = normalizeActions(project);
  const bannerSrc =
    project.banner || getPrimaryGalleryImage(project) || '/images/header-placeholder.jpg';
  const galleryBlocks = Array.isArray(project.gallery)
    ? project.gallery.map((block) => {
        if (typeof block === 'string') {
          return { images: [block] };
        }
        const images = Array.isArray(block?.images) ? block.images : [];
        return {
          title: block?.title ?? block?.tile ?? '',
          body: block?.body ?? '',
          images,
        };
      })
    : [];
  const otherProjects = Array.isArray(projects)
    ? projects.filter((item) => (item.id ?? item.slug ?? item.title) !== projectId)
    : [];

  return (
    <>
      <StickyContent showBackLink />
      <main>
        <section className="project full project-detail">
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
        {galleryBlocks.length > 0 && (
          <div className="project-gallery">
            {galleryBlocks.map((block, index) => (
              <div className="project-gallery-block" key={`${projectId}-gallery-${index}`}>
                {(block.title || block.body) && (
                  <div className="project-gallery-meta">
                    {block.title && <h3 className="project-gallery-title">{block.title}</h3>}
                    {block.body && (
                      <div
                        className="project-gallery-body"
                        dangerouslySetInnerHTML={{ __html: formatInline(block.body) }}
                      />
                    )}
                  </div>
                )}
                {Array.isArray(block.images) && block.images.length > 0 && (
                  <div className="project-gallery-images">
                    {block.images.map((imageSrc, imageIndex) => (
                      <div
                        className="project-gallery-thumb"
                        key={`${projectId}-gallery-${index}-${imageIndex}`}
                      >
                        <img src={imageSrc} alt={`${block.title ?? project.title} image`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
      {otherProjects.length > 0 && (
        <section className="project full">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Other </span>Projects
            </h2>
          </div>
          <div className="project-grid">
            {otherProjects.map((other) => {
              const otherId = other.id ?? other.slug ?? other.title;
              return <ProjectMiniCard key={otherId} project={other} />;
            })}
          </div>
        </section>
      )}
    </main>
    </>
  );
}

export default ProjectPage;
