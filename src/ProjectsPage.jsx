import { ProjectsSection } from './Home.jsx';
import StickyContent from './components/StickyContent.jsx';
import Footer from './components/Footer.jsx';

export default function ProjectsPage() {
  return (
    <>
      <StickyContent showBackLink />
      <main className="project full projects-page">
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
