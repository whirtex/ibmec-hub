export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const FULL_NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
export const CNPJ_REGEX = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$|^\d{14}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
export const CONTACT_SUBJECTS = ["contato", "feedback", "suporte"];

export function maskCNPJ(value) {
  const digits = (value || "").replace(/\D/g, "").slice(0, 14);

  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  }
  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

export function required(value) {
  return String(value || "").trim().length > 0;
}

export function validateContatoForm(form) {
  const errors = {};

  if (!required(form.nome)) {
    errors.nome = "Informe seu nome.";
  } else if (form.nome.trim().length < 3) {
    errors.nome = "Informe ao menos 3 caracteres no nome.";
  }

  if (!required(form.email)) {
    errors.email = "Informe um e-mail.";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Digite um e-mail válido (ex.: nome@dominio.com).";
  }

  if (!required(form.assunto)) {
    errors.assunto = "Selecione o tipo de mensagem.";
  } else if (!CONTACT_SUBJECTS.includes(form.assunto)) {
    errors.assunto = "Selecione um tipo de mensagem válido.";
  }

  if (!required(form.mensagem)) {
    errors.mensagem = "Escreva sua mensagem.";
  } else if (form.mensagem.trim().length < 10) {
    errors.mensagem = "A mensagem deve ter no mínimo 10 caracteres.";
  }

  return errors;
}

export function validateLoginForm(form) {
  const errors = {};

  if (!required(form.email)) {
    errors.email = "Informe um e-mail.";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Digite um e-mail válido (ex.: nome@dominio.com).";
  }

  if (!required(form.senha)) {
    errors.senha = "Informe sua senha.";
  }

  return errors;
}

export function validateCadastroCompanyForm(form) {
  const errors = {};

  if (!required(form.nome)) {
    errors.nome = "Informe seu nome completo.";
  } else if (
    form.nome.trim().length < 3 ||
    !FULL_NAME_REGEX.test(form.nome.trim())
  ) {
    errors.nome = "Digite nome e sobrenome, apenas letras e espaços.";
  }

  if (!required(form.email)) {
    errors.email = "Informe um e-mail.";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Digite um e-mail válido (ex.: nome@dominio.com).";
  }

  if (!required(form.cnpj)) {
    errors.cnpj = "Informe o CNPJ da empresa.";
  } else if (!CNPJ_REGEX.test(form.cnpj.trim())) {
    errors.cnpj = "Digite um CNPJ válido (com ou sem pontuação).";
  }

  if (!required(form.senha)) {
    errors.senha = "Informe uma senha.";
  } else if (!PASSWORD_REGEX.test(form.senha)) {
    errors.senha = "Mínimo 8 caracteres, com pelo menos 1 letra e 1 número.";
  }

  if (!required(form.porte)) {
    errors.porte = "Selecione o porte da empresa.";
  }

  if (!required(form.vinculo)) {
    errors.vinculo = "Selecione se há vínculo com IBMEC Hubs.";
  }

  if (!required(form.area)) {
    errors.area = "Selecione a área de atuação.";
  }

  if (!required(form.demanda)) {
    errors.demanda = "Selecione o tipo de demanda.";
  }

  return errors;
}
