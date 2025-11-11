import { useState } from 'react';
import { Link } from 'react-router-dom';
import homeContent from '../content/pages/home.json';

export default function SafeHeader({ showBackLink = false, backLinkTo = '/' }) {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const buttonInnerText = isHeaderOpen ? '⬅️ Go Back 🙅' : '📞 Hit us up 💬';
  const headerButtonPrompt = homeContent.headerButtonText ?? '';
  const textInnerText = isHeaderOpen ? '' : headerButtonPrompt;
  const phoneLink = homeContent.phoneLink ?? 'tel:0800-5425-2225';
  const phoneDisplay = homeContent.phoneDisplay ?? 'Call 0800 kick back 📞';

  const handleHeader = () => setIsHeaderOpen((open) => !open);

  const openUrl = (url) => {
    if (!url) {
      return;
    }
    window.open(url, '_blank');
  };

  return (
    <header className="safe-header">
      <div className="safe-header-bar">
        {showBackLink && (
          <Link className="header-back-link" to={backLinkTo} aria-label="Back to home">
            ←
          </Link>
        )}
        <div className="header" onClick={handleHeader}>
          <div id="hit-us-up-txt">{textInnerText}</div>
          <div id="hit-us-up-btn" className="btn cool green">
            {buttonInnerText}
          </div>
        </div>
      </div>
      {isHeaderOpen && (
        <div id="hit-us-up" className="modal" style={{ display: 'flex' }}>
          <div className="modal-footer mc">
            <a className="call-icon btn" href={phoneLink}>
              {phoneDisplay}
            </a>
          </div>
          <div className="modal-image-container">
            <div className="modal-image-overlay">Go to 307 K-Road</div>
            <img
              className="modal-header-img"
              src="/images/frontdoor-sign.jpg"
              alt="Front Door Sign"
              onClick={() => openUrl('https://maps.app.goo.gl/nmLaCAnuJk3yz1Z57')}
            />
          </div>
          <div className="modal-body mc">
            <div className="messenger" onClick={() => openUrl(homeContent.messengerLink)}>
              {/* messenger icon intentionally hidden but clickable */}
            </div>
            <div className="messenger" onClick={() => openUrl(homeContent.instagramLink)}>
              <img id="messenger" src="/images/logo-insta-full.png" alt="Instagram" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
