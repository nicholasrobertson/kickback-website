import StickyContent from './components/StickyContent.jsx';
import { ProjectsSection } from './Home.jsx';

export default function ProjectsPage() {
  return (
    <>
      <StickyContent showBackLink />
      <main className="project full projects-page">
        <ProjectsSection />
      </main>
    </>
  );
}
