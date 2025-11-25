import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import homeContent from '../content/pages/home.json';

const LANDING_PATHS = new Set(['/', '/landing']);

const detectInputMode = () => {
  if (typeof window === 'undefined') {
    return 'pointer';
  }
  const nav = window.navigator;
  const prefersCoarse =
    window.matchMedia?.('(pointer: coarse)')?.matches ||
    window.matchMedia?.('(any-pointer: coarse)')?.matches ||
    (nav && nav.maxTouchPoints > 0);
  if (prefersCoarse) {
    return 'touch';
  }
  const prefersFine =
    window.matchMedia?.('(pointer: fine)')?.matches ||
    window.matchMedia?.('(any-pointer: fine)')?.matches;
  return prefersFine ? 'pointer' : 'touch';
};

const sortActions = (actions = [], lastAction) => {
  const sorted = [...actions].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return [...sorted, ...(lastAction ? [lastAction] : [])];
};

const createProjectRoutes = (projects = []) =>
  projects
    .map((project) => {
      const slugSource = project?.id ?? project?.slug ?? project?.title;
      if (!slugSource) {
        return null;
      }
      return {
        label: project?.title ? `Project · ${project.title}` : 'Project',
        to: `/projects/${encodeURIComponent(slugSource)}`,
      };
    })
    .filter(Boolean);

export default function StickyContent({ showBackLink = false, backLinkTo = '/home' }) {
  const location = useLocation();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputMode, setInputMode] = useState(() => detectInputMode());
  const [projectRoutes, setProjectRoutes] = useState([]);
  const buttonInnerText = isHeaderOpen ? '⬅️ Go Back 🙅' : 'Hit us up 📞';
  const headerButtonPrompt = homeContent.headerButtonText ?? '';
  const textInnerText = isHeaderOpen ? '' : headerButtonPrompt;
  const phoneLink = homeContent.phoneLink ?? 'tel:0800-5425-2225';
  const phoneDisplay = homeContent.phoneDisplay ?? 'Call 0800 kick back 📞';
  const actions = useMemo(() => sortActions(homeContent.actions ?? [], {label: homeContent?.headerButtonText, url: '#contact'}), []);
  const staticRoutes = useMemo(
    () => (Array.isArray(homeContent.staticRoutes) ? homeContent.staticRoutes : []),
    []
  );
  const isLandingPage = LANDING_PATHS.has(location.pathname);
  const shouldShowSidebar = !isLandingPage && inputMode === 'pointer';

  const handleHeader = () => setIsHeaderOpen((open) => !open);

  const openUrl = (url) => {
    if (!url) {
      return;
    }
    window.open(url, '_blank');
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  const routeLinks = useMemo(() => staticRoutes, [staticRoutes]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    const updateInput = () => setInputMode(detectInputMode());
    const fineQuery = window.matchMedia?.('(pointer: fine)');
    const coarseQuery = window.matchMedia?.('(pointer: coarse)');
    const pointerHandler = (event) => {
      if (event.pointerType === 'touch') {
        setInputMode('touch');
      } else if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
        setInputMode('pointer');
      }
    };

    if (fineQuery) {
      if (typeof fineQuery.addEventListener === 'function') {
        fineQuery.addEventListener('change', updateInput);
      } else if (typeof fineQuery.addListener === 'function') {
        fineQuery.addListener(updateInput);
      }
    }
    if (coarseQuery) {
      if (typeof coarseQuery.addEventListener === 'function') {
        coarseQuery.addEventListener('change', updateInput);
      } else if (typeof coarseQuery.addListener === 'function') {
        coarseQuery.addListener(updateInput);
      }
    }
    window.addEventListener('pointerdown', pointerHandler);

    return () => {
      if (fineQuery) {
        if (typeof fineQuery.removeEventListener === 'function') {
          fineQuery.removeEventListener('change', updateInput);
        } else if (typeof fineQuery.removeListener === 'function') {
          fineQuery.removeListener(updateInput);
        }
      }
      if (coarseQuery) {
        if (typeof coarseQuery.removeEventListener === 'function') {
          coarseQuery.removeEventListener('change', updateInput);
        } else if (typeof coarseQuery.removeListener === 'function') {
          coarseQuery.removeListener(updateInput);
        }
      }
      window.removeEventListener('pointerdown', pointerHandler);
    };
  }, []);

  useEffect(() => {
    if (!shouldShowSidebar) {
      setIsSidebarOpen(false);
    }
  }, [shouldShowSidebar]);

  useEffect(() => {
    if (!shouldShowSidebar || projectRoutes.length > 0) {
      return undefined;
    }
    let cancelled = false;
    const loadProjects = async () => {
      try {
        const helper = await import('../content/helper.js');
        if (cancelled) {
          return;
        }
        const projects = helper.getContent('projects');
        if (!Array.isArray(projects)) {
          return;
        }
        setProjectRoutes(createProjectRoutes(projects));
      } catch {
        /* ignore failures and keep static routes only */
      }
    };
    loadProjects();
    return () => {
      cancelled = true;
    };
  }, [projectRoutes.length, shouldShowSidebar]);

  const handleActionClick = (action) => {
    if (!action?.url) {
      return;
    }
    const target = action.url.trim();
    if (!target) {
      return;
    }
    if (target.startsWith('#')) {
      if (location.pathname === '/home') {
        const section = document.getElementById(target.slice(1));
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = target;
        }
      } else {
        window.location.href = `/home${target}`;
      }
    } else if (target.startsWith('/')) {
      window.location.href = target;
    } else {
      window.open(target, '_blank');
    }
    closeSidebar();
  };

  if (shouldShowSidebar) {
    return (
      <>
        {isSidebarOpen && (
          <button
            type="button"
            className="safe-sidebar-overlay"
            aria-label="Close menu overlay"
            onClick={closeSidebar}
          />
        )}
        <aside className="safe-sidebar" aria-label="Site navigation">
          <button
            type="button"
            className="safe-sidebar-toggle"
            aria-expanded={isSidebarOpen}
            aria-controls="safe-sidebar-panel"
            onClick={() => setIsSidebarOpen((open) => !open)}
          >
            {isSidebarOpen ? 'Close menu' : 'Menu'}
          </button>
          <div
            className="safe-sidebar-panel"
            id="safe-sidebar-panel"
            data-open={isSidebarOpen ? 'true' : 'false'}
            aria-hidden={isSidebarOpen ? 'false' : 'true'}
          >
            {showBackLink && (
              <Link className="sidebar-back-link" to={backLinkTo} onClick={closeSidebar}>
                ← Back
              </Link>
            )}
            <div className="safe-sidebar-group">
              
              <ul className="safe-sidebar-links">
                {routeLinks.map((route) => (
                  <li key={route.to}>
                    <Link to={route.to} onClick={closeSidebar}>
                      {route.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {actions.length > 0 && (
              <div className="safe-sidebar-group">
                <div className="safe-sidebar-actions">
                  {actions.map((action) => (
                    <button
                      key={`${action.url}-${action.label}`}
                      type="button"
                      className="safe-sidebar-action"
                      onClick={() => handleActionClick(action)}
                    >
                      {action.label ?? action.url}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </>
    );
  }

  return (
    <header className="safe-header">
      <div className="safe-header-bar">
        {showBackLink && (
          <Link className="header-back-link" to={backLinkTo} aria-label="Back to home">
            ←
          </Link>
        )}
        <div className="header" onClick={handleHeader}>
          <div id="hit-us-up-txt">{textInnerText}</div>
          <div id="hit-us-up-btn" className="btn cool green">
            {buttonInnerText}
          </div>
        </div>
      </div>
      {isHeaderOpen && (
        <div id="hit-us-up" className="modal" style={{ display: 'flex' }}>
          <div className="modal-footer mc">
            <a className="call-icon btn" href={phoneLink}>
              {phoneDisplay}
            </a>
          </div>
          <div className="modal-image-container">
            <div className="modal-image-overlay">Go to 307 K-Road</div>
            <img
              className="modal-header-img"
              src="/images/frontdoor-sign.jpg"
              alt="Front Door Sign"
              onClick={() => openUrl('https://maps.app.goo.gl/nmLaCAnuJk3yz1Z57')}
            />
          </div>
          <div className="modal-body mc">
            <div className="messenger" onClick={() => openUrl(homeContent.messengerLink)}>
              {/* messenger icon intentionally hidden but clickable */}
            </div>
            <div className="messenger" onClick={() => openUrl(homeContent.instagramLink)}>
              <img id="messenger" src="/images/logo-insta-full.png" alt="Instagram" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
