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

  return (
    <>
      <StickyContent showBackLink backLinkTo="/reports" />
      <main className="project full report-detail-page">
        <section className="project full">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Our </span>Report
            </h2>
          </div>
          <article className="report-detail-card">
            <h3 className="edo report-detail-title">{report.name ?? 'Report'}</h3>
            {formattedDate && <p className="report-detail-date">{formattedDate}</p>}
            {(fileUrl || externalUrl) && (
              <div className="report-detail-actions">
                {fileUrl && (
                  <a className="btn cool" href={fileUrl} target="_blank" rel="noreferrer">
                    Download PDF
                  </a>
                )}
                {externalUrl && (
                  <a className="btn cool" href={externalUrl} target="_blank" rel="noreferrer">
                    Open link
                  </a>
                )}
              </div>
            )}
            <Link className="report-detail-back" to="/reports">
              ← Back to reports list
            </Link>
          </article>
        </section>
      </main>
    </>
  );
}
