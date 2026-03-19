import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-Ibmec.svg";
import twitter from "../assets/icons/twitter.svg";
import instagram from "../assets/icons/instagram.svg";
import tiktok from "../assets/icons/tik-tok.svg";
import linkedin from "../assets/icons/linkedin.svg";
import { CATEGORIES } from "../constants/projects";

export default function Footer() {
  const [openWho, setOpenWho] = useState(false);
  const [openProj, setOpenProj] = useState(false);

  return (
    <footer className="site-footer">
      <div className="container footer__container">
        {/* ── MARCA ── */}
        <div className="footer__col footer__col--brand">
          <Link to="/" className="header__logo">
            <img src={logo} alt="Logo Ibmec" />
          </Link>
          <p>
            Avenida Armando Lombardi, 949
            <br />
            Barra da Tijuca, Rio de Janeiro
          </p>
          <a className="footer__text-btn" href="mailto:contato@ibmec.br">
            Entre em contato conosco
          </a>
          <a className="footer__text-btn" href="mailto:feedback@ibmec.br">
            Feedback do site
          </a>

          <div className="footer__social-links">
            <a
              href="https://x.com/Ibmec_oficial"
              target="_blank"
              rel="noreferrer"
            >
              <img src={twitter} alt="Twitter" />
            </a>
            <a
              href="https://www.instagram.com/ibmec"
              target="_blank"
              rel="noreferrer"
              className="footer__social-btn"
              aria-label="Instagram"
            >
              <img src={instagram} alt="Instagram" />
            </a>
            <a
              href="https://www.tiktok.com/@ibmec.oficial"
              target="_blank"
              rel="noreferrer"
              className="footer__social-btn"
              aria-label="TikTok"
            >
              <img src={tiktok} alt="TikTok" />
            </a>
            <a
              href="https://www.linkedin.com/school/ibmec"
              target="_blank"
              rel="noreferrer"
              className="footer__social-btn"
              aria-label="LinkedIn"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* ── O IBMEC ── */}
        <div
          className={`footer__col footer__section ${openWho ? "is-open" : ""}`}
        >
          <h3
            className="footer__col-title footer__toggle"
            aria-expanded={openWho}
            onClick={() => setOpenWho((v) => !v)}
          >
            O Ibmec
            <span className="footer__chevron" aria-hidden="true" />
          </h3>

          <ul className="footer__list footer__who-list">
            <li>
              <Link to="/quem-somos">Quem somos</Link>
            </li>
            <li>
              <button type="button" className="footer__text-btn">
                Perguntas Frequentes
              </button>
            </li>
            <li>
              <button type="button" className="footer__text-btn">
                Responsabilidade social
              </button>
            </li>
            <li>
              <button type="button" className="footer__text-btn">
                Informações Acadêmicas
              </button>
            </li>
          </ul>
        </div>

        {/* ── PROJETOS ── */}
        <div
          className={`footer__col footer__col--projects footer__section ${
            openProj ? "is-open" : ""
          }`}
        >
          <h3
            className="footer__col-title footer__toggle"
            aria-expanded={openProj}
            onClick={() => setOpenProj((v) => !v)}
          >
            Projetos
            <span className="footer__chevron" aria-hidden="true" />
          </h3>

          <ul className="footer__list footer__project-list">
            {CATEGORIES.map(({ slug, label }) => (
              <li key={slug}>
                <Link to={`/projetos/${slug}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom-bar">
        <div className="container bottom-bar__container">
          <p>© IBMEC - Todos os direitos reservados</p>
          <div className="bottom-bar__links">
            <button type="button" className="footer__text-btn">
              Política de privacidade
            </button>
            <button type="button" className="footer__text-btn">
              Código de Ética
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
