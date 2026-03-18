import Header from "./Header";
import Footer from "./Footer";
import LoginModal from "./LoginModal";
import { useLoginContext } from "../context/useLoginContext";

export default function Layout({ children }) {
  const { loginOpen, openLogin, closeLogin } = useLoginContext();

  return (
    <>
      <Header onOpenLogin={openLogin} />
      {children}
      <Footer />
      <LoginModal open={loginOpen} onClose={closeLogin} />
    </>
  );
}
