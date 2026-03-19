import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // vai pro topo quando mudar de página; respeita prefers-reduced-motion
  useLayoutEffect(() => {
    if (!hash) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  }, [pathname, hash]);

  useLayoutEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ block: "start" });
    }
  }, [hash]);

  return null;
}
