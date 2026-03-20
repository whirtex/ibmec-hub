import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styleLogin.css";
import logo from "../assets/img/logo-Ibmec.svg";
import { login } from "../services/api";
import { useFormState } from "../hooks/useFormState";
import { validateLoginForm } from "../utils/validators";

const INITIAL_FORM = {
  email: "",
  senha: "",
};

export default function LoginModal({ open, onClose }) {
  const formRef = useRef(null);
  const [showSenha, setShowSenha] = useState(false);
  const {
    values: form,
    errors,
    submitError: errorMessage,
    isSubmitting: loading,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormState({
    initialValues: INITIAL_FORM,
    validate: validateLoginForm,
  });

  useEffect(() => {
    const formEl = formRef.current;
    if (!formEl) return;

    [...formEl.querySelectorAll("input")].forEach((el) => {
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

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  async function onSubmit(e) {
    await handleSubmit(e, async (currentForm) => {
      await login({ email: currentForm.email, password: currentForm.senha });
      resetForm(INITIAL_FORM);
      onClose();
    });
  }

  return (
    <div
      id="loginOverlay"
      className={`modal-overlay ${open ? "visivel" : ""}`}
      onClick={onOverlayClick}
      aria-hidden={!open}
      aria-modal="true"
      aria-labelledby="login-modal-title"
      role="dialog"
    >
      <div className="login-modal">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Fechar modal"
          disabled={loading}
        >
          &times;
        </button>

        <div className="logo">
          <img
            src={logo}
            alt="Ibmec"
            className="login-modal__logo"
            onError={() => console.warn("Falha ao carregar logo-ibmec.svg")}
          />
        </div>

        <p className="title" id="login-modal-title">
          Entre na sua conta
        </p>

        <form ref={formRef} onSubmit={onSubmit} noValidate>
          {errorMessage && (
            <p
              className="login-modal__error form-feedback-error"
              role="alert"
              aria-live="polite"
            >
              {errorMessage}
            </p>
          )}

          <div className="input-group">
            <label htmlFor="login-email" className="login-modal__label">
              E-mail
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="Email@dominio.com"
              required
              autoComplete="email"
              disabled={loading}
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-senha" className="login-modal__label">
              Senha
            </label>
            <div className="login-modal__senha-wrapper">
              <input
                id="login-senha"
                name="senha"
                type={showSenha ? "text" : "password"}
                placeholder="Sua senha"
                required
                autoComplete="current-password"
                disabled={loading}
                value={form.senha}
                onChange={handleChange}
              />
              <button
                type="button"
                className="login-modal__senha-toggle"
                aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setShowSenha((v) => !v)}
                disabled={loading}
              >
                <i
                  className={`fa-solid ${showSenha ? "fa-eye-slash" : "fa-eye"}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <button type="submit" className="btn-confirm" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </button>

          <button type="button" className="login-modal__forgot">
            Esqueci minha senha
          </button>
        </form>

        <div className="login-modal__footer">
          Não tem conta?{" "}
          <Link
            to="/cadastro"
            className="login-modal__signup"
            onClick={onClose}
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
