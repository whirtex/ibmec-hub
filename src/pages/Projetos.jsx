import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { CATEGORIES, CATEGORY_ICONS } from "../constants/projects";
import "../styles/styleProjects.css";

// Dados de exemplo — futuramente virão de uma API/banco de dados.
// Cada projeto tem title, campus e tags de tecnologia.
const EXAMPLE_PROJECTS = [
  {
    id: 1,
    category: "direito",
    title: "Sistema de Contratos Digitais",
    campus: "Ibmec Barra, RJ",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    category: "direito",
    title: "Plataforma de Compliance Trabalhista",
    campus: "Ibmec Centro, RJ",
    tags: ["TypeScript", "NestJS", "PostgreSQL"],
  },
  {
    id: 3,
    category: "direito",
    title: "Analisador de Jurisprudência com IA",
    campus: "Ibmec Brasília, DF",
    tags: ["Python", "FastAPI", "OpenAI"],
  },
  {
    id: 4,
    category: "arquitetura",
    title: "BIM Colaborativo para Habitação Social",
    campus: "Ibmec Barra, RJ",
    tags: ["Revit", "BIM", "Power BI"],
  },
  {
    id: 5,
    category: "arquitetura",
    title: "Planejamento Urbano Orientado a Dados",
    campus: "Ibmec Belo Horizonte, MG",
    tags: ["QGIS", "Python", "GeoJSON"],
  },
  {
    id: 6,
    category: "arquitetura",
    title: "Simulação de Conforto Térmico em Campus",
    campus: "Ibmec Faria Lima, SP",
    tags: ["Rhino", "Grasshopper", "EnergyPlus"],
  },
  {
    id: 7,
    category: "front-end",
    title: "Dashboard de Analytics",
    campus: "Ibmec Faria Lima, SP",
    tags: ["Vue.js", "D3.js", "Firebase"],
  },
  {
    id: 8,
    category: "front-end",
    title: "Portal Acadêmico Acessível",
    campus: "Ibmec Centro, RJ",
    tags: ["React", "Vite", "A11y"],
  },
  {
    id: 9,
    category: "front-end",
    title: "Design System para Startups",
    campus: "Ibmec Paulista, SP",
    tags: ["Storybook", "Tailwind", "Figma"],
  },
  {
    id: 10,
    category: "back-end",
    title: "API de Gestão de Estoque",
    campus: "Ibmec Centro, RJ",
    tags: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: 11,
    category: "back-end",
    title: "Serviço de Notificações em Tempo Real",
    campus: "Ibmec Barra, RJ",
    tags: ["Node.js", "Redis", "WebSocket"],
  },
  {
    id: 12,
    category: "back-end",
    title: "Orquestrador de Microserviços",
    campus: "Ibmec Brasília, DF",
    tags: ["Go", "gRPC", "Docker"],
  },
  {
    id: 13,
    category: "administracao",
    title: "Planejamento Estratégico para PMEs",
    campus: "Ibmec Belo Horizonte, MG",
    tags: ["OKR", "Power BI", "Matriz SWOT"],
  },
  {
    id: 14,
    category: "administracao",
    title: "Modelo de Gestão por Indicadores",
    campus: "Ibmec Faria Lima, SP",
    tags: ["KPI", "Data Studio", "SQL"],
  },
  {
    id: 15,
    category: "administracao",
    title: "Otimização de Processos Operacionais",
    campus: "Ibmec Centro, RJ",
    tags: ["Lean", "Six Sigma", "BPMN"],
  },
  {
    id: 16,
    category: "economia",
    title: "App de Gestão Financeira",
    campus: "Ibmec Belo Horizonte, MG",
    tags: ["Flutter", "Dart", "Supabase"],
  },
  {
    id: 17,
    category: "economia",
    title: "Previsão de Demanda no Varejo",
    campus: "Ibmec Barra, RJ",
    tags: ["Python", "Prophet", "Pandas"],
  },
  {
    id: 18,
    category: "economia",
    title: "Índice de Risco para Crédito PJ",
    campus: "Ibmec Brasília, DF",
    tags: ["R", "XGBoost", "Shiny"],
  },
  {
    id: 19,
    category: "ux",
    title: "Plataforma de E-learning",
    campus: "Ibmec Paulista, SP",
    tags: ["React", "Express", "MySQL"],
  },
  {
    id: 20,
    category: "ux",
    title: "Pesquisa de Usabilidade para Fintech",
    campus: "Ibmec Faria Lima, SP",
    tags: ["User Testing", "Miro", "Hotjar"],
  },
  {
    id: 21,
    category: "ux",
    title: "Redesign de Jornada de Checkout",
    campus: "Ibmec Centro, RJ",
    tags: ["Figma", "Design Sprint", "A/B Test"],
  },
  {
    id: 22,
    category: "marketing",
    title: "Motor de Campanhas Omnichannel",
    campus: "Ibmec Barra, RJ",
    tags: ["CRM", "Segmentação", "Automation"],
  },
  {
    id: 23,
    category: "marketing",
    title: "Análise de Sentimento em Redes Sociais",
    campus: "Ibmec Paulista, SP",
    tags: ["NLP", "Python", "Looker Studio"],
  },
  {
    id: 24,
    category: "marketing",
    title: "Painel de Performance de Conteúdo",
    campus: "Ibmec Belo Horizonte, MG",
    tags: ["GA4", "SEO", "Tableau"],
  },
  {
    id: 25,
    category: "ia",
    title: "Assistente Virtual para Atendimento",
    campus: "Ibmec Centro, RJ",
    tags: ["LLM", "RAG", "LangChain"],
  },
  {
    id: 26,
    category: "ia",
    title: "Classificador de Documentos Jurídicos",
    campus: "Ibmec Brasília, DF",
    tags: ["Transformers", "PyTorch", "FastAPI"],
  },
  {
    id: 27,
    category: "ia",
    title: "Detecção de Fraudes em Transações",
    campus: "Ibmec Faria Lima, SP",
    tags: ["Scikit-learn", "Kafka", "MLflow"],
  },
  {
    id: 28,
    category: "mobile",
    title: "Sistema de Agendamento Online",
    campus: "Ibmec Brasília, DF",
    tags: ["Next.js", "Prisma", "TypeScript"],
  },
  {
    id: 29,
    category: "mobile",
    title: "App de Caronas Universitárias",
    campus: "Ibmec Barra, RJ",
    tags: ["React Native", "Expo", "Firebase"],
  },
  {
    id: 30,
    category: "mobile",
    title: "Carteira Digital Estudantil",
    campus: "Ibmec Paulista, SP",
    tags: ["Flutter", "Dart", "Supabase"],
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
    const categoryFilteredProjects =
      categoria === "todos"
        ? EXAMPLE_PROJECTS
        : EXAMPLE_PROJECTS.filter((project) => project.category === categoria);

    if (!query) return categoryFilteredProjects;

    const normalizedQuery = query.toLowerCase();

    return categoryFilteredProjects.filter(({ title, campus, tags }) => {
      const searchableText =
        `${title} ${campus} ${tags.join(" ")}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [categoria, query]);

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
            filteredProjects.map(({ id, category, title, campus, tags }) => {
              const cardCategory = categoria === "todos" ? category : categoria;
              const cardCategoryLabel =
                CATEGORIES.find((c) => c.slug === cardCategory)?.label ??
                categoryLabel;
              const cardCategoryIcon =
                CATEGORY_ICONS[cardCategory] ?? categoryIcon;

              return (
                <article key={id} className="project-card">
                  {/* Linha superior: avatar + título + campus */}
                  <div className="project-card__header">
                    <div className="project-card__avatar">
                      {cardCategoryIcon && (
                        <img src={cardCategoryIcon} alt={cardCategoryLabel} />
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
                    to={`/projetos/${cardCategory}/exemplo-${id}`}
                    className="project-card__btn"
                    role="button"
                  >
                    Ver Projeto
                  </Link>
                </article>
              );
            })
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
