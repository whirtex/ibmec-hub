/**
 * Fonte única de verdade para as categorias de projetos.
 * Usada no Header (mobile + megamenu desktop), Footer e Home.
 */
export const CATEGORIES = [
  { slug: "direito",       label: "Direito" },
  { slug: "arquitetura",   label: "Arquitetura" },
  { slug: "front-end",     label: "Front-end" },
  { slug: "back-end",      label: "Back-end" },
  { slug: "administracao", label: "Administração" },
  { slug: "economia",      label: "Economia e Finanças" },
  { slug: "ux",            label: "User Experience" },
  { slug: "marketing",     label: "Marketing" },
  { slug: "ia",            label: "Inteligência Artificial" },
  { slug: "mobile",        label: "Mobile" },
];

/**
 * Agrupamento em 5 colunas para o megamenu desktop (2 itens por coluna).
 * Gerado automaticamente a partir de CATEGORIES.
 */
export const MEGAMENU_COLUMNS = Array.from({ length: 5 }, (_, i) =>
  CATEGORIES.slice(i * 2, i * 2 + 2)
);
