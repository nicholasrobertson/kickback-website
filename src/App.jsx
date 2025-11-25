import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StickyContent from './components/StickyContent.jsx';
import landingContent from './content/pages/landing.json';
import './Landing.css';

const Home = lazy(() => import('./Home.jsx'));
const ProjectsPage = lazy(() => import('./ProjectsPage.jsx'));
const ProjectPage = lazy(() => import('./ProjectPage.jsx'));
const TestimoniesPage = lazy(() => import('./TestimoniesPage.jsx'));
const ReportsPage = lazy(() => import('./ReportsPage.jsx'));
const ReportPage = lazy(() => import('./ReportPage.jsx'));
const TeamPage = lazy(() => import('./TeamPage.jsx'));
const ContactPage = lazy(() => import('./ContactPage.jsx'));
const MissionPage = lazy(() => import('./MissionPage.jsx'));

const suspenseFallback = (
  <div className="route-fallback" aria-live="polite">
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <Suspense fallback={suspenseFallback}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/projects"
          element={
            <Suspense fallback={suspenseFallback}>
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <Suspense fallback={suspenseFallback}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path="/testimonials"
          element={
            <Suspense fallback={suspenseFallback}>
              <TestimoniesPage />
            </Suspense>
          }
        />
        <Route
          path="/reports"
          element={
            <Suspense fallback={suspenseFallback}>
              <ReportsPage />
            </Suspense>
          }
        />
        <Route
          path="/reports/:reportId"
          element={
            <Suspense fallback={suspenseFallback}>
              <ReportPage />
            </Suspense>
          }
        />
        <Route
          path="/team"
          element={
            <Suspense fallback={suspenseFallback}>
              <TeamPage />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={suspenseFallback}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="/mission"
          element={
            <Suspense fallback={suspenseFallback}>
              <MissionPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

function LandingPage() {
  const buttons = Array.isArray(landingContent.buttons)
    ? [...landingContent.buttons].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];
  const title = (landingContent.title ?? '').trim();
  const logo = (landingContent.logo ?? '').trim();

  return (
    <>
      <StickyContent />
      <main className="landing">
        <div className="landing-card">
          {logo && (
            <img
              className="landing-logo"
              src={logo}
              alt={title ? `${title} logo` : 'Kickback logo'}
              loading="lazy"
            />
          )}
          {buttons.length > 0 && (
            <div className="landing-actions">
              {buttons.map((button) => (
                <LandingButton key={`${button.url ?? ''}-${button.label ?? ''}`} button={button} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function LandingButton({ button }) {
  if (!button?.url) {
    return null;
  }

  const label = button.label ?? 'Learn more';
  const url = button.url.trim();
  const isExternal =
    /^https?:\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:');

  if (isExternal) {
    return (
      <a className="landing-btn" href={url} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link className="btn cool landing-btn" to={url}>
      {label}
    </Link>
  );
}

export default App;
