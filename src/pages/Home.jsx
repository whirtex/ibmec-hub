import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CATEGORIES, CATEGORY_ICONS } from "../constants/projects";

// ── Fotos dos autores de depoimentos ──────────────────────────────────────
import MarkZ from "../assets/img/MarkZuckerberg.png";
import TimC from "../assets/img/TimCook.png";
import AndyJ from "../assets/img/AndyJassy.png";
import SatyaN from "../assets/img/SatyaNadella.png";
import JoaoA from "../assets/img/JoaoAdibe.png";
import DiegoB from "../assets/img/DiegoBarreto.png";

// ── Dados dos depoimentos ─────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    category: "Arquitetura e UX",
    icon: CATEGORY_ICONS["arquitetura"],
    quote:
      "É raro ver um time tão jovem dominar a intersecção entre arquitetura e experiência. O conceito que eles apresentaram para nossos novos espaços de varejo é a prova de que o futuro do design está em boas mãos.",
    author: {
      name: "Tim Cook",
      role: "CEO Apple",
      date: "15 de fev de 2025",
      photo: TimC,
    },
  },
  {
    id: 2,
    category: "Back-End",
    icon: CATEGORY_ICONS["back-end"],
    quote:
      "A arquitetura de backend que esta equipe projetou para nós é uma verdadeira obra de engenharia de software. Eles demonstraram um domínio de escalabilidade e performance digno de nossos melhores engenheiros.",
    author: {
      name: "Andy Jassy",
      role: "CEO Amazon",
      date: "15 de set de 2025",
      photo: AndyJ,
    },
  },
  {
    id: 3,
    category: "Front-End",
    icon: CATEGORY_ICONS["front-end"],
    quote:
      "Demos a eles um desafio de interface com dados extremamente complexos. A solução que entregaram não foi apenas funcional, mas de uma clareza e elegância que elevaram o padrão do que considerávamos possível.",
    author: {
      name: "Satya Nadella",
      role: "CEO Microsoft",
      date: "19 de ago de 2025",
      photo: SatyaN,
    },
  },
  {
    id: 4,
    category: "Serviços de IA",
    icon: CATEGORY_ICONS["ia"],
    quote:
      "A profundidade da equipe de IA é impressionante. Eles desenvolveram uma solução preditiva que redefiniu nossa abordagem de engajamento em escala global.",
    author: {
      name: "Mark Zuckerberg",
      role: "CEO Meta",
      date: "5 de fev de 2025",
      photo: MarkZ,
    },
  },
  {
    id: 5,
    category: "Economia e Marketing",
    icon: CATEGORY_ICONS["economia"],
    quote:
      "A análise de mercado que recebemos foi de um nível de senioridade impressionante. São talentos com uma visão estratégica do consumidor brasileiro que muitas agências experientes não possuem.",
    author: {
      name: "João Adibe",
      role: "CEO Cimed",
      date: "30 de mar de 2025",
      photo: JoaoA,
    },
  },
  {
    id: 6,
    category: "Direito",
    icon: CATEGORY_ICONS["direito"],
    quote:
      "Navegar no cenário regulatório brasileiro é um desafio constante. A consultoria jurídica deste time nos forneceu insights claros e a segurança necessária para avançar com um de nossos projetos mais inovadores.",
    author: {
      name: "Diego Barreto",
      role: "CEO iFood",
      date: "12 de jan de 2025",
      photo: DiegoB,
    },
  },
];

export default function Home() {
  const location = useLocation();

  // Scroll suave para seção quando a navegação vem com { state: { scrollTo } }
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    const el = document.getElementById(target);
    if (el)
      setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        0,
      );
  }, [location.state]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <span className="hero__eyebrow">
            Plataforma de projetos acadêmicos
          </span>
          <h2>
            O Futuro
            <br />
            se Cria Aqui.
            <br />
            <em>Encontre talentos no Ibmec.</em>
          </h2>

          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar projetos, áreas ou tecnologias…"
            />
            <button>Pesquisar</button>
          </div>

          <p className="popular">Pesquisas populares</p>
          <div className="tags">
            <span>Consultor de negócios</span>
            <span>Aplicativo para pets</span>
            <span>IA e Dados</span>
          </div>
        </div>
      </section>

      {/* ── GRID DE CATEGORIAS ── */}
      <section className="projetos" id="projetos">
        <div className="container">
          <h3>Explore nossos projetos</h3>
          <div className="grid-projetos">
            {CATEGORIES.map(({ slug, label }) => (
              <Link key={slug} to={`/projetos/${slug}`} className="card">
                <div className="card__icon">
                  <img src={CATEGORY_ICONS[slug]} alt="" aria-hidden="true" />
                </div>
                <h4>{label}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="depoimentos" id="depoimentos">
        <div className="container">
          {/* FIX: "nosso" → "nossos" */}
          <h3>Resultados reais dos nossos clientes</h3>

          <div className="grid-depoimentos">
            {TESTIMONIALS.map(({ id, category, icon, quote, author }) => (
              <div key={id} className="depo-card">
                <div className="title-row">
                  <img src={icon} alt={category} />
                  <h4>{category}</h4>
                </div>

                <p>"{quote}"</p>

                <div className="rating">★★★★★</div>

                <div className="autor">
                  <img src={author.photo} alt={author.name} />
                  <div className="autor__info">
                    <span className="autor__name">{author.name}</span>
                    <span className="autor__meta">
                      {author.role} · {author.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
