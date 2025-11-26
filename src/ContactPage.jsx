import homeContent from './content/pages/home.json';
import StickyContent from './components/StickyContent.jsx';
import Footer from './components/Footer.jsx';

function openUrl(url) {
  const target = (url ?? '').trim();
  if (!target) return;
  window.open(target, '_blank', 'noopener,noreferrer');
}

export default function ContactPage() {
  return (
    <>
      <StickyContent showBackLink />
      <main className="project full contact-page">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export function ContactSection({
  sectionId = 'contact',
  headingPrefix = 'Contact ',
  headingHighlight = 'Us',
}) {
  const email = homeContent.email;
  const phoneDisplay = homeContent.phoneNumber;
  const phoneLink = homeContent.phoneLink;
  const address = homeContent.address;
  const mapsLink = homeContent.mapsLink;

  return (
    <section className="people" id={sectionId}>
      <div className="header-2">
        <h2>
          <span className="italic prom-2">{headingPrefix}</span>
          {headingHighlight}
        </h2>
      </div>
      <div className="contact-card-grid">
        <div className="messenger" onClick={() => openUrl(homeContent.messengerLink)}>
          <img id="messenger" src="/images/messenger.svg" alt="Messenger" />
        </div>
        <div className="messenger" onClick={() => openUrl(homeContent.instagramLink)}>
          <img id="messenger" src="/images/logo-insta-full.png" alt="Instagram" />
        </div>
        {phoneDisplay && (
          <div className="contact-card mission-card">
            <p className="contact-type">Free Phone</p>
            <a className="contact-value phone" href={phoneLink || `tel:${phoneDisplay}`}>
              {phoneDisplay}
            </a>
          </div>
        )}
        {address && (
          <div className="contact-card mission-card">
            <p className="contact-type">Physical Address</p>
            {mapsLink ? (
              <a className="contact-value address" href={mapsLink} target="_blank" rel="noreferrer">
                {address}
              </a>
            ) : (
              <span className="contact-value address">{address}</span>
            )}
          </div>
        )}
        {email && (
          <div className="contact-card mission-card">
            <p className="contact-type">Email</p>
            <a className="contact-value email" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
