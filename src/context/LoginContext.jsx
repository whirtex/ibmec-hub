import { useState } from "react";
import { LoginContext } from "./useLoginContext";

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
        openLogin: () => setLoginOpen(true),
        closeLogin: () => setLoginOpen(false),
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
