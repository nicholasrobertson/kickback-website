import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const ABOUT_DROPDOWN = [
  { label: "About Kick Back", to: "/mission" },
  { label: "Our Approach", to: "/approach" },
  { label: "Innovations", to: "/home#front-door" },
  { label: "Reports", to: "/reports" },
  { label: "Our People", to: "/team" },
  { label: "Our Board", to: "/home#board" },
  { label: "Sponsors", to: "/home#testimonies" },
  { label: "Media", to: "/home#advocacy" },
];

const NAV_ITEMS = [
  { label: "Offer Help", to: "/offer-help" },
  {
    label: "Donate",
    to: "https://www.chivecharities.nz/charity/kick-back-make-change",
    external: true,
  },
  { label: "About Us", dropdown: ABOUT_DROPDOWN },

  { label: "Get Help", to: "/help" },
];

export default function StickyContent() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileAboutOpen(false);
  }, []);

  useEffect(() => {
    closeMenu();
    setDropdownOpen(false);
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

  useEffect(() => {
    if (!dropdownOpen) return undefined;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [dropdownOpen]);

  const handleNavClick = (item) => {
    closeMenu();
    if (!item.external && item.to?.startsWith("/home#")) {
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

  const renderNavItem = (item) => {
    if (item.dropdown) {
      return (
        <div
          key={item.label}
          className="site-nav-dropdown-wrapper"
          ref={dropdownRef}
        >
          <button
            type="button"
            className={`site-nav-link site-nav-dropdown-trigger${dropdownOpen ? " active" : ""}`}
            onClick={() => setDropdownOpen((o) => !o)}
            aria-expanded={dropdownOpen}
          >
            {item.label}
            <span className={`site-nav-chevron${dropdownOpen ? " open" : ""}`}>
              ▾
            </span>
          </button>
          {dropdownOpen && (
            <div className="site-nav-dropdown">
              {item.dropdown.map((sub) => (
                <Link
                  key={sub.label}
                  to={sub.to}
                  className="site-nav-dropdown-link"
                  onClick={() => {
                    setDropdownOpen(false);
                    handleNavClick(sub);
                  }}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.external) {
      return (
        <a
          key={item.label}
          href={item.to}
          className="site-nav-link"
          target="_blank"
          rel="noreferrer"
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={item.label}
        to={item.to}
        className="site-nav-link"
        onClick={() => handleNavClick(item)}
      >
        {item.label}
      </Link>
    );
  };

  const renderMobileItem = (item) => {
    if (item.dropdown) {
      return (
        <div key={item.label} className="site-nav-mobile-group">
          <button
            type="button"
            className="site-nav-mobile-link site-nav-mobile-dropdown-trigger"
            onClick={() => setMobileAboutOpen((o) => !o)}
          >
            {item.label}
            <span
              className={`site-nav-chevron${mobileAboutOpen ? " open" : ""}`}
            >
              ▾
            </span>
          </button>
          {mobileAboutOpen && (
            <div className="site-nav-mobile-sub">
              {item.dropdown.map((sub) => (
                <Link
                  key={sub.label}
                  to={sub.to}
                  className="site-nav-mobile-sub-link"
                  onClick={() => {
                    closeMenu();
                    handleNavClick(sub);
                  }}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.external) {
      return (
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
      );
    }

    return (
      <Link
        key={item.label}
        to={item.to}
        className="site-nav-mobile-link"
        onClick={() => handleNavClick(item)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <Link to="/home" className="site-nav-logo" aria-label="Kick Back home">
          <img src="/images/logo-kickback-black.svg" alt="Kick Back" />
        </Link>

        <nav className="site-nav-links" aria-label="Main navigation">
          {NAV_ITEMS.map(renderNavItem)}
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
            {NAV_ITEMS.map(renderMobileItem)}
          </nav>
        </div>
      )}
    </header>
  );
}
