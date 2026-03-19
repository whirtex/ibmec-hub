import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import QuemSomos from "./pages/QuemSomos";
import ProjectsPage from "./pages/Projetos";
import ProjetoExemplo from "./pages/ProjetoExemplo";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      {/*
        LoginProvider envolve tudo para que Header, Layout e Cadastro
        possam consumir o estado do modal sem prop drilling.
      */}
      <LoginProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/contato" element={<Contato />} />
            {/* Rota genérica de categoria — ex.: /projetos/back-end */}
            <Route path="/projetos/:categoria" element={<ProjectsPage />} />
            {/* Rota de projeto individual — ex.: /projetos/back-end/exemplo */}
            <Route
              path="/projetos/:categoria/:slug"
              element={<ProjetoExemplo />}
            />
            {/* Rota 404 — captura qualquer URL não mapeada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </LoginProvider>
    </BrowserRouter>
  );
}
