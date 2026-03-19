# Ibmec Projetos

Plataforma web para exposição e descoberta de projetos acadêmicos desenvolvidos por alunos do **Ibmec**. Conecta três públicos:

- **Alunos** — vitrine para seus projetos de curso e trabalhos interdisciplinares.
- **Professores** — acompanhamento do portfólio produzido pelos estudantes.
- **Empresas** — descoberta de talentos e soluções inovadoras para desafios reais.

---

## Tecnologias

| Ferramenta          | Uso                             |
| ------------------- | ------------------------------- |
| React 19+           | Interface e componentes         |
| React Router DOM 7+ | Navegação e rotas               |
| Rolldown Vite 7+    | Bundler e dev server            |
| Font Awesome 6      | Ícones (CDN)                    |
| Context API         | Estado global do modal de login |

---

## Estrutura do Projeto

```
src/
├── assets/
│   ├── icons/          # SVGs das categorias de projeto
│   └── img/            # Imagens, fotos e vídeo institucional
├── components/
│   ├── Header.jsx      # Nav com megamenu desktop + acordeão mobile + NavLink ativo
│   ├── Footer.jsx      # Rodapé com links de categorias
│   ├── Layout.jsx      # Wrapper com Header, Footer e LoginModal
│   ├── LoginModal.jsx  # Modal de login com link para cadastro
│   └── ScrollToTop.jsx # Reset de scroll na troca de rota
├── constants/
│   ├── projects.js      # Fonte única para categorias, ícones e megamenu
│   └── projectsData.js  # Fonte única de dados mock dos projetos (lista e detalhe)
├── context/
│   ├── LoginContext.jsx  # Estado global do modal (sem prop drilling)
│   └── useLoginContext.js # Hook para consumir o contexto com segurança
├── pages/
│   ├── Home.jsx        # Hero, grid de categorias e depoimentos
│   ├── Cadastro.jsx    # Formulário de cadastro em 2 colunas + tela de sucesso
│   ├── QuemSomos.jsx   # Página institucional com CTA final
│   ├── Projetos.jsx    # Listagem de projetos por categoria
│   ├── ProjetoExemplo.jsx  # Detalhe do projeto + seção de contato
│   └── NotFound.jsx    # Página 404
└── styles/
    ├── style.css           # Variáveis globais, header, hero, grid, depoimentos, footer
    ├── styleCadastro.css   # Estilos do formulário de cadastro
    ├── styleLogin.css      # Estilos do modal de login
    ├── styleProjects.css   # Estilos da listagem de projetos
    ├── styleProjetoExemplo.css  # Estilos do detalhe + seção de contato
    ├── styleQuemSomos.css  # Estilos da página institucional
    └── styleNotFound.css   # Estilos da página 404
```

---

## Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
```

Acesse em `http://localhost:5173`

### API real (opcional)

Por padrão, o front usa fallback mock para login, cadastro e contato.

Para conectar em backend real:

```bash
# copie o arquivo de exemplo
cp .env.example .env

# ajuste a URL para sua API
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Se `VITE_API_BASE_URL` não estiver definido, os serviços de `src/services/api.js` continuam em modo mock.

---

## Rotas

| Caminho                      | Página                                        |
| ---------------------------- | --------------------------------------------- |
| `/`                          | Home — busca, categorias e depoimentos        |
| `/quem-somos`                | Sobre a plataforma e o Ibmec                  |
| `/cadastro`                  | Cadastro de empresas parceiras                |
| `/projetos/todos`            | Listagem geral com busca por query (`?q=`)    |
| `/projetos/:categoria`       | Listagem por área (ex.: `/projetos/back-end`) |
| `/projetos/:categoria/:slug` | Detalhe de um projeto específico              |
| `*`                          | Página 404                                    |

---

## Contrato de API (v1)

Contrato mínimo para autenticação, cadastro de empresa, contato e sessão:

- `POST /auth/login`
- `POST /auth/register-company`
- `POST /contact/institutional`
- `POST /contact`
- `GET /me`

Veja detalhes em `docs/api-contract-v1.md`.

---

## Categorias de Projeto

`direito` · `arquitetura` · `front-end` · `back-end` · `administracao` · `economia` · `ux` · `marketing` · `ia` · `mobile`

Definidas em `src/constants/projects.js` — alterar aqui reflete automaticamente no Header, Footer e Home.

---

## Decisões Técnicas

**`LoginContext`** — o estado do modal de login é compartilhado via Context API, evitando prop drilling entre `App`, `Layout`, `Header` e `Cadastro`.

**`constants/projects.js`** — fonte única de verdade para as categorias. Exporta `CATEGORIES`, `CATEGORY_ICONS` e `MEGAMENU_COLUMNS`. Qualquer alteração nas áreas reflete em todos os componentes automaticamente.

**`constants/projectsData.js`** — fonte única dos projetos mock utilizados tanto na listagem quanto no detalhe. Evita duplicação de dados e mantém consistência de navegação.

**NavLink ativo** — o Header usa `NavLink` do React Router com `useMatch("/projetos/*")` para marcar "Projetos" como ativo em qualquer subrota de categoria.

**Validação de rota** — páginas de listagem e detalhe validam categoria/slug e redirecionam para 404 quando inválidos.

---

## Próximos Passos

- [ ] Integração com backend/API para dados reais de projetos
- [ ] Autenticação real (JWT ou OAuth) para alunos e professores
- [ ] Painel do professor para avaliação e publicação de projetos
- [ ] Upload de imagens e arquivos pelos alunos
- [ ] Paginação / carregamento incremental na listagem
- [ ] Títulos de página dinâmicos por rota (`react-helmet`)
- [ ] Proteção de rotas privadas (`PrivateRoute`)
- [ ] Página de perfil/dashboard pós-login

---

## Contribuição

Projeto desenvolvido por alunos do Ibmec como trabalho acadêmico.  
Para dúvidas ou sugestões, utilize a seção de **Issues** do repositório.
