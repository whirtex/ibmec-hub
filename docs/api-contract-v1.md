# Contrato mínimo de API (v1)

Este documento define o contrato base para integração do front-end com backend.
Escopo: autenticação, cadastro de empresa, contato e recuperação de sessão.

## Decisão de escopo MVP (Dia 1)

### Entra no MVP (fase atual)

- Login de empresa (`POST /auth/login`)
- Cadastro de empresa (`POST /auth/register-company`)
- Sessão autenticada (`GET /me`)
- Contato institucional (`POST /contact/institutional`)
- Contato para projeto (`POST /contact`)

### Fica fora do MVP (próximas fases)

- Reset/recuperação de senha por e-mail
- Painel administrativo
- Gestão completa de usuários (convite, troca de papel, desativação)
- Upload de arquivos e anexos nas mensagens
- Notificações em tempo real
- Integrações externas (CRM, e-mail marketing, analytics avançado)

### Critério de aceite do escopo MVP

- O front atual consegue operar ponta a ponta com os 5 endpoints definidos neste contrato.
- Qualquer funcionalidade fora da lista "Entra no MVP" não bloqueia a primeira entrega.

## Convenções gerais

- Base URL (dev): `/api/v1`
- Formato: `application/json; charset=utf-8`
- Data/hora: ISO-8601 UTC (ex.: `2026-03-18T14:30:00Z`)
- Autenticação: `Authorization: Bearer <token>`
- Padrão de resposta de erro:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos",
    "details": [
      {
        "field": "email",
        "message": "Formato de e-mail inválido"
      }
    ]
  },
  "requestId": "req_01HV..."
}
```

## Modelo de dados (MVP)

### Entidades principais

#### User

- `id` (string, uuid)
- `name` (string, 3-120)
- `email` (string, único, máx. 255)
- `passwordHash` (string)
- `role` (enum: `company | admin`)
- `createdAt` (datetime ISO-8601)
- `updatedAt` (datetime ISO-8601)

#### CompanyProfile

- `id` (string, uuid)
- `userId` (fk para User, único)
- `cnpj` (string, único)
- `companySize` (enum: `micro | pequena | media | grande`)
- `ibmecRelationship` (enum: `sim | nao`)
- `industry` (enum: `tecnologia | saude | educacao | financeiro | outro`)
- `demandType` (enum: `consultoria | desenvolvimento | pesquisa | outro`)
- `createdAt` (datetime ISO-8601)
- `updatedAt` (datetime ISO-8601)

#### Project

- `id` (int, pk)
- `slug` (string, único)
- `title` (string)
- `category` (string)
- `active` (boolean)
- `createdAt` (datetime ISO-8601)
- `updatedAt` (datetime ISO-8601)

#### ContactMessage

- `id` (string, uuid)
- `type` (enum: `institutional | project`)
- `projectId` (int, fk opcional para Project)
- `name` (string, 3-120)
- `email` (string, máx. 255)
- `subject` (enum opcional: `contato | feedback | suporte`)
- `message` (string, 10-2000)
- `status` (enum: `queued | sent | failed`)
- `createdAt` (datetime ISO-8601)

### Relacionamentos

- `User 1:1 CompanyProfile`
- `Project 1:N ContactMessage` (somente quando `type=project`)
- `ContactMessage` institucional não possui `projectId`

### Regras de integridade

- E-mail único por usuário
- CNPJ único por empresa
- Um usuário company deve ter no máximo um CompanyProfile
- `projectId` obrigatório quando `type=project`
- `subject` permitido somente quando `type=institutional`

### Mapeamento com endpoints do contrato

- `POST /auth/register-company` cria `User` + `CompanyProfile`
- `POST /auth/login` autentica `User`
- `GET /me` retorna dados de `User`
- `POST /contact/institutional` cria `ContactMessage` com `type=institutional`
- `POST /contact` cria `ContactMessage` com `type=project`

## Enums finais (fonte única)

Esta seção define os valores oficiais que devem ser usados no front, validação e banco.

### Role

- `company`
- `admin`

### CompanySize

- `micro`
- `pequena`
- `media`
- `grande`

### IbmecRelationship

- `sim`
- `nao`

### Industry

- `tecnologia`
- `saude`
- `educacao`
- `financeiro`
- `outro`

### DemandType

- `consultoria`
- `desenvolvimento`
- `pesquisa`
- `outro`

### InstitutionalContactType

- `contato`
- `feedback`
- `suporte`

### ContactMessageType

- `institutional`
- `project`

### ContactMessageStatus

- `queued`
- `sent`
- `failed`

### Convenção de versionamento de enums

- Novos valores só podem ser adicionados com atualização deste documento.
- Remoção ou renomeação exige versão nova do contrato (ex.: v2).
- Front e backend devem referenciar exatamente os mesmos literais.

## 1) POST `/auth/login`

Autentica usuário e retorna sessão.

### Request body

```json
{
  "email": "empresa@dominio.com",
  "password": "SenhaForte123"
}
```

### Regras de validação

- `email` obrigatório, formato válido, máx. 255 caracteres
- `password` obrigatório, mínimo 8 caracteres

### Response `200 OK`

```json
{
  "accessToken": "jwt_access_token",
  "expiresIn": 3600,
  "user": {
    "id": "usr_123",
    "name": "Empresa ABC",
    "email": "empresa@dominio.com",
    "role": "company"
  }
}
```

### Erros esperados

- `400` payload inválido
- `401` credenciais inválidas
- `429` muitas tentativas
- `500` erro interno

---

## 2) POST `/auth/register-company`

Cria conta de empresa.

### Request body

```json
{
  "name": "Empresa ABC LTDA",
  "email": "contato@empresaabc.com",
  "cnpj": "12.345.678/0001-90",
  "password": "SenhaForte123",
  "companySize": "media",
  "ibmecRelationship": "sim",
  "industry": "tecnologia",
  "demandType": "consultoria"
}
```

### Regras de validação

- `name` obrigatório, 3-120 caracteres
- `email` obrigatório, único
- `cnpj` obrigatório, único, formato válido (com ou sem máscara)
- `password` obrigatório, mínimo 8, ao menos 1 letra e 1 número
- `companySize` enum: `micro | pequena | media | grande`
- `ibmecRelationship` enum: `sim | nao`
- `industry` enum: `tecnologia | saude | educacao | financeiro | outro`
- `demandType` enum: `consultoria | desenvolvimento | pesquisa | outro`

### Response `201 Created`

```json
{
  "id": "usr_456",
  "name": "Empresa ABC LTDA",
  "email": "contato@empresaabc.com",
  "role": "company",
  "createdAt": "2026-03-18T15:00:00Z"
}
```

### Erros esperados

- `400` payload inválido
- `409` e-mail ou CNPJ já cadastrados
- `422` validação de domínio (ex.: CNPJ inválido)
- `500` erro interno

---

## 3) POST `/contact/institutional`

Envia mensagem institucional para a equipe do Ibmec Hubs.

### Request body

```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "message": "Tenho interesse em conversar sobre parceria.",
  "type": "contato"
}
```

### Regras de validação

- `name` obrigatório, 3-120 caracteres
- `email` obrigatório, formato válido
- `message` obrigatório, 10-2000 caracteres
- `type` opcional, enum: `contato | feedback | suporte`

### Response `202 Accepted`

```json
{
  "id": "msg_780",
  "status": "queued",
  "type": "contato",
  "createdAt": "2026-03-18T15:30:00Z"
}
```

### Erros esperados

- `400` payload inválido
- `422` mensagem fora da política
- `500` erro interno

---

## 4) POST `/contact`

Envia mensagem para equipe de um projeto específico.

### Request body

```json
{
  "projectId": 10,
  "name": "João Silva",
  "email": "joao@empresa.com",
  "message": "Tenho interesse em conversar sobre parceria."
}
```

### Regras de validação

- `projectId` obrigatório, inteiro positivo
- `name` obrigatório, 3-120 caracteres
- `email` obrigatório, formato válido
- `message` obrigatório, 10-2000 caracteres

### Response `202 Accepted`

```json
{
  "id": "msg_789",
  "status": "queued",
  "projectId": 10,
  "createdAt": "2026-03-18T15:30:00Z"
}
```

### Erros esperados

- `400` payload inválido
- `404` projeto não encontrado
- `422` mensagem fora da política
- `500` erro interno

---

## 5) GET `/me`

Retorna usuário autenticado da sessão atual.

### Headers

- `Authorization: Bearer <token>`

### Response `200 OK`

```json
{
  "id": "usr_123",
  "name": "Empresa ABC",
  "email": "empresa@dominio.com",
  "role": "company",
  "createdAt": "2026-03-01T10:00:00Z"
}
```

### Erros esperados

- `401` token ausente/inválido/expirado
- `403` usuário sem permissão
- `500` erro interno

---

## Matriz rápida de códigos

- `200 OK`: leitura/autenticação bem-sucedida
- `201 Created`: recurso criado
- `202 Accepted`: processamento assíncrono aceito
- `400 Bad Request`: estrutura inválida
- `401 Unauthorized`: autenticação inválida
- `403 Forbidden`: sem permissão
- `404 Not Found`: recurso inexistente
- `409 Conflict`: duplicidade
- `422 Unprocessable Entity`: regra de negócio inválida
- `429 Too Many Requests`: limite de tentativas
- `500 Internal Server Error`: falha inesperada

## Critérios de aceite do contrato (nível 5/10)

- Endpoints e payloads fechados para front e backend
- Exemplos de sucesso e erro por endpoint
- Códigos HTTP padronizados
- Regras mínimas de validação definidas
- Estrutura pronta para migração para OpenAPI/Swagger

## Checklist de aceite — Dia 1 concluído (pronto para Dia 2)

Marcar todos os itens abaixo antes de iniciar implementação do backend.

### 1) Escopo MVP

- [x] Funcionalidades que entram no MVP estão definidas
- [x] Funcionalidades fora do MVP estão definidas
- [x] Escopo não depende de funcionalidades futuras para entregar a primeira versão

### 2) Contrato de API

- [x] Endpoints do MVP estão fechados
- [x] Request e response de cada endpoint estão documentados
- [x] Códigos HTTP de sucesso e erro estão padronizados
- [x] Estrutura de erro única está definida (`error.code`, `error.message`, `error.details`, `requestId`)

### 3) Regras de negócio

- [x] Regras de validação mínimas estão documentadas
- [x] Regras de unicidade (e-mail, CNPJ) estão definidas
- [x] Regras condicionais (`projectId`, `subject`, etc.) estão definidas

### 4) Modelo de dados

- [x] Entidades principais estão mapeadas
- [x] Relacionamentos entre entidades estão definidos
- [x] Mapeamento endpoint -> entidade está explícito

### 5) Enums e consistência

- [x] Enums finais estão centralizados em uma fonte única
- [x] Convenção de versionamento de enums está definida
- [x] Front e backend conseguem usar exatamente os mesmos literais

### 6) Pronto para implementar Dia 2

- [x] Não há ambiguidade de payload para backend
- [x] Não há ambiguidade de resposta esperada para frontend
- [x] Ordem de implementação recomendada: `auth` -> `me` -> `contact/institutional` -> `contact`

Status final: **Dia 1 concluído.**
