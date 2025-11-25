import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import StickyContent from './components/StickyContent.jsx';
import { getContent } from './content/helper.js';
import { formatReadableDate } from './utils/dates.js';

const fallbackReports = getContent('reports');

function getReportKey(report) {
  return report?.id ?? report?.slug ?? report?.name ?? '';
}

export default function ReportPage({ reports = fallbackReports }) {
  const { reportId } = useParams();
  const list = Array.isArray(reports) ? reports : [];
  const report = list.find((item) => getReportKey(item) === reportId) ?? null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [reportId]);

  if (!report) {
    return (
      <>
        <StickyContent showBackLink backLinkTo="/reports" />
        <main className="project full report-detail-page">
          <section className="project full">
            <div className="header-2">
              <h2 className="italic edo">
                <span className="prom-2">Report </span>Not Found
              </h2>
            </div>
            <Link className="btn cool" to="/reports">
              View all reports
            </Link>
          </section>
        </main>
      </>
    );
  }

  const formattedDate = formatReadableDate(report.date);
  const fileUrl = report.file?.trim();
  const externalUrl = report.link?.trim();
  const descriptionMarkdown = report?.description?.trim();

  return (
    <>
      <StickyContent showBackLink backLinkTo="/reports" />
      <main className="project full reports-page">
        <section className="project">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Our </span>Report
            </h2>
          </div>
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
        </section>
      </main>
    </>
  );
}

