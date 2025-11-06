import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Don't scroll if navigating within the same flashcard subject (just changing card number)
    const isFlashcardNavigation = 
      pathname.startsWith('/flashcards/') && 
      prevPathname.current.startsWith('/flashcards/') &&
      pathname.split('/')[2] === prevPathname.current.split('/')[2]; // Same subject

    if (!isFlashcardNavigation) {
      window.scrollTo(0, 0);
    }

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
