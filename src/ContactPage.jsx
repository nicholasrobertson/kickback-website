import StickyContent from './components/StickyContent.jsx';
import { ContactSection } from './Home.jsx';

export default function ContactPage() {
  return (
    <>
      <StickyContent showBackLink />
      <main className="project full contact-page">
        <ContactSection />
      </main>
    </>
  );
}
