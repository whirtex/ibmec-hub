import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-Ibmec.svg";
import { useLogin } from "../context/LoginContext";
import "../styles/styleCadastro.css";

function maskCNPJ(value) {
  const d = (value || "").replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2)  return d;
  if (d.length <= 5)  return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8)  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

const INITIAL_FORM = {
  nome: "", email: "", cnpj: "", senha: "",
  porte: "", vinculo: "", area: "", demanda: "",
};

export default function Cadastro() {
  // Consome o contexto diretamente — sem necessidade de prop onOpenLogin
  const { openLogin } = useLogin();
  const formRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onChange(e) {
    const { name, value } = e.target;
    e.target.setCustomValidity("");
    setField(name, name === "cnpj" ? maskCNPJ(value) : value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const formEl = formRef.current;
    [...formEl.querySelectorAll("input, select")].forEach((el) =>
      el.setCustomValidity("")
    );
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }
    // TODO: enviar dados para a API
    console.log("Form OK:", form);
  }

  return (
    <main className="reg">
      <section className="reg-card">
        <div className="reg-header">
          <Link to="/" className="reg-logo" aria-label="Logo Ibmec">
            <img src={logo} alt="Logo Ibmec" />
          </Link>
          <h2>Abra uma conta</h2>
          <p>Digite seu e-mail para se inscrever neste aplicativo</p>
        </div>

        <form ref={formRef} className="reg-form" noValidate onSubmit={onSubmit}>
          <div className="form-group">
            <input
              id="nome" name="nome" type="text"
              placeholder="Nome Completo"
              inputMode="text" autoComplete="name"
              required minLength={3}
              pattern="^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$"
              title="Digite nome e sobrenome, apenas letras e espaços."
              value={form.nome} onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              id="email" name="email" type="email"
              placeholder="Email@dominio.com"
              inputMode="email" autoComplete="email"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
              title="Digite um e-mail válido (ex.: nome@dominio.com)."
              value={form.email} onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              id="cnpj" name="cnpj" type="text"
              placeholder="CNPJ"
              inputMode="numeric" autoComplete="on"
              required
              pattern="^\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2}$|^\d{14}$"
              title="Digite um CNPJ válido (com ou sem pontuação)."
              value={form.cnpj} onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              id="senha" name="senha" type="password"
              placeholder="Senha"
              autoComplete="new-password"
              required minLength={8}
              pattern="^(?=.*[A-Za-z])(?=.*\d).{8,}$"
              title="Mínimo 8 caracteres, com pelo menos 1 letra e 1 número."
              value={form.senha} onChange={onChange}
            />
          </div>

          {[
            {
              id: "porte", placeholder: "Qual o porte da sua empresa?",
              options: [
                { value: "micro",   label: "Microempresa" },
                { value: "pequena", label: "Pequena Empresa" },
                { value: "media",   label: "Média Empresa" },
                { value: "grande",  label: "Grande Empresa" },
              ],
            },
            {
              id: "vinculo", placeholder: "Tem vínculo com o IBMEC Hubs",
              options: [
                { value: "sim", label: "Sim" },
                { value: "nao", label: "Não" },
              ],
            },
            {
              id: "area", placeholder: "Área de atuação",
              options: [
                { value: "tecnologia", label: "Tecnologia" },
                { value: "saude",      label: "Saúde" },
                { value: "educacao",   label: "Educação" },
                { value: "financeiro", label: "Financeiro" },
                { value: "outro",      label: "Outro" },
              ],
            },
            {
              id: "demanda", placeholder: "Tipo de demanda",
              options: [
                { value: "consultoria",   label: "Consultoria" },
                { value: "desenvolvimento", label: "Desenvolvimento" },
                { value: "pesquisa",      label: "Pesquisa" },
                { value: "outro",         label: "Outro" },
              ],
            },
          ].map(({ id, placeholder, options }) => (
            <div className="form-group" key={id}>
              <select
                id={id} name={id} required
                value={form[id]} onChange={onChange}
              >
                <option value="">{placeholder}</option>
                {options.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          ))}

          <button type="submit" className="reg-btn reg-btn--accent">
            Cadastre-se
          </button>

          <div className="reg-or">ou continue com</div>

          <button type="button" className="reg-btn reg-btn--primary" onClick={openLogin}>
            Login
          </button>
        </form>

        <div className="reg-footer">
          Ao continuar, você concorda com os nossos{" "}
          <a href="#">Termos de Serviço</a> e{" "}
          <a href="#">Política de Privacidade</a>
        </div>
      </section>
    </main>
  );
}
