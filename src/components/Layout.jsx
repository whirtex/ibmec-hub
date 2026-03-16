import Header     from "./Header";
import Footer     from "./Footer";
import LoginModal from "./LoginModal";
import { useLogin } from "../context/LoginContext";

export default function Layout({ children }) {
  const { loginOpen, openLogin, closeLogin } = useLogin();

  return (
    <>
      <Header onOpenLogin={openLogin} />
      {children}
      <Footer />
      <LoginModal open={loginOpen} onClose={closeLogin} />
    </>
  );
}
