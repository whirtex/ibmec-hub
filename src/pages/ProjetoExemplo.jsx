import { useState } from "react";
import "../styles/styleProjetoExemplo.css";
import "../styles/style.css";
import imagemExemplo from "../assets/img/imagemExemplo.png";

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
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

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
              <li className="equipe-membro">
                <div className="equipe-avatar">P1</div>
                <div className="equipe-info">
                  <strong>Pessoa 1</strong>
                  <span>Função 1</span>
                </div>
              </li>

              <li className="equipe-membro">
                <div className="equipe-avatar">P2</div>
                <div className="equipe-info">
                  <strong>Pessoa 2</strong>
                  <span>Função 2</span>
                </div>
              </li>

              <li className="equipe-membro">
                <div className="equipe-avatar">P3</div>
                <div className="equipe-info">
                  <strong>Pessoa 3</strong>
                  <span>Função 3</span>
                </div>
              </li>
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
    </>
  );
}
