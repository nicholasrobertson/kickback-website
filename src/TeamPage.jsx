import StickyContent from './components/StickyContent.jsx';
import { ContactSection } from './Home.jsx';

export default function TeamPage() {
  return (
    <>
      <StickyContent showBackLink />
      <main className="project full team-page">
        <ContactSection headingPrefix="Our " headingHighlight="Community" />
      </main>
    </>
  );
}
