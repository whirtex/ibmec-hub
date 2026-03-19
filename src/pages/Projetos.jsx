import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const isValidCategory =
    categoria === "todos" || CATEGORIES.some((c) => c.slug === categoria);

  const query = searchParams.get("q")?.trim() ?? "";
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const categoryLabel =
    categoria === "todos"
      ? "Todas as áreas"
      : (CATEGORIES.find((c) => c.slug === categoria)?.label ?? "Projetos");

  const categoryIcon = CATEGORY_ICONS[categoria];

  const filteredProjects = useMemo(() => {
    if (!query) return EXAMPLE_PROJECTS;

    const normalizedQuery = query.toLowerCase();

    return EXAMPLE_PROJECTS.filter(({ title, campus, tags }) => {
      const searchableText =
        `${title} ${campus} ${tags.join(" ")}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  function onSearchSubmit(e) {
    e.preventDefault();

    const nextParams = new URLSearchParams(searchParams);
    const normalizedInput = searchInput.trim();

    if (normalizedInput) {
      nextParams.set("q", normalizedInput);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams);
  }

  function clearSearch() {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("q");
    setSearchInput("");
    setSearchParams(nextParams);
  }

  if (!isValidCategory) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
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
          <span aria-current="page">{categoryLabel}</span>
        </nav>
      </div>

      <main className="projects" aria-label="Vitrine de projetos">
        {/* ── Título com eyebrow ── */}
        <section className="projects__title">
          <span className="projects__eyebrow">Área de conhecimento</span>
          <h1>{categoryLabel}</h1>
          <p>Trabalhos desenvolvidos por alunos do Ibmec</p>

          <form className="projects__search-form" onSubmit={onSearchSubmit}>
            <input
              type="text"
              className="projects__search-input"
              placeholder="Buscar por título, campus ou tecnologia"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="projects__search-btn">
              Buscar
            </button>
            {query && (
              <button
                type="button"
                className="projects__search-clear"
                onClick={clearSearch}
              >
                Limpar
              </button>
            )}
          </form>

          {query && (
            <p className="projects__search-result">
              {filteredProjects.length} resultado(s) para “{query}”.
            </p>
          )}
        </section>

        <section className="projects__grid" aria-label="Lista de projetos">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(({ id, title, campus, tags }) => (
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
            ))
          ) : (
            <article className="projects__empty" aria-live="polite">
              <h3>Nenhum projeto encontrado</h3>
              <p>Tente ajustar o termo buscado ou limpar o filtro atual.</p>
            </article>
          )}
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
