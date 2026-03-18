import "../styles/styleLogin.css";
import logo from "../assets/img/logo-Ibmec.svg";

export default function LoginModal({ open, onClose }) {
  // fecha se clicar fora do conteudo
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      id="loginOverlay"
      className={`modal-overlay ${open ? "visivel" : ""}`}
      onClick={onOverlayClick}
      aria-hidden={!open}
      aria-modal="true"
      role="dialog"
    >
      <div className="login-modal">
        <button
          className="close-btn"
          id="fecharModal"
          onClick={onClose}
          aria-label="Fechar modal"
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

        <p className="title">Entre na sua conta</p>

        <form
          id="loginForm"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div className="input-group">
            <input type="email" placeholder="Email@dominio.com" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Senha" required />
          </div>
          <button type="submit" className="btn-confirm">
            Confirmar
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
