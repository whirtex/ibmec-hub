const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiError extends Error {
  constructor(message, status = 500, code = "UNKNOWN_ERROR", details = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractApiError(payload, fallbackStatus = 500) {
  const errorPayload = payload?.error;

  if (errorPayload) {
    return new ApiError(
      errorPayload.message || "Ocorreu um erro na requisição.",
      fallbackStatus,
      errorPayload.code || "API_ERROR",
      errorPayload.details || [],
    );
  }

  return new ApiError(
    "Não foi possível completar a requisição.",
    fallbackStatus,
    "REQUEST_FAILED",
  );
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw extractApiError(payload, response.status);
  }

  return payload;
}

function normalizeError(error, fallbackMessage) {
  if (error instanceof ApiError) {
    return error;
  }

  return new ApiError(
    fallbackMessage,
    500,
    "UNEXPECTED_ERROR",
    error?.message ? [{ message: error.message }] : [],
  );
}

export async function login({ email, password }) {
  try {
    if (API_BASE_URL) {
      return await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    }

    await delay(900);

    if (!email || !password) {
      throw new ApiError("Preencha e-mail e senha.", 400, "VALIDATION_ERROR");
    }

    if (password.length < 8) {
      throw new ApiError(
        "A senha deve ter pelo menos 8 caracteres.",
        422,
        "VALIDATION_ERROR",
      );
    }

    if (email.includes("erro")) {
      throw new ApiError("Credenciais inválidas.", 401, "INVALID_CREDENTIALS");
    }

    return {
      accessToken: "mock_access_token",
      expiresIn: 3600,
      user: {
        id: "usr_mock_company",
        name: "Empresa Demo",
        email,
        role: "company",
      },
    };
  } catch (error) {
    throw normalizeError(error, "Falha ao realizar login.");
  }
}

export async function registerCompany(payload) {
  try {
    if (API_BASE_URL) {
      return await request("/auth/register-company", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    await delay(1000);

    if (payload.email?.includes("duplicado")) {
      throw new ApiError("E-mail já cadastrado.", 409, "EMAIL_ALREADY_EXISTS");
    }

    const normalizedCnpj = (payload.cnpj || "").replace(/\D/g, "");
    if (normalizedCnpj.endsWith("0000")) {
      throw new ApiError("CNPJ já cadastrado.", 409, "CNPJ_ALREADY_EXISTS");
    }

    return {
      id: "usr_mock_new_company",
      name: payload.name,
      email: payload.email,
      role: "company",
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    throw normalizeError(error, "Falha ao criar conta.");
  }
}

export async function sendProjectContactMessage(payload) {
  try {
    if (API_BASE_URL) {
      return await request("/contact", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    await delay(800);

    if (payload.message?.toLowerCase().includes("spam")) {
      throw new ApiError(
        "Mensagem recusada pela política de conteúdo.",
        422,
        "CONTENT_POLICY_VIOLATION",
      );
    }

    return {
      id: "msg_mock_001",
      status: "queued",
      projectId: payload.projectId,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    throw normalizeError(error, "Falha ao enviar mensagem para o projeto.");
  }
}

export async function sendInstitutionalContactMessage(payload) {
  try {
    if (API_BASE_URL) {
      return await request("/contact/institutional", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    await delay(800);

    if (payload.message?.toLowerCase().includes("spam")) {
      throw new ApiError(
        "Mensagem recusada pela política de conteúdo.",
        422,
        "CONTENT_POLICY_VIOLATION",
      );
    }

    return {
      id: "msg_mock_002",
      status: "queued",
      type: payload.type || "contato",
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    throw normalizeError(error, "Falha ao enviar mensagem institucional.");
  }
}

export async function getMe(token) {
  try {
    if (API_BASE_URL) {
      return await request("/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    await delay(250);

    if (!token) {
      throw new ApiError("Token inválido ou ausente.", 401, "UNAUTHORIZED");
    }

    return {
      id: "usr_mock_company",
      name: "Empresa Demo",
      email: "empresa@demo.com",
      role: "company",
      createdAt: "2026-03-01T10:00:00Z",
    };
  } catch (error) {
    throw normalizeError(error, "Falha ao recuperar sessão.");
  }
}

export { ApiError };
