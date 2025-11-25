import StickyContent from './components/StickyContent.jsx';

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

export function ContactSection({
  sectionId = 'contact',
  headingPrefix = 'Contact ',
  headingHighlight = 'Us',
}) {
  return (
    <section className="people" id={sectionId}>
      <div className="header-2">
        <h2>
          <span className="italic prom-2">{headingPrefix}</span>
          {headingHighlight}
        </h2>
      </div>
      <div className="people-cards">
        <div className="people-card">
          <div className="pc-header">
            <div>
              <div className="edo name">Aaron Hendry</div>
              <div className="italic prom-2 bold">Founder</div>
            </div>
            <div className="avatar-wrapper">
              <div className="avatar"></div>
            </div>
          </div>
          <div className="pc-body">
            <div className="pc-email">
              <div className="">
                <span className="italic prom-2">e: </span>
                <span className="email" onClick={() => window.open('mailto:ajhendry@kickbackmakechange.org')}>
                  ajhendry@kickbackmakechange.org
                </span>
              </div>
            </div>
            <div className="pc-phone">
              <div className="">
                <span className="italic prom-2">m: </span>
                <span className="">027 534 4417</span>
              </div>
            </div>
          </div>
          <div className="socials hundy">
            <div className="soc-item">
              <a href="https://www.instagram.com/a.j.hendry/" target="_blank">
                <span className="socicon socicon-instagram">
                  <img src="/images/logo-w-insta.png" />
                </span>
              </a>
            </div>
            <div className="soc-item">
              <a href="https://www.facebook.com/aejayhendry/" target="_blank">
                <span className="socicon socicon-facebook">
                  <img src="/images/logo-w-fb.png" />
                </span>
              </a>
            </div>
            <div className="soc-item">
              <a
                href="https://www.linkedin.com/in/aaron-hendry-2687929b/?trk=public_post_follow-view-profile&originalSubdomain=nz"
                target="_blank"
              >
                <span className="socicon socicon-linkedin">
                  <img src="/images/logo-w-linkedin.png" />
                </span>
              </a>
            </div>
            <div className="soc-item">
              <a href="https://twitter.com/AeJayHendry" target="_blank">
                <span className="socicon socicon-linkedin">
                  <img src="/images/logo-w-x.png" />
                </span>
              </a>
            </div>
            <div className="soc-item">
              <a href="https://open.spotify.com/show/5bNyvdQuTlicXECh340j2U" target="_blank">
                <span className="socicon socicon-linkedin">
                  <img src="/images/logo-w-spotify.png" />
                </span>
              </a>
            </div>
            <div className="soc-item">
              <a href="https://www.tiktok.com/@a_j_hendry" target="_blank">
                <span className="socicon socicon-linkedin">
                  <img src="/images/logo-w-tiktok.webp" />
                </span>
              </a>
            </div>
            <div
              className="btn give green"
              onClick={() =>
                window.open(
                  'https://givealittle.co.nz/cause/help-us-kick-back-against-youth-homelessness',
                  '_blank',
                )
              }
            >
              Give a Little!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
