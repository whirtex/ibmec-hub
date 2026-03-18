import { createContext, useContext } from "react";

export const LoginContext = createContext(null);

export function useLoginContext() {
  const ctx = useContext(LoginContext);
  if (!ctx)
    throw new Error("useLoginContext must be used inside <LoginProvider>");
  return ctx;
}
