import { Link } from "react-router-dom";
import homeContent from "./content/pages/home.json";
import StickyContent from "./components/StickyContent.jsx";
import Footer from "./components/Footer.jsx";

const REQUIREMENTS = [
  {
    icon: "🔍",
    title: "Police Vetting",
    body: "All volunteers must pass a police vet before working with our rangatahi. We'll guide you through the process.",
  },
  {
    icon: "📋",
    title: "Orientation & Training",
    body: "You'll complete a short orientation covering our kaupapa, health & safety, and working with young people.",
  },
  {
    icon: "🤝",
    title: "Commitment",
    body: "We ask for a regular weekly or fortnightly commitment so our rangatahi can build trust and consistency.",
  },
  {
    icon: "💛",
    title: "Respect & Aroha",
    body: "Our space is judgement-free. Volunteers must be respectful, culturally aware, and led by empathy.",
  },
];

const ROLES = [
  "Cooking and serving meals",
  "Mentoring and life-skills support",
  "Event help and setup",
  "Admin and fundraising",
  "Trades, maintenance, and DIY",
  "Creative workshops (art, music, etc.)",
];

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

export default function VolunteerPage() {
  return (
    <>
      <StickyContent />
      <main className="project full volunteer-page">
        <section className="vol-hero">
          <Link to="/offer-help" className="vol-back">
            ← Back to Offer Help
          </Link>
          <h1 className="vol-hero-heading edo">
            <span className="prom">Volunteer</span> With Us
          </h1>
          <p className="vol-hero-body">
            Our volunteers are the backbone of Kick Back. If you've got time,
            energy, and aroha to give — we'd love to have you.
          </p>
        </section>

        <section className="vol-section">
          <h2 className="vol-section-heading edo">What You Can Do</h2>
          <div className="vol-roles">
            {ROLES.map((role) => (
              <div key={role} className="vol-role">
                <span className="vol-role-check">✓</span>
                <span>{role}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="vol-section">
          <h2 className="vol-section-heading edo">Requirements</h2>
          <p className="vol-section-intro">
            We work with vulnerable young people, so we need to make sure
            everyone in our space is safe. Here's what's involved:
          </p>
          <div className="vol-req-grid">
            {REQUIREMENTS.map((req) => (
              <div key={req.title} className="vol-req-card">
                <span className="vol-req-icon">{req.icon}</span>
                <h3 className="vol-req-title">{req.title}</h3>
                <p className="vol-req-body">{req.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="vol-section vol-cta-section">
          <h2 className="vol-section-heading edo">Ready to Get Started?</h2>
          <p className="vol-section-intro">
            Reach out and we'll get the ball rolling.
          </p>
          <div className="vol-contact-list">
            {CONTACT_METHODS.map((method) => (
              <a
                key={method.url}
                className=""
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
        </section>
      </main>
      <Footer routes={homeContent.staticRoutes} />
    </>
  );
}
