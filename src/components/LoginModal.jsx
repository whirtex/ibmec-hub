import { useState } from "react";
import "../styles/styleLogin.css";
import logo from "../assets/img/logo-Ibmec.svg";

export default function LoginModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // TODO: substituir pelo POST real de autenticação
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1200);
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

        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="login-email" className="login-modal__label">
              E-mail
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="Email@dominio.com"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-senha" className="login-modal__label">
              Senha
            </label>
            <div className="login-modal__senha-wrapper">
              <input
                id="login-senha"
                type={showSenha ? "text" : "password"}
                placeholder="Sua senha"
                required
                autoComplete="current-password"
                disabled={loading}
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

          <a href="#" className="login-modal__forgot">
            Esqueci minha senha
          </a>
        </form>

        <div className="login-modal__footer">
          Não tem conta?{" "}
          <a href="/cadastro" className="login-modal__signup">
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
}
