# Ibmec Projetos

Plataforma web para exposição e descoberta de projetos acadêmicos desenvolvidos por alunos do **Ibmec**. O objetivo é criar uma vitrine que permita:

- **Alunos** publicarem seus trabalhos de conclusão de curso e projetos interdisciplinares.
- **Professores** acompanharem e avaliarem o portfólio produzido pelos estudantes.
- **Empresas** descobrirem talentos e soluções inovadoras para seus desafios reais.

---

## Tecnologias

| Ferramenta | Versão |
|---|---|
| React | 18+ |
| React Router DOM | 6+ |
| Vite | 5+ |

---

## Estrutura do Projeto

```
src/
├── assets/            # Imagens, ícones e vídeos estáticos
├── components/        # Componentes reutilizáveis (Header, Footer, Layout, LoginModal, ScrollToTop)
├── constants/
│   └── projects.js    # Fonte única de verdade para as categorias de projetos
├── context/
│   └── LoginContext.jsx  # Estado global do modal de login (evita prop drilling)
├── pages/             # Páginas da aplicação (Home, Cadastro, QuemSomos, Projetos, ProjetoExemplo)
└── styles/            # Arquivos CSS por componente/página + style.css global
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

---

## Rotas

| Caminho | Página |
|---|---|
| `/` | Home — busca e destaques de projetos |
| `/quem-somos` | Sobre a plataforma e o Ibmec |
| `/cadastro` | Cadastro de empresas parceiras |
| `/projetos/:categoria` | Listagem por área (ex.: `/projetos/back-end`) |
| `/projetos/:categoria/:slug` | Detalhe de um projeto específico |

---

## Categorias Disponíveis

`direito` · `arquitetura` · `front-end` · `back-end` · `administracao` · `economia` · `ux` · `marketing` · `ia` · `mobile`

---

## Próximos Passos

- [ ] Integração com backend/API para dados reais de projetos
- [ ] Autenticação de alunos e professores (além do fluxo de empresas)
- [ ] Painel do professor para avaliação de projetos
- [ ] Upload de arquivos e mídias pelos alunos
- [ ] Busca e filtros funcionais na listagem de projetos

---

## Contribuição

Projeto desenvolvido por alunos do Ibmec como trabalho acadêmico.  
Para dúvidas ou sugestões, utilize a seção de **Issues** do repositório.
