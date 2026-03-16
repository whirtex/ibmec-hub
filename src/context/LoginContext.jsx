import { createContext, useContext, useState } from "react";

const LoginContext = createContext(null);

/**
 * Provê o estado do modal de login para toda a árvore de componentes,
 * eliminando a necessidade de prop drilling (onOpenLogin, loginOpen).
 */
export function LoginProvider({ children }) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        loginOpen,
        openLogin:  () => setLoginOpen(true),
        closeLogin: () => setLoginOpen(false),
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

/** Hook de conveniência — lança erro se usado fora do LoginProvider. */
export function useLogin() {
  const ctx = useContext(LoginContext);
  if (!ctx) throw new Error("useLogin must be used inside <LoginProvider>");
  return ctx;
}
