import { Link } from "react-router-dom";
import "../styles/styleQuemSomos.css";
import ibmecVideo from "../assets/img/ibmec.mp4";
import equipeImg from "../assets/img/quem-somos-img.png";

const STATS = [
  { value: "50+", label: "Anos de história" },
  { value: "10", label: "Áreas de projeto" },
  { value: "5", label: "Campi no Brasil" },
  { value: "100%", label: "Avaliação máxima MEC" },
];

export default function QuemSomos() {
  return (
    <main id="quem-somos" aria-label="Seção Quem Somos">
      {/* ── HERO ── */}
      <section className="qs-hero">
        <div className="qs-hero__inner container">
          <span className="qs-hero__eyebrow">Sobre a plataforma</span>
          <h1 className="qs-hero__title">
            A força do Ibmec
            <br />
            <em>por trás de cada projeto</em>
          </h1>
          <p className="qs-hero__sub">
            Mais de meio século conectando excelência acadêmica ao mercado.
          </p>
        </div>

        <div className="qs-stats">
          <div className="container qs-stats__grid">
            {STATS.map(({ value, label }) => (
              <div key={label} className="qs-stat">
                <span className="qs-stat__value">{value}</span>
                <span className="qs-stat__label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCO INSTITUCIONAL ── */}
      <section className="qs-section qs-section--split container">
        <div className="qs-split__text">
          <span className="qs-label">Nossa história</span>
          <h2>
            Pioneirismo que
            <br />
            nunca parou de evoluir
          </h2>
          <p>
            O Ibmec nasceu com o DNA do pioneirismo — fomos a primeira
            instituição no país a criar um MBA em Finanças e, desde então, nunca
            paramos de evoluir.
          </p>
          <p>
            Essa tradição de inovação, validada pelas mais altas avaliações do
            MEC, nos permite formar talentos que não apenas respondem às
            demandas do presente, mas que estão efetivamente preparados para
            criar o futuro.
          </p>
        </div>

        <div className="qs-split__media">
          <div className="qs-img-frame">
            <img src={equipeImg} alt="Equipe trabalhando em projeto" />
            <div className="qs-img-frame__accent" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="qs-quote-section">
        <div className="container">
          <blockquote className="qs-quote">
            <span className="qs-quote__mark">"</span>
            <p>
              Esta plataforma é o portfólio digital da inovação do Ibmec, criada
              com um propósito claro: valorizar o trabalho extraordinário de
              nossos estudantes e criar uma ponte real com os desafios do
              mercado.
            </p>
            <footer className="qs-quote__footer">
              Acreditamos que as grandes ideias desenvolvidas em sala de aula
              não devem ficar no papel.
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── VÍDEO ── */}
      <section className="qs-video-section container">
        <div className="qs-video-section__header">
          <span className="qs-label">Conheça o Ibmec</span>
          <h2>
            O Projeto: A Ponte
            <br />
            para o Futuro
          </h2>
        </div>
        <div className="qs-video-wrapper">
          <video
            src={ibmecVideo}
            controls
            title="Depoimento Ibmec"
            preload="metadata"
          />
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="qs-cta">
        <div className="container qs-cta__inner">
          <div className="qs-cta__text">
            <h2>Pronto para conectar?</h2>
            <p>
              Cadastre sua empresa e encontre o talento certo para o seu próximo
              projeto.
            </p>
          </div>
          <div className="qs-cta__actions">
            <Link to="/cadastro" className="qs-cta__btn qs-cta__btn--accent">
              Cadastrar empresa
            </Link>
            <Link
              to="/"
              state={{ scrollTo: "projetos" }}
              className="qs-cta__btn qs-cta__btn--outline"
            >
              Ver projetos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
