import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjects.json";

export default function Flashcards() {
  const { subjectId, cardId } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSubjects(subjectsData);
  }, []);

  // Handle subject selection from URL
  useEffect(() => {
    if (subjectId) {
      const subject = subjectsData.find(s => s.id === subjectId);
      if (subject) {
        setSelectedSubject(subject);
        loadFlashcards(subjectId);
      } else {
        navigate("/flashcards");
      }
    } else {
      setSelectedSubject(null);
      setFlashcards([]);
      setCurrentCard(null);
    }
  }, [subjectId, navigate]);

  // Handle card navigation from URL
  useEffect(() => {
    if (cardId && flashcards.length > 0) {
      const index = parseInt(cardId) - 1;
      if (index >= 0 && index < flashcards.length) {
        setCurrentIndex(index);
        setCurrentCard(flashcards[index]);
        setIsFlipped(false);
      }
    } else if (flashcards.length > 0 && !cardId && selectedSubject) {
      // Auto-select first card
      navigate(`/flashcards/${subjectId}/1`);
    }
  }, [cardId, flashcards, selectedSubject, subjectId, navigate]);

  const loadFlashcards = async (subjectId) => {
    try {
      let flashcardsModule;
      
      switch (subjectId) {
        case 'softeng-2':
          flashcardsModule = await import('../data/flashcards/softeng2_flashcards.json');
          break;
        case 'cs-elective-3':
          flashcardsModule = await import('../data/flashcards/elective3_flashcards.json');
          break;
        case 'social-issues':
          flashcardsModule = await import('../data/flashcards/soci_flashcards.json');
          break;
        case 'ethics':
          flashcardsModule = await import('../data/flashcards/ethics_flashcards.json');
          break;
        default:
          console.error('Unknown subject ID:', subjectId);
          setFlashcards([]);
          return;
      }
      
      const data = flashcardsModule.default || flashcardsModule;
      setFlashcards(data.flashcards || []);
    } catch (error) {
      console.error('Error loading flashcards:', error);
      setFlashcards([]);
    }
  };

  const handleSubjectSelect = (subject) => {
    navigate(`/flashcards/${subject.id}`);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      const newIndex = currentIndex + 1;
      navigate(`/flashcards/${subjectId}/${newIndex + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      navigate(`/flashcards/${subjectId}/${newIndex + 1}`);
    }
  };

  const handleBackToSubjects = () => {
    navigate('/flashcards');
  };

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

      {/* Subject Selection (when no subject selected) */}
      {!selectedSubject && (
        <section className="py-16 grid-background-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 inline-block border-b-4 border-black pb-2">
                Choose a Subject
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden cursor-pointer"
                  onClick={() => handleSubjectSelect(subject)}
                >
                  <div className="bg-purple-200 border-b-4 border-black p-4 flex items-center">
                    <span className="text-4xl mr-4">{subject.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-black">{subject.title}</h3>
                      <p className="text-sm text-black font-medium">{subject.code}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-black font-medium mb-4">{subject.description}</p>
                    <button className="w-full bg-purple-500 text-white py-2 text-sm font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                      Study Flashcards
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Flashcard Viewer (when subject is selected) */}
      {selectedSubject && currentCard && (
        <section className="py-16 grid-background-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={handleBackToSubjects}
                className="bg-white text-black px-4 py-2 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Subjects
              </button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedSubject.icon}</span>
                <h2 className="text-xl md:text-2xl font-bold text-black">{selectedSubject.title}</h2>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6 text-center">
              <p className="text-lg font-bold text-black">
                Card {currentIndex + 1} of {flashcards.length}
              </p>
              <div className="w-full bg-white border-4 border-black h-4 mt-2">
                <div
                  className="bg-purple-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Flashcard */}
            <div
              className="relative h-96 cursor-pointer mb-8 perspective-1000"
              onClick={handleCardClick}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden">
                  <div className="w-full h-full bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center justify-center">
                    <p className="text-sm font-bold text-purple-600 mb-4">QUESTION</p>
                    <p className="text-xl md:text-2xl font-bold text-black text-center">{currentCard.front}</p>
                    <p className="text-sm text-gray-600 mt-6 font-medium">Click to reveal answer</p>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                  <div className="w-full h-full bg-purple-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center justify-center">
                    <p className="text-sm font-bold text-white mb-4">ANSWER</p>
                    <p className="text-lg md:text-xl font-bold text-black text-center">{currentCard.back}</p>
                    <p className="text-sm text-gray-800 mt-6 font-medium">Click to see question</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 ${
                  currentIndex === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
                className={`px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 ${
                  currentIndex === flashcards.length - 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                }`}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
