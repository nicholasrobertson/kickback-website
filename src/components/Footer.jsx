import { Link } from 'react-router-dom';
import homeContent from '../content/pages/home.json';

const footerStyles = {
  root: {
    backgroundColor: '#050505',
    color: '#fff',
    padding: '4rem 2rem',
    fontSize: '3.2rem',
    lineHeight: 1.2,
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2.4rem',
    justifyContent: 'space-between',
  },
  section: {
    flex: '1 1 260px',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  heading: {
    margin: 0,
    fontSize: '0.85em',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  anchor: {
    color: '#fff',
    textDecoration: 'none',
  },
  locationImage: {
    width: '100%',
    borderRadius: '1.2rem',
    border: '4px solid #222',
    display: 'block',
    cursor: 'pointer',
  },
  credit: {
    marginTop: '3rem',
    textAlign: 'center',
    fontSize: '0.7em',
  },
  creditLink: {
    color: '#8ef5ff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

const locationLink = 'https://maps.app.goo.gl/nmLaCAnuJk3yz1Z57';
const locationImage = '/images/frontdoor-sign.jpg';

const contactDetails = [
  homeContent.phoneLink && homeContent.phoneDisplay
    ? {
        label: 'Phone',
        display: homeContent.phoneDisplay,
        href: homeContent.phoneLink,
      }
    : null,
  homeContent.email
    ? {
        label: 'Email',
        display: homeContent.email,
        href: `mailto:${homeContent.email}`,
      }
    : null,
  homeContent.messengerLink
    ? {
        label: 'Messenger',
        display: 'Message us',
        href: homeContent.messengerLink,
      }
    : null,
  homeContent.instagramLink
    ? {
        label: 'Instagram',
        display: '@kick_back_make_change',
        href: homeContent.instagramLink,
      }
    : null,
].filter(Boolean);

// Render <Footer /> underneath the primary page layout (e.g., after <main />) when ready.
export default function Footer() {
  const staticRoutes = Array.isArray(homeContent.staticRoutes)
    ? homeContent.staticRoutes.filter((route) => route?.label && route?.to)
    : [];

  return (
    <footer style={footerStyles.root}>
      <div style={footerStyles.content}>
        <section style={footerStyles.section}>
          <h2 style={footerStyles.heading}>Contact</h2>
          <ul style={footerStyles.list}>
            {contactDetails.map((entry) => {
              const isExternalLink = /^https?:/i.test(entry.href);

              return (
                <li key={`${entry.label}-${entry.href}`}>
                  <a
                    style={footerStyles.anchor}
                    href={entry.href}
                    target={isExternalLink ? '_blank' : undefined}
                    rel={isExternalLink ? 'noreferrer' : undefined}
                  >
                    {entry.display}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section style={footerStyles.section}>
          <h2 style={footerStyles.heading}>Visit us</h2>
          <a href={locationLink} target="_blank" rel="noreferrer" aria-label="Open location in Maps">
            <img
              style={footerStyles.locationImage}
              src={locationImage}
              alt="Kick Back front door entrance"
              loading="lazy"
            />
          </a>
          <span>
            307 Karangahape Rd
            <br />
            Auckland
          </span>
        </section>

        <section style={footerStyles.section}>
          <h2 style={footerStyles.heading}>Navigate</h2>
          <ul style={footerStyles.list}>
            {staticRoutes.map((route) => (
              <li key={route.to}>
                {route.to.startsWith('http') ? (
                  <a style={footerStyles.anchor} href={route.to}>
                    {route.label}
                  </a>
                ) : (
                  <Link style={footerStyles.anchor} to={route.to}>
                    {route.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div style={footerStyles.credit}>
        website donated with 🩷 by{' '}
        <a
          style={footerStyles.creditLink}
          href="https://sparefish.co.nz"
          target="_blank"
          rel="noreferrer"
        >
          SPAREFISH
        </a>
      </div>
    </footer>
  );
}
