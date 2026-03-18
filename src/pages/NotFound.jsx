import { Link } from "react-router-dom";
import "../styles/styleNotFound.css";

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound__inner">
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">Página não encontrada</h1>
        <p className="notfound__desc">
          O endereço que você tentou acessar não existe ou foi movido.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="notfound__btn notfound__btn--primary">
            Voltar para o início
          </Link>
          <Link
            to="/projetos/back-end"
            className="notfound__btn notfound__btn--outline"
          >
            Explorar projetos
          </Link>
        </div>
      </div>
    </main>
  );
}
