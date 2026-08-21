import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // Save scroll position on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        sessionStorage.setItem(`scroll_pos_${pathname}`, window.scrollY.toString());
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Restore scroll position on back/forward (POP) navigation, scroll to top on new page (PUSH)
  useEffect(() => {
    if (navType === "POP") {
      const savedPos = sessionStorage.getItem(`scroll_pos_${pathname}`);
      if (savedPos !== null) {
        const targetY = parseInt(savedPos, 10);
        // Double RAF to ensure DOM has rendered cards
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo(0, targetY);
          });
        });
      }
    } else if (navType === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
}