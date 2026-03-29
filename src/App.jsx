import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

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
import VolunteerPage from "./VolunteerPage.jsx";
import MissionPage from "./MissionPage.jsx";
import ApproachPage from "./ApproachPage.jsx";

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
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/landing" element={<Navigate to="/home" replace />} />
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
          path="/volunteer"
          element={
            <Suspense fallback={suspenseFallback}>
              <VolunteerPage />
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
        <Route
          path="/approach"
          element={
            <Suspense fallback={suspenseFallback}>
              <ApproachPage />
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

export default App;
