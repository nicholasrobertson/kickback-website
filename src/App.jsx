import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import StickyContent from "./components/StickyContent.jsx";
import Footer from "./components/Footer.jsx";
import landingContent from "./content/pages/landing.json";
import "./Landing.css";

import Home from "./Home.jsx";
import ProjectsPage from "./ProjectsPage.jsx";
import ProjectPage from "./ProjectPage.jsx";
import TestimoniesPage from "./TestimoniesPage.jsx";
import ReportsPage from "./ReportsPage.jsx";
import ReportPage from "./ReportPage.jsx";
import TeamPage, { TeamMemberPage } from "./TeamPage.jsx";
import ContactPage from "./ContactPage.jsx";
import HelpPage from "./HelpPage.jsx";
import OfferHelpPage from "./OfferHelpPage.jsx";
import MissionPage from "./MissionPage.jsx";

const suspenseFallback = (
  <div className="route-fallback" aria-live="polite">
    Loading...
  </div>
);

function App({ RouterComponent = Router, routerProps = {} }) {
  return (
    <RouterComponent {...routerProps}>
      <ScrollToTop />
      <HeaderScrollEffect />
      <SectionFadeIn />
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
          path="/team/:memberId"
          element={
            <Suspense fallback={suspenseFallback}>
              <TeamMemberPage />
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
          path="/help"
          element={
            <Suspense fallback={suspenseFallback}>
              <HelpPage />
            </Suspense>
          }
        />
        <Route
          path="/offer-help"
          element={
            <Suspense fallback={suspenseFallback}>
              <OfferHelpPage />
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
    </RouterComponent>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

function HeaderScrollEffect() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      return undefined;
    }

    const headers = Array.from(document.querySelectorAll(".header-2"));
    const update = () => {
      const vh = window.innerHeight || 1;
      headers.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const distance = Math.min(Math.max(rect.top, 0), vh);
        const progress = Math.max(0, Math.min(1, 1 - distance / (vh * 0.7)));
        node.style.setProperty("--section-progress", progress.toFixed(3));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      headers.forEach((node) =>
        node.style.removeProperty("--section-progress"),
      );
    };
  }, [location.pathname]);

  return null;
}

function SectionFadeIn() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      return undefined;
    }

    const sections = Array.from(
      document.querySelectorAll("main:not(.home-main) > section"),
    );
    if (sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          } else {
            entry.target.classList.remove("section-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) =>
        section.classList.remove("section-visible"),
      );
    };
  }, [location.pathname]);

  return null;
}

function LandingPage() {
  const buttons = Array.isArray(landingContent.buttons)
    ? [...landingContent.buttons].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      )
    : [];
  const title = (landingContent.title ?? "").trim();
  const logo = (landingContent.logo ?? "").trim();

  return (
    <>
      <StickyContent />
      <main className="landing">
        <div className="landing-card">
          {logo && (
            <img
              className="landing-logo"
              src={logo}
              alt={title ? `${title} logo` : "Kickback logo"}
              fetchPriority="high"
              decoding="async"
            />
          )}
          {buttons.length > 0 && (
            <div className="landing-actions">
              {buttons.map((button) => (
                <LandingButton
                  key={`${button.url ?? ""}-${button.label ?? ""}`}
                  button={button}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function LandingButton({ button }) {
  if (!button?.url) {
    return null;
  }

  const label = button.label ?? "Learn more";
  const url = button.url.trim();
  const isExternal =
    /^https?:\/\//i.test(url) ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:");

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
