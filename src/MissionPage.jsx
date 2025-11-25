import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import StickyContent from './components/StickyContent.jsx';
import { formatReadableDate } from './utils/dates.js';
import missionContent from './content/pages/mission.json';


export default function MissionPage() {

  return (
    <>
      <StickyContent showBackLink backLinkTo="/home" />
      <main className="project full reports-page">
        <section className="project">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Our </span>Mission
            </h2>
          </div>
          <Mission previewOnly={false} />
        </section>
      </main>
    </>
  );
}

export function Mission({previewOnly = true}) {
  return (
    <div className="mission-content">
      Mission Content Goes Here
    </div>
  );
}

