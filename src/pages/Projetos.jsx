import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../constants/projects";
import "../styles/styleProjects.css";

import imagemExemplo from "../assets/img/imagemExemplo.png";

// Dados de exemplo — futuramente virão de uma API/banco de dados.
const EXAMPLE_PROJECTS = [
  { id: 1, title: "Exemplo 1", campus: "Ibmec Barra, RJ" },
  { id: 2, title: "Exemplo 2", campus: "Ibmec Centro, RJ" },
  { id: 3, title: "Exemplo 3", campus: "Ibmec Faria Lima, SP" },
  { id: 4, title: "Exemplo 4", campus: "Ibmec Paulista, SP" },
  { id: 5, title: "Exemplo 5", campus: "Ibmec Belo Horizonte, MG" },
  { id: 6, title: "Exemplo 6", campus: "Ibmec Brasília, DF" },
];

export default function ProjectsPage() {
  const { categoria } = useParams();

  // Busca o label da categoria atual para exibir no título da página
  const categoryLabel =
    CATEGORIES.find((c) => c.slug === categoria)?.label ?? "Projetos";

  return (
    <>
      <main className="projects" aria-label="Vitrine de projetos">

        <section className="projects__title">
          <h1>{categoryLabel}</h1>
          <p>Trabalhos desenvolvidos por alunos do Ibmec</p>
        </section>

        <section className="projects__grid" aria-label="Lista de projetos">
          {EXAMPLE_PROJECTS.map(({ id, title, campus }) => (
            <article key={id} className="project-card">
              <h3 className="project-card__title">{title}</h3>
              <p  className="project-card__campus">{campus}</p>
              <img
                className="project-card__thumb"
                src={imagemExemplo}
                alt={`Imagem do projeto ${title}`}
              />
              {/* Usa a categoria da URL para compor o link correto */}
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
