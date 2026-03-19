import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sendContactMessage } from "../services/api";
import "../styles/styleContato.css";

const INITIAL_FORM = {
  nome: "",
  email: "",
  assunto: "contato",
  mensagem: "",
  site: "", // honeypot
};

export default function Contato() {
  const formRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(INITIAL_FORM);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  // pré-seleciona o tipo via query param (?tipo=feedback)
  useEffect(() => {
    const param =
      (searchParams.get("tipo") || searchParams.get("assunto") || "").toLowerCase();
    const allowed = ["contato", "feedback", "suporte"];
    if (allowed.includes(param)) {
      setForm((f) => ({ ...f, assunto: param }));
    }
  }, [searchParams]);

  function onChange(e) {
    const { name, value } = e.target;
    if (name !== "site") e.target.setCustomValidity("");
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");

    const formEl = formRef.current;
    [...formEl.querySelectorAll("input, select, textarea")].forEach((el) =>
      el.setCustomValidity("")
    );

    if (form.site) {
      return; // honeypot preenchido: ignora
    }

    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    setEnviando(true);

    try {
      await sendContactMessage({
        projectId: null,
        name: form.nome,
        email: form.email,
        message: form.mensagem,
        type: form.assunto,
      });

      setEnviado(true);
      setForm(INITIAL_FORM);
    } catch (error) {
      setErro(error.message || "Não foi possível enviar sua mensagem.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="contato" aria-label="Fale conosco">
      <div className="page-breadcrumb-shell">
        <nav className="page-breadcrumb" aria-label="Navegação estrutural">
          <span>Início</span>
          <span className="page-breadcrumb__sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">Contato</span>
        </nav>
      </div>

      <section className="contato__hero">
        <div className="container contato__hero-inner">
          <div>
            <span className="contato__eyebrow">Fale com o Ibmec Hubs</span>
            <h1>Contato e feedback</h1>
            <p>
              Precisa falar com a gente ou enviar uma sugestão? Preencha o
              formulário e retornaremos assim que possível.
            </p>
          </div>
          <div className="contato__badge" aria-hidden="true">
            <span>Resposta média</span>
            <strong>1 dia útil</strong>
          </div>
        </div>
      </section>

      <section className="contato__card" aria-label="Formulário de contato">
        <div className="container">
          {enviado ? (
            <div className="contato__sucesso" role="status" aria-live="polite">
              <div className="contato__sucesso-icone" aria-hidden="true">
                <i className="fa-solid fa-check" />
              </div>
              <h2>Mensagem enviada!</h2>
              <p>
                Recebemos seu contato e responderemos pelo e-mail informado.
              </p>
              <button
                type="button"
                className="btn btn--entrar"
                onClick={() => setEnviado(false)}
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form ref={formRef} className="contato__form" noValidate onSubmit={onSubmit}>
              {erro && (
                <p className="contato__erro" role="alert" aria-live="polite">
                  {erro}
                </p>
              )}

              <div className="contato__grid">
                <label className="contato__field">
                  <span>Nome</span>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Seu nome completo"
                    required
                    minLength={3}
                    autoComplete="name"
                    value={form.nome}
                    onChange={onChange}
                  />
                </label>

                <label className="contato__field">
                  <span>E-mail</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@dominio.com"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                  />
                </label>
              </div>

              <label className="contato__field contato__field--full">
                <span>Tipo de mensagem</span>
                <select name="assunto" required value={form.assunto} onChange={onChange}>
                  <option value="contato">Contato</option>
                  <option value="feedback">Feedback do site</option>
                  <option value="suporte">Suporte</option>
                </select>
              </label>

              <label className="contato__field contato__field--full">
                <span>Mensagem</span>
                <textarea
                  name="mensagem"
                  placeholder="Conte como podemos ajudar"
                  rows={5}
                  required
                  minLength={10}
                  value={form.mensagem}
                  onChange={onChange}
                />
              </label>

              <input
                type="text"
                name="site"
                value={form.site}
                onChange={onChange}
                className="contato__honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="contato__actions">
                <button type="submit" className="btn btn--entrar" disabled={enviando}>
                  {enviando ? "Enviando…" : "Enviar mensagem"}
                </button>
                <p className="contato__privacidade">
                  Ao enviar, você concorda com nossa Política de Privacidade.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
