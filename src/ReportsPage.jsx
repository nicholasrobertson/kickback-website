import { Link } from 'react-router-dom';
import StickyContent from './components/StickyContent.jsx';
import { getContent } from './content/helper.js';
import { formatReadableDate } from './utils/dates.js';

const fallbackReports = getContent('reports');

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

  return (
    <article className="report-card">
      <div className="report-card-heading">
        <h3 className="edo report-card-title">{report.name ?? 'Report'}</h3>
        {formattedDate && <p className="report-card-date">{formattedDate}</p>}
      </div>
      <div className="report-card-actions">
        {detailPath && (
          <Link className="btn" to={detailPath}>
            View details
          </Link>
        )}
        {fileUrl && (
          <a className="btn" href={fileUrl} target="_blank" rel="noreferrer">
            Download PDF
          </a>
        )}
        {externalUrl && (
          <a className="btn" href={externalUrl} target="_blank" rel="noreferrer">
            Open link
          </a>
        )}
      </div>
    </article>
  );
}

export default function ReportsPage({ reports = fallbackReports }) {
  const items = Array.isArray(reports) ? [...reports] : [];

  return (
    <>
      <StickyContent showBackLink />
      <main className="project full reports-page">
        <section className="project full">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Our </span>Reports
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
        </section>
      </main>
    </>
  );
}
