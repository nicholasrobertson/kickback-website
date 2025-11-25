import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import StickyContent from './components/StickyContent.jsx';
import { getContent } from './content/helper.js';
import { formatReadableDate } from './utils/dates.js';

const fallbackReports = getContent('reports');
const markdownComponents = {
  a: ({ ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
};

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

  return (
    <>
      <StickyContent showBackLink />
      <main className="project full reports-page">
        <section className="project">
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
