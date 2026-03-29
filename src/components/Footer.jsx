import { Link } from 'react-router-dom';
import homeContent from '../content/pages/home.json';

function normalizeRoutes(routes) {
  if (!Array.isArray(routes)) {
    return [];
  }
  return routes.filter((route) => route?.label && route?.to);
}

export default function Footer({ routes = homeContent.staticRoutes }) {
  const phoneDisplay = homeContent.phoneNumber ?? homeContent.phoneDisplay;
  const phoneLink = homeContent.phoneLink ?? (phoneDisplay ? `tel:${phoneDisplay}` : null);
  const email = homeContent.email;
  const address = homeContent.address;
  const mapsLink = homeContent.mapsLink;
  const messengerLink = homeContent.messengerLink;
  const instagramLink = homeContent.instagramLink;

  const navLinks = normalizeRoutes(routes);

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-accent" />
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src="/images/logo-kickback-dark.svg"
              alt="Kick Back Make Change"
              className="footer-logo"
            />
            <p className="footer-tagline">
              Ending youth homelessness through community, connection, and action.
            </p>
            <div className="footer-social-icons">
              {instagramLink && (
                <a href={instagramLink} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <img src="/images/logo-instagram.svg" alt="Instagram" />
                </a>
              )}
              {messengerLink && (
                <a href={messengerLink} target="_blank" rel="noreferrer" aria-label="Messenger">
                  <img src="/images/logo-facebook.svg" alt="Facebook Messenger" />
                </a>
              )}
            </div>
          </div>

          {navLinks.length > 0 && (
            <div className="footer-column footer-nav-col">
              <div className="footer-subheading">Navigate</div>
              <ul className="footer-links">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link className="footer-link" to={link.to}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="footer-column footer-contact-col">
            <div className="footer-subheading">Get in Touch</div>
            <div className="footer-contact-details">
              {phoneDisplay && (
                <a className="footer-link" href={phoneLink ?? `tel:${phoneDisplay}`}>
                  <span className="footer-contact-icon" aria-hidden="true">📞</span>
                  {phoneDisplay.replace(/📞/g, '').trim()}
                </a>
              )}
              {email && (
                <a className="footer-link" href={`mailto:${email}`}>
                  <span className="footer-contact-icon" aria-hidden="true">✉️</span>
                  {email}
                </a>
              )}
              {address &&
                (mapsLink ? (
                  <a className="footer-link" href={mapsLink} target="_blank" rel="noreferrer">
                    <span className="footer-contact-icon" aria-hidden="true">📍</span>
                    {address}
                  </a>
                ) : (
                  <span className="footer-link">
                    <span className="footer-contact-icon" aria-hidden="true">📍</span>
                    {address}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} Kick Back Make Change Charitable Trust
          </span>
          <span className="footer-bottom-sep">|</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
