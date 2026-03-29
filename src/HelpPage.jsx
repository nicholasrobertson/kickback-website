import homeContent from "./content/pages/home.json";
import StickyContent from "./components/StickyContent.jsx";
import Footer from "./components/Footer.jsx";

function openUrl(url) {
  const target = (url ?? "").trim();
  if (!target) return;
  window.open(target, "_blank", "noopener,noreferrer");
}

const HELP_ITEMS = [
  {
    icon: "🍲",
    title: "Hot Meals",
    description: "Come in for a warm feed — no questions asked.",
  },
  {
    icon: "🛏️",
    title: "Safe Shelter",
    description: "A safe place to sleep and support finding stable housing.",
  },
  {
    icon: "👕",
    title: "Clothes",
    description: "Clean clothing and essentials whenever you need them.",
  },
  {
    icon: "💬",
    title: "Someone to Talk To",
    description: "People who get it and are here to listen — no judgement.",
  },
];

export default function HelpPage() {
  const email = homeContent.email;
  const phoneDisplay = homeContent.phoneNumber;
  const phoneLink = homeContent.phoneLink;
  const address = homeContent.address;
  const mapsLink = homeContent.mapsLink;

  return (
    <>
      <StickyContent />
      <main className="project full help-page">
        <section className="help-hero">
          <h1 className="help-hero-heading edo">
            <span className="prom">Help</span> is here
          </h1>
          <p className="help-hero-body">
            If you're doing it tough, Kick Back has your back. Walk in any time
            — everything is free, and you'll be treated with respect and aroha.
          </p>
        </section>

        <section className="help-services">
          <div className="help-services-grid">
            {HELP_ITEMS.map((item) => (
              <div key={item.title} className="help-service-card">
                <span className="help-service-icon">{item.icon}</span>
                <h3 className="help-service-title">{item.title}</h3>
                <p className="help-service-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="help-contact">
          <h2 className="help-contact-heading edo">Get in Touch</h2>
          <p className="help-contact-body">
            You can reach us however works best for you.
          </p>
          <div className="help-contact-list">
            <div
              className="help-contact-row"
              onClick={() => openUrl(homeContent.messengerLink)}
            >
              <img
                className="help-contact-icon"
                src="/images/messenger.svg"
                alt="Messenger"
              />
              <span className="help-contact-text">Message us on Facebook</span>
            </div>
            <div
              className="help-contact-row"
              onClick={() => openUrl(homeContent.instagramLink)}
            >
              <img
                className="help-contact-icon"
                src="/images/logo-insta-full.png"
                alt="Instagram"
              />
              <span className="help-contact-text">DM us on Instagram</span>
            </div>
            {phoneDisplay && (
              <a
                className="help-contact-row"
                href={phoneLink || `tel:${phoneDisplay}`}
              >
                <span className="help-contact-emoji">📞</span>
                <span className="help-contact-text">
                  Call free — {phoneDisplay}
                </span>
              </a>
            )}
            {address && (
              <a
                className="help-contact-row"
                href={mapsLink || "#"}
                target={mapsLink ? "_blank" : undefined}
                rel={mapsLink ? "noreferrer" : undefined}
              >
                <span className="help-contact-emoji">📍</span>
                <span className="help-contact-text">Walk in — {address}</span>
              </a>
            )}
            {email && (
              <a className="help-contact-row" href={`mailto:${email}`}>
                <span className="help-contact-emoji">✉️</span>
                <span className="help-contact-text">{email}</span>
              </a>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
