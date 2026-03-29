import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import homeContent from "./content/pages/home.json";
import { getContent } from "./content/helper.js";
import { ProjectMiniCard } from "./components/ProjectMiniCard.jsx";
import StickyContent from "./components/StickyContent.jsx";
import Footer from "./components/Footer.jsx";
import { getDescriptionPreview } from "./utils/projects.js";
import { Mission } from "./MissionPage.jsx";
import { TeamSection } from "./TeamPage.jsx";
import { SubstackEmbed } from "./ReportsPage.jsx";
import { useEffect, useRef, useState } from "react";

const projectContent = getContent("projects");
const articleContent = getContent("articles");
const reportContent = getContent("reports");
const partnerContent = getContent("partners");
const testimonyContent = getContent("testimonies");
const teamContent = getContent("team");

const partnerTypeLabels = {
  seed: "Visionary Seed Funders",
  corporate: "Corporate Supporters",
  local: "Local Socially Conscious Businesses",
};

const partnerTypeOrder = ["seed", "corporate", "local"];

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll("main.home-main > section"),
    );
    const handleScroll = () => {
      const y = window.scrollY || 0;
      const boost = Math.min(y * 0.18, 140);
      root.style.setProperty("--hero-scroll-boost", boost.toFixed(2));
      const vh = window.innerHeight || 1;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.min(rect.top, vh);
        const progress = Math.max(0, Math.min(1, 1 - distance / (vh * 0.7)));
        section.style.setProperty("--section-progress", progress.toFixed(3));
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          } else {
            entry.target.classList.remove("section-visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
      sections.forEach((section) =>
        section.classList.remove("section-visible"),
      );
    };
  }, []);

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <StickyContent />
      <main className="home-main">
        <Hero />
        <ProjectsGalleryMarquee projects={projectContent} />
        <MissionSection />
        <ProjectsSection projects={projectContent} />
        <PromotedArticles articles={articleContent} />
        <Testimonies testimonies={testimonyContent} />
        <Partners scrollToId={scrollToId} partners={partnerContent} />
        <Publications reports={reportContent} />
        <BoardSection members={teamContent} />
      </main>
      <Footer routes={homeContent.staticRoutes} />
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-h1 edo">
            <span>Need a </span>
            <span className="prom">safe place?</span>
          </h1>
        </div>
        <div className="hero-right">
          <p className="hero-tagline">
            You don't have to figure this out alone. Kick Back is here for you — a
            warm meal, a safe space, someone to talk to, and real help getting
            back on your feet. No judgement, just aroha.
          </p>
          <div className="hero-ctas">
            <Link to="/help" className="hero-cta hero-cta--primary">
              Get Help Now
            </Link>
            <Link to="/mission" className="hero-cta hero-cta--secondary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({ projects = projectContent }) {
  const items = Array.isArray(projects) ? [...projects] : [];

  return (
    <>
      <div className="img-hug">
        {/*<svg id="img-hug" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-name="Layer 1" width="667.1889" height="648.09919" viewBox="0 0 667.1889 648.09919"><path d="M731.16,329.07779h0c-.99343-118.05925-96.9653-213.474-215.24736-213.539-119.30334-.065-215.54446,97.80088-215.54446,217.04852V723.62367a38.06566,38.06566,0,0,0,38.06565,38.06566H731.16c118.95982,0,215.39591-98.293,215.39591-217.25277S850.11982,329.07779,731.16,329.07779Z" transform="translate(-279.36708 -113.68188)" fill="#FB5DBD" fill-opacity="0.75"/><path d="M731.16,327.22093h0c-.99343-118.05925-96.9653-213.47406-215.24736-213.539-64.67448,0-122.55285,28.72564-162.02971,74.0609A213.10271,213.10271,0,0,1,484.346,143.39164c118.28208.065,214.254,95.47982,215.24733,213.539h0c118.95982,0,215.39591,96.43609,215.39591,215.39591a214.60667,214.60667,0,0,1-52.72556,141.18646,215.03379,215.03379,0,0,0,84.2922-170.89624C946.55591,423.657,850.11982,327.22093,731.16,327.22093Z" transform="translate(-279.36708 -113.68188)" opacity="0.1" style="isolation:isolate"/><path d="M530.21857,459.34959c-8.77835-27.97616-28.74047-53.63489-56.34769-63.09234C446.262,386.79978,405.83571,401.20658,385.08,421.892c-37.96615,37.83783-39.89895,176.50419-13.81463,217.58144,5.18824-.27463,23.09094-.47776,28.342-.67443l7.42834-24.7583V638.555c40.98648-1.26665,86.60616,32.44552,126.351.34661C537.21339,609.81844,538.99685,487.32575,530.21857,459.34959Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/><circle cx="191.01404" cy="374.23728" r="59.20984" fill="#dfb0a1"/><path d="M511.06536,410.81752c-22.61753-13.78871-52.76085-14.18618-75.73583-.99844-22.9732,13.18775-37.83151,39.41789-37.33189,65.90322,33.09658,1.522,67.427,32.6052,103.118,1.98674l8.33164-20.3911,4.912,20.40618q16.11316-.00159,32.28754-.04239C547.84636,451.21894,533.68453,424.60625,511.06536,410.81752Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/><path d="M524.284,450.9665c13.58777-25.98266,37.7731-47.70649,66.61777-52.13235a61.75329,61.75329,0,0,1,22.75765,1.14965c42.47177,9.5318,69.04236,51.86931,60.74091,94.5986-1.64669,8.476-3.5699,17.24491-4.94388,26.98169a24.4543,24.4543,0,0,1-29.43616,20.415l-.15774-.03429-7.268-1.554c-21.6-4.57421-46.31539.59487-69.7494.31242-34.92653-.421-59.47338-34.514-48.33735-67.62034A152.98331,152.98331,0,0,1,524.284,450.9665Z" transform="translate(-279.36708 -113.68188)" fill="#AAFE80"/><circle cx="298.75837" cy="375.98648" r="59.20984" fill="#dfb0a1"/><path d="M551.71845,406.58684c24.69963-9.5713,54.43809-4.63148,74.71856,12.41166,20.27873,17.04282,30.26386,45.48727,25.088,71.46674C618.681,486.11,579.39446,510.63158,549.68116,474.18359l-4.594-21.54317-8.44352,19.2158q-15.85887-2.85127-31.77107-5.752C508.372,439.84644,527.01721,416.15786,551.71845,406.58684Z" transform="translate(-279.36708 -113.68188)" fill="#AAFE80"/><path d="M720.07866,552.39292a24.1041,24.1041,0,0,0-36.19122,7.50282L516.75755,618.61481l16.58379,35.24532,161.79922-60.29989a24.23473,24.23473,0,0,0,24.9381-41.16732Z" transform="translate(-279.36708 -113.68188)" fill="#dfb0a1"/><path d="M541.48719,591.11274l-24.69011,10.68271-13.19589,5.7154-8.61029,3.71867a27.77552,27.77552,0,0,0-10.02981,4.99314A28.04031,28.04031,0,0,0,509.29943,665.449l50.53246-5.77367a10.09712,10.09712,0,0,0,7.16742-4.34957c1.66846-2.44022,17.26786-9.79112,16.514-12.64117l6.6755-3.06105,9.68765-3.03484L636.24783,619.856h0L630.748,599.51673h0l5.088-24.96751c-.76119-2.81572-83.28837,17.99318-85.9268,16.74873A10.04533,10.04533,0,0,0,541.48719,591.11274Z" transform="translate(-279.36708 -113.68188)" fill="#3f3d56"/><path d="M612.25806,758.70472H381.4177a36.11016,36.11016,0,0,1-36.11016-36.11016V637.60985a36.11016,36.11016,0,0,1,36.11016-36.11016l29.53-41.6077H514.02442l98.23364,41.6077a36.11015,36.11015,0,0,1,36.11015,36.11016v84.98471A36.11015,36.11015,0,0,1,612.25806,758.70472Z" transform="translate(-279.36708 -113.68188)" fill="#3f3d56"/><path d="M694.90021,758.70472H488.4362A36.11016,36.11016,0,0,1,452.326,722.59456V637.60985a36.11016,36.11016,0,0,1,36.11016-36.11016l54.36548-41.6077H645.87843l49.02178,41.6077a36.11016,36.11016,0,0,1,36.11016,36.11016v84.98471A36.11016,36.11016,0,0,1,694.90021,758.70472Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/><path d="M509.37885,748.16663a23.18264,23.18264,0,0,1-35.42065,3.0022L329.73933,755.832l-18.43991.59626h0c-18.96735.61328-29.89283-21.331-17.97144-36.09638L306.13706,704.467l45.81424,7.18573,16.56586.726,106.58868,4.671a23.30816,23.30816,0,0,1,34.27295,31.117Z" transform="translate(-279.36708 -113.68188)" fill="#dfb0a1"/><path d="M382.16322,568.41992s-27.49085-6.97525-40.521,15.46311c-10.43158,17.96362-45.91672,85.90365-53.283,113.78781-35.94223,86.61871,47.62448,52.125,45.28635,60.29578L361.603,712.07575c12.14765-6.07379-11.23529,1.76519-14.31555-2.59l21.43085-23.29205,24.29529-12.14765,8.91449-95.10583Z" transform="translate(-279.36708 -113.68188)" fill="#3f3d56"/><path d="M482.94351,751.78681a23.18264,23.18264,0,0,0,35.42066,3.00219L662.583,759.45221l18.43991.59625h0c18.96735.61328,29.89282-21.331,17.97143-36.09637L686.1853,708.08722,640.37106,715.273l-16.56585.726-106.58869,4.671a23.30816,23.30816,0,0,0-34.27295,31.117Z" transform="translate(-279.36708 -113.68188)" fill="#dfb0a1"/><path d="M610.15915,572.0401s27.49084-6.97525,40.521,15.46311c10.43157,17.96362,45.91671,85.90365,53.283,113.78781,35.94224,86.61871-47.62448,52.125-45.28634,60.29577l-27.9574-45.89087c-12.14764-6.07379,11.23529,1.7652,14.31555-2.59L623.6041,689.8139l-24.29529-12.14764-8.91449-95.10583Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/></svg>*/}
      </div>
      <section className="project" id="front-door-head">
        <div className="header-2">
          <h2 className="italic edo">
            <span className="prom-2">Our </span>Services
          </h2>
        </div>
      </section>
      <section className="project project-grid" id="front-door">
        {items.map((project) => {
          const projectId = project.id ?? project.slug ?? project.title;
          return <ProjectMiniCard key={projectId} project={project} />;
        })}
      </section>
    </>
  );
}

function MissionSection() {
  return (
    <>
      <section className="project" id="front-door-head">
        <div className="header-2">
          <h2 className="italic edo">
            <span className="prom-2">Our </span>Mission
          </h2>
        </div>
      </section>
      <section className="project project-grid" id="front-door">
        <Mission previewOnly={true} />
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

function PromotedArticles({ articles = [] }) {
  const items = Array.isArray(articles)
    ? articles.filter((article) => article?.onHomePage !== false)
    : [];

  const videoItems = [
    {
      thumb: "/images/video_2.png",
      alt: "1 News interview about youth homelessness",
      url: "https://www.1news.co.nz/2019/09/11/national-response-to-youth-homelessness-problem-needed-frontline-worker-says/",
    },
    {
      thumb: "/images/video_1.png",
      alt: "1 News interview about benefit changes",
      url: "https://www.1news.co.nz/2024/02/21/sanctions-dont-work-hipkins-on-govts-benefit-changes",
    },
  ];

  return (
    <section className="news" id="advocacy">
      <div className="header-2">
        <h2 className="edo">
          <span className="italic prom-2">In the</span> News
        </h2>
      </div>
      <div className="news-grid">
        {items.map((article) => (
          <a
            key={article.id ?? article.slug ?? article.url}
            className="news-grid-card"
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            {article.image && (
              <div className="news-grid-logo">
                <img src={article.image} alt={`${article.title} logo`} />
              </div>
            )}
            <div className="news-grid-body">
              <span className="news-grid-outlet">{article.title}</span>
              {article.description && (
                <span className="news-grid-headline">
                  {article.description}
                </span>
              )}
            </div>
            <span className="news-grid-arrow">→</span>
          </a>
        ))}
      </div>
      <div className="news-videos">
        {videoItems.map((vid) => (
          <a
            key={vid.url}
            className="news-video-card"
            href={vid.url}
            target="_blank"
            rel="noreferrer"
          >
            <img src={vid.thumb} alt={vid.alt} />
            <div className="news-video-play">▶</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Testimonies({ testimonies = testimonyContent }) {
  const navigate = useNavigate();
  const items = Array.isArray(testimonies)
    ? testimonies.filter((item) => item?.appearOnHome)
    : [];

  if (items.length === 0) {
    return null;
  }

  const handleSelect = (testimony) => {
    if (!testimony?.id) {
      return;
    }
    navigate(`/testimonials?id=${encodeURIComponent(testimony.id)}`);
  };

  const renderMeta = (testimony) => {
    const parts = [testimony.author, testimony.organisation].filter(Boolean);
    return parts.join(" · ");
  };

  return (
    <section className="project testimonies-section" id="testimonies">
      <div className="header-2">
        <h2 className="italic">
          <span className="prom-2">Our </span>Testimonials
        </h2>
      </div>
      <div className="testimony-grid">
        {items.map((testimony) => {
          const bodyPreview = getDescriptionPreview(testimony.body ?? "", 120);
          return (
            <div
              key={testimony.id ?? testimony.title}
              className="testimony-card interactive"
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(testimony)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleSelect(testimony);
                }
              }}
            >
              <div className="testimony-card-body">
                {bodyPreview && (
                  <div className="testimony-quote">“{bodyPreview}”</div>
                )}
                <div className="testimony-meta">
                  <span>{renderMeta(testimony) || testimony.author}</span>
                </div>
                {testimony.video && <div className="testimony-tag">Video</div>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Partners({ scrollToId, partners = partnerContent }) {
  const items = Array.isArray(partners)
    ? partners.filter((partner) => partner?.onHomePage !== false)
    : [];

  const renderLogo = (partner) => {
    const logoSrc = partner.logo || "/images/logo-kickback-dark.svg";
    const altText = partner.name ? `${partner.name} logo` : "Partner logo";
    const logoImage = <img src={logoSrc} alt={altText} />;

    if (partner.url) {
      return (
        <a
          href={partner.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${partner.name ?? "partner"} website`}
        >
          {logoImage}
        </a>
      );
    }

    return logoImage;
  };

  return (
    <>
      <section className="partners">
        <div className="header-2">
          <h2>
            <span className="italic prom-2">Our </span>Partners
          </h2>
        </div>
        {partnerTypeOrder.map((type) => {
          const sectionPartners = items.filter(
            (partner) => partner.type === type,
          );
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
                    key={
                      partner.id ?? partner.slug ?? partner.name ?? partner.logo
                    }
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
      <section className="partner-links">
        <div className="partner-link">
          <div className="cd-header">Becoming a Partner</div>
          <div className="btn cool" onClick={() => scrollToId("contact")}>
            Contact us to find out more
          </div>
        </div>
      </section>
    </>
  );
}

function Publications({ reports = [] }) {
  const navigate = useNavigate();
  const items = Array.isArray(reports)
    ? reports.filter((report) => report?.onHomePage !== false)
    : [];

  if (items.length === 0) {
    return null;
  }

  const openReport = (report) => {
    if (!report) {
      return;
    }
    const fileUrl = report.file?.trim();
    const linkUrl = report.link?.trim();
    const targetUrl = fileUrl || linkUrl;
    if (targetUrl) {
      window.open(targetUrl, "_blank");
      return;
    }

    const key = report.id ?? report.slug ?? report.name;
    if (key) {
      navigate(`/reports/${encodeURIComponent(key)}`);
    }
  };

  return (
    <section className="project" id="publications">
      <div className="header-2">
        <h2 className="italic">
          <span className="prom-2">Our </span>Publications
        </h2>
      </div>
      <div className="pub-cards">
        {items.map((report) => (
          <div
            key={
              report.id ??
              report.slug ??
              report.name ??
              report.link ??
              report.file
            }
            className="pub-card"
            role="button"
            tabIndex={0}
            onClick={() => openReport(report)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openReport(report);
              }
            }}
          >
            <div className="pub-card-accent" />
            <div className="pub-card-body">
              <div className="pub-card-org">Kick Back</div>
              {report.name && (
                <div className="pub-card-title">{report.name}</div>
              )}
              {report.description && (
                <div className="pub-card-desc">{report.description}</div>
              )}
              <div className="pub-card-footer">
                {report.date && (
                  <span className="pub-card-date">
                    {new Date(report.date).toLocaleDateString("en-NZ", {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                )}
                <span className="pub-card-action">
                  {report.file ? "Read PDF →" : "View →"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SubstackEmbed />
    </section>
  );
}

function BoardSection({ members = [] }) {
  const boardMembers = Array.isArray(members)
    ? members.filter(
        (member) =>
          (member?.dept ?? "").toLowerCase() === "board" &&
          member?.onHomePage !== false,
      )
    : [];

  if (boardMembers.length === 0) {
    return null;
  }

  return <TeamSection sectionId="board" members={boardMembers} compact />;
}

function ProjectsGalleryMarquee({ projects = [] }) {
  const galleryImages = (Array.isArray(projects) ? projects : []).flatMap(
    (project) => {
      const galleryBlocks = Array.isArray(project.gallery)
        ? project.gallery
        : [];
      const projectTitle = project.title ?? "Project";
      return galleryBlocks.flatMap((block) => {
        if (typeof block === "string") {
          return [{ src: block, alt: `${projectTitle} gallery` }];
        }
        if (Array.isArray(block?.images)) {
          return block.images.map((src, idx) => ({
            src,
            alt: `${projectTitle} gallery ${idx + 1}`,
          }));
        }
        return [];
      });
    },
  );

  if (galleryImages.length === 0) {
    return null;
  }

  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const lastTimeRef = useRef(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const applyTransform = () => {
    const track = trackRef.current;
    if (!track || loopWidthRef.current === 0) return;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  };

  const startAuto = () => {
    stopAuto();
    const speed = 12; // px per second
    lastTimeRef.current = performance.now();
    const step = (timestamp) => {
      const last = lastTimeRef.current ?? timestamp;
      const deltaSeconds = (timestamp - last) / 1000;
      lastTimeRef.current = timestamp;
      const loopWidth = loopWidthRef.current || 1;
      offsetRef.current =
        (offsetRef.current + speed * deltaSeconds) % loopWidth;
      applyTransform();
      frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  };

  const stopAuto = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  const handlePointerDown = (event) => {
    const x = event.clientX ?? event.touches?.[0]?.clientX;
    if (typeof x !== "number") return;
    event.preventDefault();
    isPointerDownRef.current = true;
    setIsDragging(true);
    stopAuto();
    startXRef.current = x;
    startOffsetRef.current = offsetRef.current;
  };

  const handlePointerMove = (event) => {
    if (!isPointerDownRef.current) return;
    const x = event.clientX ?? event.touches?.[0]?.clientX;
    if (typeof x !== "number") return;
    event.preventDefault();
    const delta = x - startXRef.current;
    const loopWidth = loopWidthRef.current || 1;
    let next = startOffsetRef.current - delta;
    while (next < 0) {
      next += loopWidth;
    }
    offsetRef.current = next % loopWidth;
    applyTransform();
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);
    startAuto();
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const measure = () => {
      const totalWidth = track.scrollWidth;
      loopWidthRef.current = totalWidth / 2 || totalWidth || 1;
      offsetRef.current = offsetRef.current % loopWidthRef.current;
      applyTransform();
    };

    measure();
    startAuto();

    window.addEventListener("resize", measure);
    return () => {
      stopAuto();
      window.removeEventListener("resize", measure);
    };
  }, [galleryImages.length]);

  return (
    <section
      className="project-gallery-marquee wide"
      aria-label="Project gallery highlights"
    >
      <div
        className="project-gallery-track"
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDragStart={(e) => e.preventDefault()}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {[...galleryImages, ...galleryImages].map((image, index) => (
          <div
            className="project-gallery-thumb marquee-thumb"
            key={`${image.src}-${index}`}
            aria-hidden={index >= galleryImages.length}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
