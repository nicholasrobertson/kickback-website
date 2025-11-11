import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import homeContent from './content/pages/home.json';
import { getContent } from './content/helper.js';
import ProjectPage from './ProjectPage.jsx';
import { ProjectMiniCard } from './components/ProjectMiniCard.jsx';
import SafeHeader from './components/SafeHeader.jsx';

const projectContent = getContent('projects');
const articleContent = getContent('articles');
const partnerContent = getContent('partners');

const partnerTypeLabels = {
  seed: 'Visionary Seed Funders',
  corporate: 'Corporate Supporters',
  local: 'Local Socially Conscious Businesses',
};

const partnerTypeOrder = ['seed', 'corporate', 'local'];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projects/:projectId"
          element={<ProjectPage projects={projectContent} />}
        />
      </Routes>
    </Router>
  );
}

function HomePage() {
  const sortedActions = [...(homeContent.actions ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const rawHeroHeading = (homeContent.headerText ?? homeContent.h1Text ?? '').trim();
  const heroWords = rawHeroHeading ? rawHeroHeading.split(' ') : [];
  let heroPrefix = '';
  let heroHighlight = '';
  if (heroWords.length > 1) {
    heroHighlight = heroWords.pop();
    heroPrefix = heroWords.join(' ');
  } else if (heroWords.length === 1) {
    heroHighlight = heroWords[0];
  }
  const subheadingText = (homeContent.h2Text ?? '').trim();
  const [subheadingFirstWord, ...subheadingRestWords] = subheadingText
    ? subheadingText.split(' ')
    : [];
const subheadingRest = subheadingRestWords.join(' ');

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleHeroAction = (action) => {
    if (!action?.url) {
      return;
    }
    if (action.url.startsWith('#')) {
      scrollToId(action.url.slice(1));
    } else {
      window.open(action.url, '_blank');
    }
  };

  return (
    <>
      <SafeHeader />
      <main>
        <Hero
          rawHeroHeading={rawHeroHeading}
          heroHighlight={heroHighlight}
          heroPrefix={heroPrefix}
          subheadingFirstWord={subheadingFirstWord}
          subheadingRest={subheadingRest}
          actions={sortedActions}
          onHeroAction={handleHeroAction}
        />
        <Projects projects={projectContent} />
        <Gallery />
        <PromotedArticles />
        <Partners scrollToId={scrollToId} partners={partnerContent} />
        <Articles articles={articleContent} />
        <Team />
      </main>
      <footer>
        <div className="footer">
          website donated with 🩷 by{' '}
          <span className="prom bold sf" onClick={() => window.open('https://sparefish.co.nz', '_blank')}>
            SPAREFISH
          </span>
        </div>
      </footer>
    </>
  );
}

function Hero({
  rawHeroHeading,
  heroHighlight,
  heroPrefix,
  subheadingFirstWord,
  subheadingRest,
  actions,
  onHeroAction,
}) {
  const hasActions = Array.isArray(actions) && actions.length > 0;

  return (
    <>
      <section className="hero">
        <h1>
          {heroHighlight ? (
            <>
              {heroPrefix && (
                <span>
                  {heroPrefix}
                  <br />
                </span>
              )}
              <span id="movement" className="prom">
                {heroHighlight}
              </span>
            </>
          ) : (
            <span>{rawHeroHeading}</span>
          )}
        </h1>
        <img id="header-logo" src="/images/logo-kickback-dark.svg" alt="Kick Back Logo" />
      </section>
      <section className="">
        <div className="end edo">
          {subheadingFirstWord && <span style={{ color: 'white' }}>{subheadingFirstWord}</span>}
          {subheadingRest && <span> {subheadingRest}</span>}
        </div>
      </section>
      {hasActions && (
        <section className="hero-btn">
          {actions.map((action) => (
            <div
              key={`${action.label}-${action.url}`}
              className="btn med cool"
              onClick={() => onHeroAction(action)}
            >
              {action.label}
            </div>
          ))}
        </section>
      )}
    </>
  );
}

function Projects({ projects = projectContent }) {
  const items = Array.isArray(projects) ? [...projects] : [];

  return (
    <>
      <div className="img-hug full">
        {/*<svg id="img-hug" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-name="Layer 1" width="667.1889" height="648.09919" viewBox="0 0 667.1889 648.09919"><path d="M731.16,329.07779h0c-.99343-118.05925-96.9653-213.474-215.24736-213.539-119.30334-.065-215.54446,97.80088-215.54446,217.04852V723.62367a38.06566,38.06566,0,0,0,38.06565,38.06566H731.16c118.95982,0,215.39591-98.293,215.39591-217.25277S850.11982,329.07779,731.16,329.07779Z" transform="translate(-279.36708 -113.68188)" fill="#FB5DBD" fill-opacity="0.75"/><path d="M731.16,327.22093h0c-.99343-118.05925-96.9653-213.47406-215.24736-213.539-64.67448,0-122.55285,28.72564-162.02971,74.0609A213.10271,213.10271,0,0,1,484.346,143.39164c118.28208.065,214.254,95.47982,215.24733,213.539h0c118.95982,0,215.39591,96.43609,215.39591,215.39591a214.60667,214.60667,0,0,1-52.72556,141.18646,215.03379,215.03379,0,0,0,84.2922-170.89624C946.55591,423.657,850.11982,327.22093,731.16,327.22093Z" transform="translate(-279.36708 -113.68188)" opacity="0.1" style="isolation:isolate"/><path d="M530.21857,459.34959c-8.77835-27.97616-28.74047-53.63489-56.34769-63.09234C446.262,386.79978,405.83571,401.20658,385.08,421.892c-37.96615,37.83783-39.89895,176.50419-13.81463,217.58144,5.18824-.27463,23.09094-.47776,28.342-.67443l7.42834-24.7583V638.555c40.98648-1.26665,86.60616,32.44552,126.351.34661C537.21339,609.81844,538.99685,487.32575,530.21857,459.34959Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/><circle cx="191.01404" cy="374.23728" r="59.20984" fill="#dfb0a1"/><path d="M511.06536,410.81752c-22.61753-13.78871-52.76085-14.18618-75.73583-.99844-22.9732,13.18775-37.83151,39.41789-37.33189,65.90322,33.09658,1.522,67.427,32.6052,103.118,1.98674l8.33164-20.3911,4.912,20.40618q16.11316-.00159,32.28754-.04239C547.84636,451.21894,533.68453,424.60625,511.06536,410.81752Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/><path d="M524.284,450.9665c13.58777-25.98266,37.7731-47.70649,66.61777-52.13235a61.75329,61.75329,0,0,1,22.75765,1.14965c42.47177,9.5318,69.04236,51.86931,60.74091,94.5986-1.64669,8.476-3.5699,17.24491-4.94388,26.98169a24.4543,24.4543,0,0,1-29.43616,20.415l-.15774-.03429-7.268-1.554c-21.6-4.57421-46.31539.59487-69.7494.31242-34.92653-.421-59.47338-34.514-48.33735-67.62034A152.98331,152.98331,0,0,1,524.284,450.9665Z" transform="translate(-279.36708 -113.68188)" fill="#AAFE80"/><circle cx="298.75837" cy="375.98648" r="59.20984" fill="#dfb0a1"/><path d="M551.71845,406.58684c24.69963-9.5713,54.43809-4.63148,74.71856,12.41166,20.27873,17.04282,30.26386,45.48727,25.088,71.46674C618.681,486.11,579.39446,510.63158,549.68116,474.18359l-4.594-21.54317-8.44352,19.2158q-15.85887-2.85127-31.77107-5.752C508.372,439.84644,527.01721,416.15786,551.71845,406.58684Z" transform="translate(-279.36708 -113.68188)" fill="#AAFE80"/><path d="M720.07866,552.39292a24.1041,24.1041,0,0,0-36.19122,7.50282L516.75755,618.61481l16.58379,35.24532,161.79922-60.29989a24.23473,24.23473,0,0,0,24.9381-41.16732Z" transform="translate(-279.36708 -113.68188)" fill="#dfb0a1"/><path d="M541.48719,591.11274l-24.69011,10.68271-13.19589,5.7154-8.61029,3.71867a27.77552,27.77552,0,0,0-10.02981,4.99314A28.04031,28.04031,0,0,0,509.29943,665.449l50.53246-5.77367a10.09712,10.09712,0,0,0,7.16742-4.34957c1.66846-2.44022,17.26786-9.79112,16.514-12.64117l6.6755-3.06105,9.68765-3.03484L636.24783,619.856h0L630.748,599.51673h0l5.088-24.96751c-.76119-2.81572-83.28837,17.99318-85.9268,16.74873A10.04533,10.04533,0,0,0,541.48719,591.11274Z" transform="translate(-279.36708 -113.68188)" fill="#3f3d56"/><path d="M612.25806,758.70472H381.4177a36.11016,36.11016,0,0,1-36.11016-36.11016V637.60985a36.11016,36.11016,0,0,1,36.11016-36.11016l29.53-41.6077H514.02442l98.23364,41.6077a36.11015,36.11015,0,0,1,36.11015,36.11016v84.98471A36.11015,36.11015,0,0,1,612.25806,758.70472Z" transform="translate(-279.36708 -113.68188)" fill="#3f3d56"/><path d="M694.90021,758.70472H488.4362A36.11016,36.11016,0,0,1,452.326,722.59456V637.60985a36.11016,36.11016,0,0,1,36.11016-36.11016l54.36548-41.6077H645.87843l49.02178,41.6077a36.11016,36.11016,0,0,1,36.11016,36.11016v84.98471A36.11016,36.11016,0,0,1,694.90021,758.70472Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/><path d="M509.37885,748.16663a23.18264,23.18264,0,0,1-35.42065,3.0022L329.73933,755.832l-18.43991.59626h0c-18.96735.61328-29.89283-21.331-17.97144-36.09638L306.13706,704.467l45.81424,7.18573,16.56586.726,106.58868,4.671a23.30816,23.30816,0,0,1,34.27295,31.117Z" transform="translate(-279.36708 -113.68188)" fill="#dfb0a1"/><path d="M382.16322,568.41992s-27.49085-6.97525-40.521,15.46311c-10.43158,17.96362-45.91672,85.90365-53.283,113.78781-35.94223,86.61871,47.62448,52.125,45.28635,60.29578L361.603,712.07575c12.14765-6.07379-11.23529,1.76519-14.31555-2.59l21.43085-23.29205,24.29529-12.14765,8.91449-95.10583Z" transform="translate(-279.36708 -113.68188)" fill="#3f3d56"/><path d="M482.94351,751.78681a23.18264,23.18264,0,0,0,35.42066,3.00219L662.583,759.45221l18.43991.59625h0c18.96735.61328,29.89282-21.331,17.97143-36.09637L686.1853,708.08722,640.37106,715.273l-16.56585.726-106.58869,4.671a23.30816,23.30816,0,0,0-34.27295,31.117Z" transform="translate(-279.36708 -113.68188)" fill="#dfb0a1"/><path d="M610.15915,572.0401s27.49084-6.97525,40.521,15.46311c10.43157,17.96362,45.91671,85.90365,53.283,113.78781,35.94224,86.61871-47.62448,52.125-45.28634,60.29577l-27.9574-45.89087c-12.14764-6.07379,11.23529,1.7652,14.31555-2.59L623.6041,689.8139l-24.29529-12.14764-8.91449-95.10583Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/></svg>*/}
      </div>
      <section className="project full" id="front-door-head">
        <div className="header-2">
          <h2 className="italic edo">
            <span className="prom-2">Our </span>Mahi
          </h2>
        </div>
      </section>
      <section className="project full project-grid" id="front-door">
        {items.map((project) => {
          const projectId = project.id ?? project.slug ?? project.title;
          return <ProjectMiniCard key={projectId} project={project} />;
        })}
      </section>
    </>
  );
}


function Gallery() {
  return (
    <section className="full">
      <div className="header-2">
        <h2 className="italic edo">
          <span className="prom-2">Progress </span>Update!
        </h2>
      </div>
      <div className="p-images">
        <a href="/images/fd-1.jpg" data-lightbox="gallery">
          <img src="/images/fd-1.jpg" alt="Thumbnail" />
        </a>
        <a href="/images/fd-2.jpg" data-lightbox="gallery">
          <img src="/images/fd-2.jpg" alt="Thumbnail" />
        </a>
        <a href="/images/fd-3.jpg" data-lightbox="gallery">
          <img src="/images/fd-3.jpg" alt="Thumbnail" />
        </a>
        <a href="/images/fd-4.jpg" data-lightbox="gallery">
          <img src="/images/fd-4.jpg" alt="Thumbnail" />
        </a>
        <a href="/images/fd-5.jpg" data-lightbox="gallery">
          <img src="/images/fd-5.jpg" alt="Thumbnail" />
        </a>
        <a href="/images/fd-6.jpg" data-lightbox="gallery">
          <img src="/images/fd-6.jpg" alt="Thumbnail" />
        </a>
        <a href="/images/fd-7.jpg" data-lightbox="gallery">
          <img src="/images/fd-7.jpg" alt="Thumbnail" />
        </a>
        <a href="/images/fd-8.jpg" data-lightbox="gallery">
          <img src="/images/fd-8.jpg" alt="Thumbnail" />
        </a>
      </div>
    </section>
  );
}

function PromotedArticles() {
  return (
    <section className="news">
      <div className="header-2">
        <h2 className="edo">
          <span className="italic prom-2">In the</span> News
        </h2>
      </div>
      <div className="news-cards">
        <div
          className="news-card"
          onClick={() =>
            window.open(
              'https://www.rnz.co.nz/news/national/505952/auckland-couple-going-without-to-help-homeless-youth',
              '_blank',
            )
          }
        >
          <div className="cd-logo">
            <img src="/images/logo-rnz.png" alt="News 1" />
          </div>
          <div className="cd-header">RNZ</div>
          <div className="italic">Auckland couple going without to help homeless youth</div>
        </div>
        <div
          className="news-card"
          onClick={() =>
            window.open(
              'https://www.nzherald.co.nz/nz/a-social-workers-novel-solution-for-homeless-youth-his-own-home/3HQMB5DRFFBL5D37DYA2KUAQY4/',
              '_blank',
            )
          }
        >
          <div className="cd-logo">
            <img src="/images/logo-herald.png" alt="News 2" />
          </div>
          <div className="cd-header">NZ Herald</div>
          <div className="italic">A youth worker came up with a novel solution for homeless teens: His own home</div>
        </div>
        <div
          className="news-card"
          onClick={() =>
            window.open(
              'https://www.odt.co.nz/news/national/couple-spend-savings-centre-homeless-youth',
              '_blank',
            )
          }
        >
          <div className="cd-logo">
            <img src="/images/logo-odt.png" alt="News 3" />
          </div>
          <div className="cd-header">ODT</div>
          <div className="italic">Couple spend savings on centre for homeless youth</div>
        </div>
      </div>
      <div className="videos">
        <div className="video-wrapper">
          <img className="video" src="/images/video_2.png" alt="Video 2" />
          <div
            className="play-icon cambo"
            onClick={() =>
              window.open(
                'https://www.1news.co.nz/2019/09/11/national-response-to-youth-homelessness-problem-needed-frontline-worker-says/',
                '_blank',
              )
            }
          >
            {/*<svg id="play-icon" width="110" height="122" viewBox="0 0 110 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M102.5 48.0096C112.5 53.7831 112.5 68.2169 102.5 73.9904L23 119.89C13 125.663 0.499994 118.446 0.499994 106.899L0.499998 15.1006C0.499999 3.55364 13 -3.66324 23 2.11027L102.5 48.0096Z"
                            fill="var(--color-video-icon)" fill-opacity="0.9" />
                    </svg>*/}
          </div>
        </div>
        <div className="video-wrapper">
          <img className="video" src="/images/video_1.png" alt="Video 1" />
          <div
            className="play-icon newshub"
            onClick={() =>
              window.open(
                'https://www.1news.co.nz/2024/02/21/sanctions-dont-work-hipkins-on-govts-benefit-changes',
                '_blank',
              )
            }
          >
            {/*<svg id="play-icon" width="110" height="122" viewBox="0 0 110 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M102.5 48.0096C112.5 53.7831 112.5 68.2169 102.5 73.9904L23 119.89C13 125.663 0.499994 118.446 0.499994 106.899L0.499998 15.1006C0.499999 3.55364 13 -3.66324 23 2.11027L102.5 48.0096Z"
                            fill="var(--color-video-icon)" fill-opacity="0.9" />
                    </svg>*/}
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners({ scrollToId, partners = partnerContent }) {
  const items = Array.isArray(partners)
    ? partners.filter((partner) => partner?.onHomePage !== false)
    : [];

  const renderLogo = (partner) => {
    const logoSrc = partner.logo || '/images/logo-kickback-dark.svg';
    const altText = partner.name ? `${partner.name} logo` : 'Partner logo';
    const logoImage = <img src={logoSrc} alt={altText} />;

    if (partner.url) {
      return (
        <a
          href={partner.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${partner.name ?? 'partner'} website`}
        >
          {logoImage}
        </a>
      );
    }

    return logoImage;
  };

  return (
    <>
      <section className="partners full">
        <div className="header-2">
          <h2>
            <span className="italic prom-2">Our </span>Partners
          </h2>
        </div>
        {partnerTypeOrder.map((type) => {
          const sectionPartners = items.filter((partner) => partner.type === type);
          if (sectionPartners.length === 0) {
            return null;
          }

          return (
            <div key={type}>
              <div className="cd-header">{partnerTypeLabels[type]}</div>
              <div className="partner-cards">
                {sectionPartners.map((partner) => (
                  <div
                    className="partner-card"
                    key={partner.id ?? partner.slug ?? partner.name ?? partner.logo}
                    style={
                      partner.backgroundColor
                        ? { backgroundColor: partner.backgroundColor }
                        : undefined
                    }
                  >
                    <div className="cd-logo big">{renderLogo(partner)}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      <section className="partner-links full">
        <div className="partner-link">
          <div className="cd-header">Becoming a Partner</div>
          <div className="btn cool" onClick={() => scrollToId('contact')}>
            Contact us to find out more
          </div>
        </div>
      </section>
    </>
  );
}

function Articles({ articles = [] }) {
  const items = Array.isArray(articles)
    ? articles.filter((article) => article?.onHomePage !== false)
    : [];

  const openArticle = (url) => {
    if (!url) {
      return;
    }

    window.open(url, '_blank');
  };

  return (
    <section className="project full" id="advocacy">
      <div className="header-2">
        <h2 className="italic">
          <span className="prom-2">Our </span>Advocacy
        </h2>
      </div>
      <div className="adv-cards">
        {items.map((article) => (
          <div
            key={article.id ?? article.slug ?? article.url}
            className="news-card"
            onClick={() => openArticle(article.url)}
          >
            {article.image && (
              <div className="cd-logo">
                <img src={article.image} alt={article.title} />
              </div>
            )}
            <div className="cd-header">{article.title}</div>
            {article.description && <div className="italic">{article.description}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="people" id="contact">
      <div className="header-2">
        <h2>
          <span className="italic prom-2">Contact </span>Us
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

function Testimonials() {
  return null;
}

function Reports() {
  return null;
}

function Mission() {
  return null;
}

function Volunteer() {
  return null;
}

export default App
