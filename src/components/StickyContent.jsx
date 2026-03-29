import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Offer Help", to: "/offer-help" },
  { label: "About Us", to: "/mission" },
  {
    label: "Donate",
    to: "https://www.chivecharities.nz/charity/kick-back-make-change",
    external: true,
  },
  { label: "Get Help", to: "/help" },
];

export default function StickyContent() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (item) => {
    closeMenu();
    if (!item.external && item.to.startsWith("/home#")) {
      const hash = item.to.replace("/home", "");
      if (location.pathname === "/home") {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
  };

  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <Link to="/home" className="site-nav-logo" aria-label="Kick Back home">
          <img src="/images/logo-kickback-black.svg" alt="Kick Back" />
        </Link>

        <nav className="site-nav-links" aria-label="Main navigation">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.to}
                className="site-nav-link"
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="site-nav-link"
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          className="site-nav-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`burger-bar ${menuOpen ? "open" : ""}`} />
          <span className={`burger-bar ${menuOpen ? "open" : ""}`} />
          <span className={`burger-bar ${menuOpen ? "open" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="site-nav-mobile-overlay" onClick={closeMenu}>
          <nav
            className="site-nav-mobile-menu"
            aria-label="Mobile navigation"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.to}
                  className="site-nav-mobile-link"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="site-nav-mobile-link"
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
