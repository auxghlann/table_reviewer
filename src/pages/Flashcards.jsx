import React from "react";
import FlashcardEngine from "../components/FlashcardEngine";

/**
 * Flashcards Page Component
 * 
 * Displays the flashcard learning interface with hero section and FlashcardEngine.
 */
export default function Flashcards() {

  return (
    <div className="min-h-screen grid-background">
      {/* Hero Section */}
      <section className="grid-background py-8 md:py-16 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black border-4 border-black bg-white inline-block px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Flashcards
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-bold text-black mt-4 md:mt-8">
            Study with interactive flashcards to reinforce your learning.
          </p>
        </div>
      </section>

      {/* Flashcard Engine */}
      <FlashcardEngine />
    </div>
  );
}
