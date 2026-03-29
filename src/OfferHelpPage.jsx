import { Link } from "react-router-dom";
import homeContent from "./content/pages/home.json";
import StickyContent from "./components/StickyContent.jsx";
import Footer from "./components/Footer.jsx";

const DONATE_URL =
  "https://www.chivecharities.nz/charity/kick-back-make-change";

const CONTACT_METHODS = [
  {
    icon: "/images/logo-insta-full.png",
    iconType: "img",
    label: "DM us on Instagram",
    url: homeContent.instagramLink,
  },
  {
    icon: "/images/messenger.svg",
    iconType: "img",
    label: "Message us on Facebook",
    url: homeContent.messengerLink,
  },
  {
    icon: "✉️",
    iconType: "emoji",
    label: homeContent.email,
    url: `mailto:${homeContent.email}`,
  },
];

function ContactLinks() {
  return (
    <div className="oh-contact-list">
      {CONTACT_METHODS.map((method) => (
        <a
          key={method.url}
          className="oh-contact-row"
          href={method.url}
          target="_blank"
          rel="noreferrer"
        >
          {method.iconType === "img" ? (
            <img className="oh-contact-icon" src={method.icon} alt="" />
          ) : (
            <span className="oh-contact-emoji">{method.icon}</span>
          )}
          <span className="oh-contact-text">{method.label}</span>
          <span className="oh-contact-arrow">→</span>
        </a>
      ))}
    </div>
  );
}

export default function OfferHelpPage() {
  return (
    <>
      <StickyContent />
      <main className="project full offer-help-page">
        <section className="oh-hero">
          <h1 className="oh-hero-heading edo">
            <span className="prom">Offer</span> Help
          </h1>
          <p className="oh-hero-body">
            Every bit counts. Whether it's money, time, goods, or a business
            partnership — your support helps young people get back on their feet.
          </p>
        </section>

        <section className="oh-ways">
          <div className="oh-ways-grid">
            <div className="oh-way-card oh-way-card--donate">
              <div className="oh-way-icon">💝</div>
              <h2 className="oh-way-title">Donate Money</h2>
              <p className="oh-way-desc">
                100% of donations go directly to supporting rangatahi
                experiencing homelessness — meals, shelter, and pathways to
                stability.
              </p>
              <a
                className="oh-way-cta oh-way-cta--primary"
                href={DONATE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Donate via Chive
              </a>
            </div>

            <div className="oh-way-card">
              <div className="oh-way-icon">🤝</div>
              <h2 className="oh-way-title">Volunteer Time</h2>
              <p className="oh-way-desc">
                Help cook meals, mentor rangatahi, assist with events, or lend
                your skills. We'll find the right fit for you.
              </p>
              <Link to="/volunteer" className="oh-way-cta oh-way-cta--secondary">
                Find Out More
              </Link>
            </div>

            <div className="oh-way-card">
              <div className="oh-way-icon">🏢</div>
              <h2 className="oh-way-title">Partner as a Business</h2>
              <p className="oh-way-desc">
                Sponsor a programme, provide employment pathways, or support us
                with services. Let's build something together.
              </p>
              <ContactLinks />
            </div>

            <div className="oh-way-card">
              <div className="oh-way-icon">📦</div>
              <h2 className="oh-way-title">Donate Goods</h2>
              <p className="oh-way-desc">
                We always need clothing, bedding, hygiene products, and food.
                Get in touch to arrange a drop-off.
              </p>
              <ContactLinks />
            </div>
          </div>
        </section>
      </main>
      <Footer routes={homeContent.staticRoutes} />
    </>
  );
}
