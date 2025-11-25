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
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-heading">KICK BACK MAKE CHANGE CHARITABLE TRUST</div>
          <img
            className="footer-logo"
            src="/images/logo-kickback-dark.svg"
            alt="Kick Back Make Change logo"
            loading="lazy"
          />
        </div>
        <div className="footer-grid">
          <div className="footer-column footer-contact">
            <div className="footer-subheading">Contact</div>
            <div className="footer-contact-details">
              {email && (
                <a className="footer-link" href={`mailto:${email}`}>
                  {email}
                </a>
              )}
              {phoneDisplay && (
                <a className="footer-link" href={phoneLink ?? `tel:${phoneDisplay}`}>
                  {phoneDisplay}
                </a>
              )}
              {address &&
                (mapsLink ? (
                  <a className="footer-link" href={mapsLink} target="_blank" rel="noreferrer">
                    {address}
                  </a>
                ) : (
                  <span className="footer-link">{address}</span>
                ))}
            </div>
          </div>
          <div className="footer-column footer-social">
            <div className="footer-social-icons">
              {messengerLink && (
                <a href={messengerLink} target="_blank" rel="noreferrer" aria-label="Messenger">
                  <img src="/images/messenger.svg" alt="Messenger" />
                </a>
              )}
              {instagramLink && (
                <a href={instagramLink} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <img src="/images/logo-insta-full.png" alt="Instagram" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
