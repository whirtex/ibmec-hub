import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "../styles/styleProjetoExemplo.css";
import imagemExemplo from "../assets/img/imagemExemplo.png";
import { CATEGORIES, CATEGORY_ICONS } from "../constants/projects";

// Projetos relacionados de exemplo — futuramente virão filtrados por categoria da API
const RELATED = [
  {
    id: 2,
    title: "API de Gestão de Estoque",
    campus: "Ibmec Centro, RJ",
    tags: ["Python", "Django"],
  },
  {
    id: 3,
    title: "Dashboard de Analytics",
    campus: "Ibmec Faria Lima, SP",
    tags: ["Vue.js", "D3.js"],
  },
  {
    id: 4,
    title: "Plataforma de E-learning",
    campus: "Ibmec Paulista, SP",
    tags: ["React", "MySQL"],
  },
];

// Dados de exemplo — substituir por props/API quando o backend estiver pronto.
const PROJECT = {
  title: "Lorem ipsum dolor sit amet, consectetur.",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Curabitur sagittis cursus consequat. Vestibulum commodo semper arcu aliquet luctus.
    Quisque volutpat id orci ac porttitor. Cras varius ornare arcu, id aliquet tellus
    ornare id. Nam rhoncus consectetur mi, sit amet tincidunt tortor interdum vitae.
    Etiam porttitor ante quam, semper viverra metus cursus eget. Aliquam erat volutpat.
    Nulla lectus quam, scelerisque eget lobortis eget, consequat ac magna.`,
  members: "## pessoas",
  technologies: "Tec1, Tec2, Tec3, Tec4, ...",
  location: "São Paulo, SP",
  services:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor dolor nec lacus.",
  githubUrl: "#", // Substituir pela URL real do repositório
  team: [
    { name: "Ana Silva", role: "Desenvolvedora Front-end", initials: "AS" },
    { name: "Bruno Costa", role: "Desenvolvedor Back-end", initials: "BC" },
    { name: "Clara Mendes", role: "UX Designer", initials: "CM" },
  ],
};

export default function ProjetoExemplo() {
  const { categoria } = useParams();
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const isValidCategory = CATEGORIES.some((c) => c.slug === categoria);

  if (!isValidCategory) {
    return <Navigate to="/404" replace />;
  }

  const categoryLabel =
    CATEGORIES.find((c) => c.slug === categoria)?.label ?? "Projetos";
  const categoryIcon = CATEGORY_ICONS[categoria];

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    // Simula envio — substituir por chamada real à API
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 1000);
  }

  return (
    <>
      {/* ── Breadcrumb — fora do main-content para não entrar no flex ── */}
      <div className="page-breadcrumb-shell">
        <nav className="page-breadcrumb" aria-label="Navegação estrutural">
          <Link to="/">Início</Link>
          <span className="page-breadcrumb__sep" aria-hidden="true">
            ›
          </span>
          <Link to="/" state={{ scrollTo: "projetos" }}>
            Projetos
          </Link>
          <span className="page-breadcrumb__sep" aria-hidden="true">
            ›
          </span>
          <Link to={`/projetos/${categoria}`}>{categoryLabel}</Link>
          <span className="page-breadcrumb__sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">Detalhe</span>
        </nav>
      </div>

      <main className="main-content">
        <section className="project-container">
          <div className="project-info">
            <h1>{PROJECT.title}</h1>

            <article>
              <h2>Descrição do Projeto:</h2>
              <p>{PROJECT.description}</p>
            </article>

            <aside className="info-cards">
              <div className="item-relacionado">
                <h3>Membros</h3>
                <p>
                  <i className="fa-solid fa-users" aria-hidden="true" />{" "}
                  {PROJECT.members}
                </p>
              </div>

              <div className="item-relacionado">
                <h3>Tecnologias</h3>
                <p>
                  <i className="fa-solid fa-microchip" aria-hidden="true" />{" "}
                  {PROJECT.technologies}
                </p>
              </div>

              <div className="item-relacionado">
                <h3>Localização</h3>
                <p>
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />{" "}
                  {PROJECT.location}
                </p>
              </div>

              <div className="item-relacionado">
                <h3>Serviços Prestados</h3>
                <p>
                  <i className="fa-solid fa-robot" aria-hidden="true" />{" "}
                  {PROJECT.services}
                </p>
              </div>
            </aside>

            <div className="project-actions">
              <a
                href={PROJECT.githubUrl}
                className="btn btn--primary"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a href="#contato" className="btn btn--secondary">
                Contatar equipe
              </a>
            </div>
          </div>

          <figure>
            <img src={imagemExemplo} alt="Preview do projeto" />
          </figure>
        </section>
      </main>

      <hr className="linha-customizada" />

      {/* ── SEÇÃO DE CONTATO ── */}
      <section id="contato" className="contato-section">
        <div className="contato-container">
          {/* Coluna esquerda — equipe */}
          <div className="contato-equipe">
            <span className="contato-eyebrow">Equipe do projeto</span>
            <h2>Fale com a gente</h2>
            <p>
              Tem interesse neste projeto ou quer saber mais sobre como a equipe
              pode ajudar sua empresa? Entre em contato diretamente.
            </p>

            <ul className="equipe-lista">
              {PROJECT.team.map(({ name, role, initials }) => (
                <li key={name} className="equipe-membro">
                  <div className="equipe-avatar">{initials}</div>
                  <div className="equipe-info">
                    <strong>{name}</strong>
                    <span>{role}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna direita — formulário */}
          <div className="contato-form-wrapper">
            {enviado ? (
              <div className="contato-sucesso">
                <div className="contato-sucesso__icone">
                  <i className="fa-solid fa-check" aria-hidden="true" />
                </div>
                <h3>Mensagem enviada!</h3>
                <p>A equipe receberá seu contato e retornará em breve.</p>
                <button
                  className="btn-contato"
                  onClick={() => {
                    setEnviado(false);
                    setForm({ nome: "", email: "", mensagem: "" });
                  }}
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form className="contato-form" onSubmit={onSubmit} noValidate>
                <div className="contato-form__group">
                  <label htmlFor="contato-nome">Nome</label>
                  <input
                    id="contato-nome"
                    name="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    required
                    minLength={3}
                    value={form.nome}
                    onChange={onChange}
                  />
                </div>

                <div className="contato-form__group">
                  <label htmlFor="contato-email">E-mail</label>
                  <input
                    id="contato-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={form.email}
                    onChange={onChange}
                  />
                </div>

                <div className="contato-form__group">
                  <label htmlFor="contato-mensagem">Mensagem</label>
                  <textarea
                    id="contato-mensagem"
                    name="mensagem"
                    placeholder="Descreva seu interesse ou dúvida..."
                    required
                    minLength={10}
                    rows={5}
                    value={form.mensagem}
                    onChange={onChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-contato"
                  disabled={enviando}
                >
                  {enviando ? "Enviando…" : "Enviar mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── PROJETOS RELACIONADOS ── */}
      <section className="relacionados">
        <div className="relacionados__inner">
          <div className="relacionados__header">
            <span className="relacionados__eyebrow">Mesma área</span>
            <h2>Outros projetos de {categoryLabel}</h2>
          </div>

          <div className="relacionados__grid">
            {RELATED.map(({ id, title, campus, tags }) => (
              <Link
                key={id}
                to={`/projetos/${categoria}/exemplo-${id}`}
                className="relacionados__card"
              >
                <div className="relacionados__card-avatar">
                  {categoryIcon && (
                    <img src={categoryIcon} alt={categoryLabel} />
                  )}
                </div>
                <div className="relacionados__card-body">
                  <h3>{title}</h3>
                  <p>{campus}</p>
                  <div className="relacionados__tags">
                    {tags.map((tag) => (
                      <span key={tag} className="relacionados__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="relacionados__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="relacionados__footer">
            <Link
              to={`/projetos/${categoria}`}
              className="relacionados__ver-todos"
            >
              Ver todos os projetos de {categoryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
