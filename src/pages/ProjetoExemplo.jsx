import "../styles/styleProjetoExemplo.css";
import "../styles/style.css";
import imagemExemplo from "../assets/img/imagemExemplo.png";

// Dados de exemplo — substituir por props/API quando o backend estiver pronto.
const PROJECT = {
  title:       "Lorem ipsum dolor sit amet, consectetur.",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Curabitur sagittis cursus consequat. Vestibulum commodo semper arcu aliquet luctus.
    Quisque volutpat id orci ac porttitor. Cras varius ornare arcu, id aliquet tellus
    ornare id. Nam rhoncus consectetur mi, sit amet tincidunt tortor interdum vitae.
    Etiam porttitor ante quam, semper viverra metus cursus eget. Aliquam erat volutpat.
    Nulla lectus quam, scelerisque eget lobortis eget, consequat ac magna.`,
  members:      "## pessoas",
  technologies: "Tec1, Tec2, Tec3, Tec4, ...",
  location:     "São Paulo, SP",
  services:     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor dolor nec lacus.",
  githubUrl:    "#", // Substituir pela URL real do repositório
};

export default function ProjetoExemplo() {
  return (
    <>
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
              {/* FIX: href estava ausente — o link ficava morto */}
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
    </>
  );
}
