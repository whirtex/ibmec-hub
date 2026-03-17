/**
 * Fonte única de verdade para as categorias de projetos.
 * Usada no Header (mobile + megamenu desktop), Footer, Home e Projetos.
 */

import icDireito from "../assets/icons/direito.svg";
import icArquitetura from "../assets/icons/arquitetura.svg";
import icIA from "../assets/icons/IA.svg";
import icAdm from "../assets/icons/marketing e vendas.svg";
import icEcon from "../assets/icons/economia e financas.svg";
import icUX from "../assets/icons/UX.svg";
import icMkt from "../assets/icons/marketing.svg";
import icFront from "../assets/icons/front.svg";
import icBack from "../assets/icons/back.svg";
import icMobile from "../assets/icons/mobile.svg";

/** Mapeamento slug → ícone SVG importado. */
export const CATEGORY_ICONS = {
  direito: icDireito,
  arquitetura: icArquitetura,
  ia: icIA,
  administracao: icAdm,
  economia: icEcon,
  ux: icUX,
  marketing: icMkt,
  "front-end": icFront,
  "back-end": icBack,
  mobile: icMobile,
};
export const CATEGORIES = [
  { slug: "direito", label: "Direito" },
  { slug: "arquitetura", label: "Arquitetura" },
  { slug: "front-end", label: "Front-end" },
  { slug: "back-end", label: "Back-end" },
  { slug: "administracao", label: "Administração" },
  { slug: "economia", label: "Economia e Finanças" },
  { slug: "ux", label: "User Experience" },
  { slug: "marketing", label: "Marketing" },
  { slug: "ia", label: "Inteligência Artificial" },
  { slug: "mobile", label: "Mobile" },
];

/**
 * Agrupamento em 5 colunas para o megamenu desktop (2 itens por coluna).
 * Gerado automaticamente a partir de CATEGORIES.
 */
export const MEGAMENU_COLUMNS = Array.from({ length: 5 }, (_, i) =>
  CATEGORIES.slice(i * 2, i * 2 + 2),
);
