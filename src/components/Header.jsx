import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-Ibmec.svg";
import { CATEGORIES, MEGAMENU_COLUMNS } from "../constants/projects";

export default function Header({ onOpenLogin }) {
  const [menuOpen,             setMenuOpen]             = useState(false);
  const [isProjetosMenuOpen,   setIsProjetosMenuOpen]   = useState(false);
  const [isMobileProjetosOpen, setIsMobileProjetosOpen] = useState(false);
  const closeTimer = useRef(null);

  // Fecha menu mobile no resize ou com "Esc"
  useEffect(() => {
    const onResize  = () => { if (window.innerWidth > 600) setMenuOpen(false); };
    const onKeyDown = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("resize",  onResize);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize",  onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Trava scroll quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Hover com "grace period" para o megamenu desktop não fechar ao mover o mouse
  const handleMenuEnter = () => {
    clearTimeout(closeTimer.current);
    setIsProjetosMenuOpen(true);
  };
  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setIsProjetosMenuOpen(false), 200);
  };

  const closeMegamenu = () => setIsProjetosMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header__top-bar" />

      <div className="container header__container">
        <Link to="/" className="header__logo" aria-label="Logo Ibmec" onClick={closeMenu}>
          <img src={logo} alt="Logo Ibmec" />
        </Link>

        <button
          type="button"
          className="header__menu-toggle"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="burger" />
        </button>

        <nav
          id="primary-navigation"
          className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}
          aria-label="navegação principal"
        >
          <ul>
            <li><Link to="/"           onClick={closeMenu}>Início</Link></li>
            <li><Link to="/quem-somos" onClick={closeMenu}>Quem Somos</Link></li>

            {/* ── PROJETOS MOBILE (acordeão) ── */}
            <li
              className={`header__mobile-only header__mobile-accordion ${
                isMobileProjetosOpen ? "accordion--open" : ""
              }`}
            >
              <a
                href="#projetos"
                className="accordion-trigger"
                onClick={(e) => { e.preventDefault(); setIsMobileProjetosOpen((v) => !v); }}
              >
                Projetos
                <span className="accordion-arrow" />
              </a>

              {isMobileProjetosOpen && (
                <ul className="accordion-submenu">
                  {CATEGORIES.map(({ slug, label }) => (
                    <li key={slug}>
                      <Link to={`/projetos/${slug}`} onClick={closeMenu}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* ── PROJETOS DESKTOP (megamenu) ── */}
            <li
              className="nav-item-dropdown header__desktop-only"
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            >
              <span className="nav-link-trigger">
                Projetos
                <span className="accordion-arrow dropdown-arrow" />
              </span>

              {isProjetosMenuOpen && (
                <div
                  className="megamenu-container"
                  onMouseEnter={handleMenuEnter}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="megamenu-grid">
                    {MEGAMENU_COLUMNS.map((col, colIdx) => (
                      <div key={colIdx} className="megamenu-column">
                        {col.map(({ slug, label }) => (
                          <Link
                            key={slug}
                            to={`/projetos/${slug}`}
                            onClick={closeMegamenu}
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* ── BOTÕES MOBILE ── */}
            <li className="header__mobile-only">
              <button
                type="button"
                className="btn btn--entrar"
                onClick={(e) => { e.stopPropagation(); onOpenLogin?.(); closeMenu(); }}
              >
                Entrar
              </button>
            </li>
            <li className="header__mobile-only">
              <Link to="/cadastro" className="btn btn--cadastre" onClick={closeMenu}>
                Cadastre-se
              </Link>
            </li>
          </ul>
        </nav>

        {/* ── BOTÕES DESKTOP ── */}
        <div className="header__actions">
          <button type="button" className="btn btn--entrar" onClick={onOpenLogin}>
            Entrar
          </button>
          <Link to="/cadastro" className="btn btn--cadastre">
            Cadastre-se
          </Link>
        </div>
      </div>

      {menuOpen && <div className="header__overlay" onClick={closeMenu} />}
    </header>
  );
}
