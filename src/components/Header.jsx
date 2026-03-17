import { useEffect, useState, useCallback, useRef } from "react";
import { NavLink, Link, useMatch } from "react-router-dom";
import logo from "../assets/img/logo-Ibmec.svg";
import { CATEGORIES, MEGAMENU_COLUMNS } from "../constants/projects";

// Função utilitária — retorna a classe correta pro NavLink
const navClass = ({ isActive }) => (isActive ? "nav-active" : undefined);

export default function Header({ onOpenLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProjetosMenuOpen, setIsProjetosMenuOpen] = useState(false);
  const [isMobileProjetosOpen, setIsMobileProjetosOpen] = useState(false);
  const closeTimer = useRef(null);

  // Detecta se qualquer rota /projetos/* está ativa (para o trigger do megamenu)
  const projetosAtivo = useMatch("/projetos/*");

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 600) setMenuOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

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
        <Link
          to="/"
          className="header__logo"
          aria-label="Logo Ibmec"
          onClick={closeMenu}
        >
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
            {/* NavLink com end para não ficar ativo em subrotas */}
            <li>
              <NavLink to="/" end className={navClass} onClick={closeMenu}>
                Início
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quem-somos"
                className={navClass}
                onClick={closeMenu}
              >
                Quem Somos
              </NavLink>
            </li>

            {/* ── PROJETOS MOBILE (acordeão) ── */}
            <li
              className={`header__mobile-only header__mobile-accordion ${
                isMobileProjetosOpen ? "accordion--open" : ""
              }`}
            >
              <a
                href="#projetos"
                className={`accordion-trigger${projetosAtivo ? " nav-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileProjetosOpen((v) => !v);
                }}
              >
                Projetos
                <span className="accordion-arrow" />
              </a>

              {isMobileProjetosOpen && (
                <ul className="accordion-submenu">
                  {CATEGORIES.map(({ slug, label }) => (
                    <li key={slug}>
                      <NavLink
                        to={`/projetos/${slug}`}
                        className={navClass}
                        onClick={closeMenu}
                      >
                        {label}
                      </NavLink>
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
              {/* Span recebe classe de ativo quando qualquer /projetos/* está aberto */}
              <span
                className={`nav-link-trigger${projetosAtivo ? " nav-link-trigger--active" : ""}`}
              >
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
                          <NavLink
                            key={slug}
                            to={`/projetos/${slug}`}
                            className={navClass}
                            onClick={closeMegamenu}
                          >
                            {label}
                          </NavLink>
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
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLogin?.();
                  closeMenu();
                }}
              >
                Entrar
              </button>
            </li>
            <li className="header__mobile-only">
              <Link
                to="/cadastro"
                className="btn btn--cadastre"
                onClick={closeMenu}
              >
                Cadastre-se
              </Link>
            </li>
          </ul>
        </nav>

        {/* ── BOTÕES DESKTOP ── */}
        <div className="header__actions">
          <button
            type="button"
            className="btn btn--entrar"
            onClick={onOpenLogin}
          >
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
