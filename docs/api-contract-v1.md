# Contrato mínimo de API (v1)

Este documento define o contrato base para integração do front-end com backend.
Escopo: autenticação, cadastro de empresa, contato e recuperação de sessão.

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

## 3) POST `/contact`

Envia mensagem de contato para equipe de um projeto.

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

## 4) GET `/me`

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
