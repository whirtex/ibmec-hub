import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-Ibmec.svg";
import { useLoginContext } from "../context/useLoginContext";
import "../styles/styleCadastro.css";
import { registerCompany } from "../services/api";
import { useFormState } from "../hooks/useFormState";
import {
  CNPJ_REGEX,
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  PASSWORD_REGEX,
  maskCNPJ,
  validateCadastroCompanyForm,
} from "../utils/validators";

const INITIAL_FORM = {
  nome: "",
  email: "",
  cnpj: "",
  senha: "",
  porte: "",
  vinculo: "",
  area: "",
  demanda: "",
};

export default function Cadastro() {
  const { openLogin } = useLoginContext();
  const formRef = useRef(null);
  const [enviado, setEnviado] = useState(false);
  const [nomeEnviado, setNomeEnviado] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const {
    values: form,
    errors,
    submitError: errorMessage,
    isSubmitting: enviando,
    handleChange,
    handleSubmit,
  } = useFormState({
    initialValues: INITIAL_FORM,
    validate: validateCadastroCompanyForm,
    formatters: {
      cnpj: (value) => maskCNPJ(value),
    },
  });

  useEffect(() => {
    const formEl = formRef.current;
    if (!formEl) return;

    [...formEl.querySelectorAll("input, select")].forEach((el) => {
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

  function onChange(e) {
    e.target.setCustomValidity("");
    handleChange(e);
  }

  async function onSubmit(e) {
    await handleSubmit(e, async (currentForm) => {
      setNomeEnviado(currentForm.nome.split(" ")[0]);

      await registerCompany({
        name: currentForm.nome,
        email: currentForm.email,
        cnpj: currentForm.cnpj,
        password: currentForm.senha,
        companySize: currentForm.porte,
        ibmecRelationship: currentForm.vinculo,
        industry: currentForm.area,
        demandType: currentForm.demanda,
      });

      setEnviado(true);
    });
  }

  /* ── TELA DE SUCESSO ── */
  if (enviado) {
    return (
      <main className="reg">
        <section className="reg-card reg-card--sucesso">
          <div className="reg-sucesso">
            <div className="reg-sucesso__icone" aria-hidden="true">
              <i className="fa-solid fa-check" />
            </div>
            <h2>Tudo certo, {nomeEnviado}!</h2>
            <p>
              Sua conta foi criada com sucesso. Em breve você receberá um e-mail
              de confirmação para <strong>{form.email}</strong>.
            </p>
            <Link to="/" className="reg-btn reg-btn--accent reg-btn--link">
              Explorar projetos
            </Link>
            <button
              type="button"
              className="reg-btn reg-btn--outline"
              onClick={openLogin}
            >
              Entrar na conta
            </button>
          </div>
        </section>
      </main>
    );
  }

  /* ── FORMULÁRIO ── */
  return (
    <main className="reg">
      <section className="reg-card">
        {/* Cabeçalho */}
        <div className="reg-header">
          <Link to="/" className="reg-logo" aria-label="Voltar para início">
            <img src={logo} alt="Logo Ibmec" />
          </Link>
          <h2>Crie sua conta</h2>
          <p>Conecte sua empresa aos talentos do Ibmec</p>
        </div>

        <form ref={formRef} className="reg-form" noValidate onSubmit={onSubmit}>
          {errorMessage && (
            <p className="reg-form__error" role="alert" aria-live="polite">
              {errorMessage}
            </p>
          )}

          {/* ── Grupo: Acesso ── */}
          <div className="form-section">
            <span className="form-section-label">Acesso</span>
            <div className="form-row">
              <div className="form-group">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Nome Completo"
                  inputMode="text"
                  autoComplete="name"
                  required
                  minLength={3}
                  pattern={FULL_NAME_REGEX.source}
                  title="Digite nome e sobrenome, apenas letras e espaços."
                  value={form.nome}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email@dominio.com"
                  inputMode="email"
                  autoComplete="email"
                  required
                  pattern={EMAIL_REGEX.source}
                  title="Digite um e-mail válido (ex.: nome@dominio.com)."
                  value={form.email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  placeholder="CNPJ"
                  inputMode="numeric"
                  autoComplete="on"
                  required
                  pattern={CNPJ_REGEX.source}
                  title="Digite um CNPJ válido (com ou sem pontuação)."
                  value={form.cnpj}
                  onChange={onChange}
                />
              </div>
              <div className="form-group form-group--senha">
                <input
                  id="senha"
                  name="senha"
                  type={showSenha ? "text" : "password"}
                  placeholder="Senha"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  pattern={PASSWORD_REGEX.source}
                  title="Mínimo 8 caracteres, com pelo menos 1 letra e 1 número."
                  value={form.senha}
                  onChange={onChange}
                />
                <button
                  type="button"
                  className="senha-toggle"
                  aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowSenha((v) => !v)}
                >
                  <i
                    className={`fa-solid ${showSenha ? "fa-eye-slash" : "fa-eye"}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ── Grupo: Empresa ── */}
          <div className="form-section">
            <span className="form-section-label">Sua empresa</span>
            <div className="form-row">
              <div className="form-group">
                <select
                  id="porte"
                  name="porte"
                  required
                  value={form.porte}
                  onChange={onChange}
                >
                  <option value="">Porte da empresa</option>
                  <option value="micro">Microempresa</option>
                  <option value="pequena">Pequena Empresa</option>
                  <option value="media">Média Empresa</option>
                  <option value="grande">Grande Empresa</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  id="vinculo"
                  name="vinculo"
                  required
                  value={form.vinculo}
                  onChange={onChange}
                >
                  <option value="">Vínculo com IBMEC Hubs?</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <select
                  id="area"
                  name="area"
                  required
                  value={form.area}
                  onChange={onChange}
                >
                  <option value="">Área de atuação</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="saude">Saúde</option>
                  <option value="educacao">Educação</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  id="demanda"
                  name="demanda"
                  required
                  value={form.demanda}
                  onChange={onChange}
                >
                  <option value="">Tipo de demanda</option>
                  <option value="consultoria">Consultoria</option>
                  <option value="desenvolvimento">Desenvolvimento</option>
                  <option value="pesquisa">Pesquisa</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Ações ── */}
          <div className="reg-actions">
            <button
              type="submit"
              className="reg-btn reg-btn--accent"
              disabled={enviando}
            >
              {enviando ? "Criando conta…" : "Cadastre-se"}
            </button>
            <div className="reg-or">ou</div>
            <button
              type="button"
              className="reg-btn reg-btn--outline"
              onClick={openLogin}
              disabled={enviando}
            >
              Já tenho conta — Entrar
            </button>
          </div>
        </form>

        <div className="reg-footer">
          Ao continuar, você concorda com os nossos{" "}
          <button type="button" className="reg-footer__btn">
            Termos de Serviço
          </button>{" "}
          e{" "}
          <button type="button" className="reg-footer__btn">
            Política de Privacidade
          </button>
        </div>
      </section>
    </main>
  );
}
