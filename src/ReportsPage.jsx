import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StickyContent from './components/StickyContent.jsx';
import { getContent } from './content/helper.js';
import { formatReadableDate } from './utils/dates.js';
import homeContent from './content/pages/home.json';

const fallbackReports = getContent('reports');
const RSS_APP_WIDGET_ID = 'gs4Yd16Jo8dpY7kn';

function getReportKey(report) {
  return report?.id ?? report?.slug ?? report?.name ?? 'report';
}

function getReportPath(report) {
  const key = getReportKey(report);
  return key ? `/reports/${encodeURIComponent(key)}` : null;
}

function ReportSummaryCard({ report }) {
  if (!report) {
    return null;
  }

  const formattedDate = formatReadableDate(report.date);
  const detailPath = getReportPath(report);
  const fileUrl = report.file?.trim();
  const externalUrl = report.link?.trim();
  const descriptionMarkdown = report?.description?.trim();

  return (
    <article className="report-card">
      <div className="report-card-heading">
        {formattedDate && <p className="report-card-date">{formattedDate}</p>}
        <h3 className="report-card-title">{report.name ?? 'Report'}</h3>
        {descriptionMarkdown && (
          <div className="report-card-description">
            {descriptionMarkdown}
          </div>
        )}
      </div>
      <div className="report-card-actions">
        {/*detailPath && ( <Link className="report-card-btn" to={detailPath}>Read More 📚</Link>)*/}
        {fileUrl && (
          <a className="report-card-btn" href={fileUrl} target="_blank" rel="noreferrer">
            Download 📚
          </a>
        )}
        {externalUrl && (
          <a className="report-card-btn" href={externalUrl} target="_blank" rel="noreferrer">
            Download 📚
          </a>
        )}
      </div>
    </article>
  );
}

export default function ReportsPage({ reports = fallbackReports }) {
  const items = Array.isArray(reports) ? [...reports] : [];
  const shouldShowSubstack = Boolean(homeContent?.showSubstack && homeContent?.substackFeed);

  return (
    <>
      <StickyContent showBackLink />
      <main className="project full reports-page">
        <section className="project">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Our </span>Publications
            </h2>
          </div>
          {items.length === 0 ? (
            <p className="reports-empty">No reports available yet. Check back soon!</p>
          ) : (
            <div className="reports-grid">
              {items.map((report) => (
                <ReportSummaryCard key={getReportKey(report)} report={report} />
              ))}
            </div>
          )}
          {shouldShowSubstack && (
            <SubstackEmbed title={homeContent.substackTitle ?? 'Substack'} />
          )}
        </section>
      </main>
    </>
  );
}

export function SubstackEmbed({ title = 'Substack' }) {
  useEffect(() => {
    const existing = document.querySelector('script[data-rssapp-widget="imageboard"]');
    if (existing) {
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://widget.rss.app/v1/imageboard.js';
    script.type = 'text/javascript';
    script.async = true;
    script.dataset.rssappWidget = 'imageboard';
    document.body.appendChild(script);
  }, []);

  return (
    <section className="substack-section">
      <div className="substack-heading header-2">
        <h2 className="italic edo">
          <span className="prom-2">Latest</span> {title}
        </h2>
      </div>
      <div className="substack-embed">
        <rssapp-imageboard id={RSS_APP_WIDGET_ID}></rssapp-imageboard>
      </div>
    </section>
  );
}
