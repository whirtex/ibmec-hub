import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "../styles/styleProjetoExemplo.css";
import imagemExemplo from "../assets/img/imagemExemplo.png";
import { CATEGORIES, CATEGORY_ICONS } from "../constants/projects";
import { EXAMPLE_PROJECTS } from "../constants/projectsData";
import { sendProjectContactMessage } from "../services/api";
import { useFormState } from "../hooks/useFormState";
import { validateProjectContactForm } from "../utils/validators";

function buildProjectDetails(project) {
  return {
    ...project,
    description: `Projeto acadêmico desenvolvido no ${project.campus} para resolver desafios práticos da área de ${project.category}. A solução integra tecnologias como ${project.tags.join(", ")} e foi desenhada para escalar com qualidade técnica e foco em resultado.`,
    members: "3 pessoas",
    technologies: project.tags.join(", "),
    location: project.campus,
    services:
      "Pesquisa aplicada, desenvolvimento de solução digital e validação de impacto com parceiros de mercado.",
    githubUrl: "#",
    team: [
      { name: "Ana Silva", role: "Líder de Produto", initials: "AS" },
      { name: "Bruno Costa", role: "Engenheiro de Software", initials: "BC" },
      { name: "Clara Mendes", role: "Designer de Experiência", initials: "CM" },
    ],
  };
}

export default function ProjetoExemplo() {
  const { categoria, slug } = useParams();
  const formRef = useRef(null);
  const {
    values: form,
    errors,
    submitError: contactError,
    isSubmitting: enviando,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormState({
    initialValues: { nome: "", email: "", mensagem: "" },
    validate: validateProjectContactForm,
  });
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const formEl = formRef.current;
    if (!formEl) return;

    [...formEl.querySelectorAll("input, textarea")].forEach((el) => {
      el.setCustomValidity("");
    });

    const firstErrorField = Object.keys(errors)[0];
    if (!firstErrorField) return;

    const firstInput = formEl.querySelector(`[name="${firstErrorField}"]`);
    const message = errors[firstErrorField];

    if (firstInput && message) {
      firstInput.setCustomValidity(message);
      formEl.reportValidity();
      firstInput.setCustomValidity("");
    }
  }, [errors]);

  const isValidCategory = CATEGORIES.some((c) => c.slug === categoria);

  const matchedSlug = slug?.match(/^exemplo-(\d+)$/);
  const projectId = matchedSlug ? Number(matchedSlug[1]) : null;

  const selectedProjectBase = EXAMPLE_PROJECTS.find(
    (project) => project.id === projectId && project.category === categoria,
  );

  const project = selectedProjectBase
    ? buildProjectDetails(selectedProjectBase)
    : null;

  const relatedProjects = EXAMPLE_PROJECTS.filter(
    (item) => item.category === categoria && item.id !== projectId,
  ).slice(0, 3);

  if (!isValidCategory || !project) {
    return <Navigate to="/404" replace />;
  }

  const categoryLabel =
    CATEGORIES.find((c) => c.slug === categoria)?.label ?? "Projetos";
  const categoryIcon = CATEGORY_ICONS[categoria];

  function onChange(e) {
    e.target.setCustomValidity("");
    handleChange(e);
  }

  async function onSubmit(e) {
    await handleSubmit(e, async (currentForm) => {
      await sendProjectContactMessage({
        projectId,
        name: currentForm.nome,
        email: currentForm.email,
        message: currentForm.mensagem,
      });

      setEnviado(true);
    });
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
          <span aria-current="page">{project.title}</span>
        </nav>
      </div>

      <main className="main-content">
        <section className="project-container">
          <div className="project-info">
            <h1>{project.title}</h1>

            <article>
              <h2>Descrição do Projeto:</h2>
              <p>{project.description}</p>
            </article>

            <aside className="info-cards">
              <div className="item-relacionado">
                <h3>Membros</h3>
                <p>
                  <i className="fa-solid fa-users" aria-hidden="true" />{" "}
                  {project.members}
                </p>
              </div>

              <div className="item-relacionado">
                <h3>Tecnologias</h3>
                <p>
                  <i className="fa-solid fa-microchip" aria-hidden="true" />{" "}
                  {project.technologies}
                </p>
              </div>

              <div className="item-relacionado">
                <h3>Localização</h3>
                <p>
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />{" "}
                  {project.location}
                </p>
              </div>

              <div className="item-relacionado">
                <h3>Serviços Prestados</h3>
                <p>
                  <i className="fa-solid fa-robot" aria-hidden="true" />{" "}
                  {project.services}
                </p>
              </div>
            </aside>

            <div className="project-actions">
              <a
                href={project.githubUrl}
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
              {project.team.map(({ name, role, initials }) => (
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
                    resetForm({ nome: "", email: "", mensagem: "" });
                  }}
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                className="contato-form"
                onSubmit={onSubmit}
                noValidate
              >
                {contactError && (
                  <p
                    className="contato-form__erro form-feedback-error"
                    role="alert"
                    aria-live="polite"
                  >
                    {contactError}
                  </p>
                )}

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
            {relatedProjects.map(({ id, title, campus, tags }) => (
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
