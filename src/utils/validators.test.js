import { describe, it, expect } from "vitest";
import {
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  CNPJ_REGEX,
  PASSWORD_REGEX,
  validateCadastroCompanyForm,
  validateContatoForm,
  validateLoginForm,
  validateProjectContactForm,
  maskCNPJ,
  required,
} from "./validators";

describe("Validadores de Regex e Utilitários", () => {
  describe("EMAIL_REGEX", () => {
    it("deve aceitar e-mails válidos", () => {
      expect(EMAIL_REGEX.test("user@example.com")).toBe(true);
      expect(EMAIL_REGEX.test("test.email+tag@domain.co.uk")).toBe(true);
    });

    it("deve rejeitar e-mails inválidos", () => {
      expect(EMAIL_REGEX.test("invalid.email")).toBe(false);
      expect(EMAIL_REGEX.test("@example.com")).toBe(false);
      expect(EMAIL_REGEX.test("user@")).toBe(false);
    });
  });

  describe("PASSWORD_REGEX", () => {
    it("deve aceitar senhas válidas (8+ chars, letra e número)", () => {
      expect(PASSWORD_REGEX.test("password123")).toBe(true);
      expect(PASSWORD_REGEX.test("Abc1234567")).toBe(true);
    });

    it("deve rejeitar senhas inválidas", () => {
      expect(PASSWORD_REGEX.test("short1")).toBe(false); // menos de 8 chars
      expect(PASSWORD_REGEX.test("nodigits")).toBe(false); // sem dígito
      expect(PASSWORD_REGEX.test("12345678")).toBe(false); // sem letra
    });
  });

  describe("FULL_NAME_REGEX", () => {
    it("deve aceitar nomes completos válidos", () => {
      expect(FULL_NAME_REGEX.test("João Silva")).toBe(true);
      expect(FULL_NAME_REGEX.test("Maria Santos Oliveira")).toBe(true);
    });

    it("deve rejeitar nomes inválidos", () => {
      expect(FULL_NAME_REGEX.test("João")).toBe(false); // apenas um nome
      expect(FULL_NAME_REGEX.test("João123")).toBe(false); // com números
      expect(FULL_NAME_REGEX.test("")).toBe(false); // vazio
    });
  });

  describe("CNPJ_REGEX", () => {
    it("deve aceitar CNPJs válidos", () => {
      expect(CNPJ_REGEX.test("11.222.333/0001-81")).toBe(true);
      expect(CNPJ_REGEX.test("11222333000181")).toBe(true);
    });

    it("deve rejeitar CNPJs inválidos", () => {
      expect(CNPJ_REGEX.test("12345")).toBe(false);
      expect(CNPJ_REGEX.test("")).toBe(false);
    });
  });

  describe("maskCNPJ", () => {
    it("deve fazer mascara do CNPJ progressivamente", () => {
      expect(maskCNPJ("11222")).toBe("11.222");
      expect(maskCNPJ("112223330001")).toBe("11.222.333/0001");
      expect(maskCNPJ("11222333000181")).toBe("11.222.333/0001-81");
    });
  });

  describe("required", () => {
    it("deve validar campos obrigatórios", () => {
      expect(required("João")).toBe(true);
      expect(required("")).toBe(false);
      expect(required("   ")).toBe(false); // apenas espaços
      expect(required(null)).toBe(false);
    });
  });
});

describe("validateLoginForm", () => {
  it("deve validar login correto", () => {
    const errors = validateLoginForm({
      email: "user@example.com",
      senha: "Password123",
    });
    expect(errors).toEqual({});
  });

  it("deve retornar erro de e-mail inválido", () => {
    const errors = validateLoginForm({
      email: "invalid",
      senha: "Password123",
    });
    expect(errors.email).toBe("E-mail inválido.");
  });

  it("deve retornar erro de e-mail vazio", () => {
    const errors = validateLoginForm({
      email: "",
      senha: "Password123",
    });
    expect(errors.email).toBe("Informe um e-mail.");
  });

  it("deve retornar erro de senha fraca", () => {
    const errors = validateLoginForm({
      email: "user@example.com",
      senha: "short1",
    });
    expect(errors.senha).toBe(
      "Mínimo 8 caracteres, com pelo menos 1 letra e 1 número.",
    );
  });

  it("deve retornar erro de senha vazia", () => {
    const errors = validateLoginForm({
      email: "user@example.com",
      senha: "",
    });
    expect(errors.senha).toBe("Informe sua senha.");
  });

  it("deve aceitar múltiplos erros simultaneamente", () => {
    const errors = validateLoginForm({
      email: "",
      senha: "",
    });
    expect(errors.email).toBe("Informe um e-mail.");
    expect(errors.senha).toBe("Informe sua senha.");
  });
});

describe("validateContatoForm", () => {
  it("deve validar contato correto", () => {
    const errors = validateContatoForm({
      nome: "João Silva",
      email: "joao@example.com",
      assunto: "contato",
      mensagem: "Mensagem com mais de 10 caracteres",
      site: "",
    });
    expect(errors).toEqual({});
  });

  it("deve rejeitar nome muito curto", () => {
    const errors = validateContatoForm({
      nome: "Jo",
      email: "joao@example.com",
      assunto: "contato",
      mensagem: "Mensagem com mais de 10 caracteres",
      site: "",
    });
    expect(errors.nome).toBe("Informe ao menos 3 caracteres no nome.");
  });

  it("deve rejeitar assunto inválido", () => {
    const errors = validateContatoForm({
      nome: "João Silva",
      email: "joao@example.com",
      assunto: "invalido",
      mensagem: "Mensagem com mais de 10 caracteres",
      site: "",
    });
    expect(errors.assunto).toBe("Selecione um tipo de mensagem válido.");
  });

  it("deve rejeitar mensagem muito curta", () => {
    const errors = validateContatoForm({
      nome: "João Silva",
      email: "joao@example.com",
      assunto: "contato",
      mensagem: "Curta",
      site: "",
    });
    expect(errors.mensagem).toBe(
      "A mensagem deve ter no mínimo 10 caracteres.",
    );
  });
});

describe("validateCadastroCompanyForm", () => {
  const validForm = {
    nome: "João Silva",
    email: "joao@example.com",
    cnpj: "11222333000181",
    senha: "Password123",
    porte: "PME",
    vinculo: "sim",
    area: "TI",
    demanda: "consultoria",
  };

  it("deve validar formulário de cadastro correto", () => {
    const errors = validateCadastroCompanyForm(validForm);
    expect(errors).toEqual({});
  });

  it("deve rejeitar nome inválido", () => {
    const errors = validateCadastroCompanyForm({
      ...validForm,
      nome: "João123",
    });
    expect(errors.nome).toBe(
      "Digite nome e sobrenome, apenas letras e espaços.",
    );
  });

  it("deve rejeitar CNPJ inválido", () => {
    const errors = validateCadastroCompanyForm({
      ...validForm,
      cnpj: "12345",
    });
    expect(errors.cnpj).toBe("Digite um CNPJ válido.");
  });

  it("deve rejeitar todos os campos vazios", () => {
    const errors = validateCadastroCompanyForm({
      nome: "",
      email: "",
      cnpj: "",
      senha: "",
      porte: "",
      vinculo: "",
      area: "",
      demanda: "",
    });
    expect(Object.keys(errors).length).toBeGreaterThan(0);
  });
});

describe("validateProjectContactForm", () => {
  it("deve validar contato de projeto correto", () => {
    const errors = validateProjectContactForm({
      nome: "João Silva",
      email: "joao@example.com",
      mensagem: "Estou interessado no seu projeto com mais de 10 caracteres",
    });
    expect(errors).toEqual({});
  });

  it("deve rejeitar mensagem vazia", () => {
    const errors = validateProjectContactForm({
      nome: "João Silva",
      email: "joao@example.com",
      mensagem: "",
    });
    expect(errors.mensagem).toBe("Escreva sua mensagem.");
  });
});
