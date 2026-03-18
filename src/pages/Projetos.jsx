import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CATEGORIES, CATEGORY_ICONS } from "../constants/projects";
import "../styles/styleProjects.css";

// Dados de exemplo — futuramente virão de uma API/banco de dados.
// Cada projeto tem title, campus e tags de tecnologia.
const EXAMPLE_PROJECTS = [
  {
    id: 1,
    title: "Sistema de Contratos Digitais",
    campus: "Ibmec Barra, RJ",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "API de Gestão de Estoque",
    campus: "Ibmec Centro, RJ",
    tags: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: 3,
    title: "Dashboard de Analytics",
    campus: "Ibmec Faria Lima, SP",
    tags: ["Vue.js", "D3.js", "Firebase"],
  },
  {
    id: 4,
    title: "Plataforma de E-learning",
    campus: "Ibmec Paulista, SP",
    tags: ["React", "Express", "MySQL"],
  },
  {
    id: 5,
    title: "App de Gestão Financeira",
    campus: "Ibmec Belo Horizonte, MG",
    tags: ["Flutter", "Dart", "Supabase"],
  },
  {
    id: 6,
    title: "Sistema de Agendamento Online",
    campus: "Ibmec Brasília, DF",
    tags: ["Next.js", "Prisma", "TypeScript"],
  },
];

export default function ProjectsPage() {
  const { categoria } = useParams();

  const categoryLabel =
    CATEGORIES.find((c) => c.slug === categoria)?.label ?? "Projetos";

  const categoryIcon = CATEGORY_ICONS[categoria];

  return (
    <>
      <div className="page-breadcrumb-shell">
        <nav className="page-breadcrumb" aria-label="Navegação estrutural">
          <Link to="/">Início</Link>
          <span className="page-breadcrumb__sep" aria-hidden="true">
            ›
          </span>
          <Link to="/#projetos">Projetos</Link>
          <span className="page-breadcrumb__sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">{categoryLabel}</span>
        </nav>
      </div>

      <main className="projects" aria-label="Vitrine de projetos">
        {/* ── Título com eyebrow ── */}
        <section className="projects__title">
          <span className="projects__eyebrow">Área de conhecimento</span>
          <h1>{categoryLabel}</h1>
          <p>Trabalhos desenvolvidos por alunos do Ibmec</p>
        </section>

        <section className="projects__grid" aria-label="Lista de projetos">
          {EXAMPLE_PROJECTS.map(({ id, title, campus, tags }) => (
            <article key={id} className="project-card">
              {/* Linha superior: avatar + título + campus */}
              <div className="project-card__header">
                <div className="project-card__avatar">
                  {categoryIcon && (
                    <img src={categoryIcon} alt={categoryLabel} />
                  )}
                </div>
                <div className="project-card__meta">
                  <h3 className="project-card__title">{title}</h3>
                  <p className="project-card__campus">{campus}</p>
                </div>
              </div>

              {/* Tags de tecnologia */}
              <div className="project-card__tags">
                {tags.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Botão */}
              <Link
                to={`/projetos/${categoria}/exemplo-${id}`}
                className="project-card__btn"
                role="button"
              >
                Ver Projeto
              </Link>
            </article>
          ))}
        </section>

        <div className="projects__more">
          <button className="projects__more-btn" type="button">
            Ver mais projetos
          </button>
        </div>
      </main>

      <hr className="linha-customizada" />
    </>
  );
}
