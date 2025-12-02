import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import subjectsData from "../data/subjects.json";

/**
 * FlashcardEngine Component
 * 
 * Handles the complete flashcard learning experience with three-level navigation:
 * 1. Subject Selection - Shows all available subjects as square cards
 * 2. Group Selection - Shows flashcard sets within the selected subject
 * 3. Flashcard Viewer - Shows individual flashcards with flip animation
 * 
 * File Organization:
 * - Each subject has its own folder: /data/flashcards/{subject-id}/
 * - Each flashcard set is a separate JSON file within the subject folder
 * - Files are dynamically loaded using Vite's glob import
 */
export default function FlashcardEngine() {
  const { subjectId, groupId, cardId } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    setSubjects(subjectsData);
  }, []);

  // Handle subject selection from URL
  useEffect(() => {
    if (subjectId) {
      const subject = subjectsData.find(s => s.id === subjectId);
      if (subject) {
        setSelectedSubject(subject);
        loadGroups(subjectId);
      } else {
        navigate("/flashcards");
      }
    } else {
      // Clear all state when no subject is selected
      setSelectedSubject(null);
      setGroups([]);
      setSelectedGroup(null);
      setFlashcards([]);
      setCurrentCard(null);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [subjectId, navigate]);

  // Handle group selection from URL
  useEffect(() => {
    if (groupId && groups.length > 0) {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        setSelectedGroup(group);
        setFlashcards(group.flashcards || []);
      } else {
        navigate(`/flashcards/${subjectId}`);
      }
    } else if (!groupId) {
      setSelectedGroup(null);
      setFlashcards([]);
      setCurrentCard(null);
      setCurrentIndex(0);
    }
  }, [groupId, groups, subjectId, navigate]);

  // Handle card navigation from URL
  useEffect(() => {
    if (cardId && flashcards.length > 0) {
      const index = parseInt(cardId) - 1;
      if (index >= 0 && index < flashcards.length) {
        // Start transition
        setIsTransitioning(true);
        setIsFlipped(false);
        
        // Wait a brief moment for the flip animation to start, then update content
        setTimeout(() => {
          setCurrentIndex(index);
          setCurrentCard(flashcards[index]);
          
          // End transition after content is updated
          setTimeout(() => {
            setIsTransitioning(false);
          }, 100);
        }, 150);
      } else {
        // Invalid card ID, go back to group selection
        navigate(`/flashcards/${subjectId}/${groupId}`);
      }
    } else if (!cardId && flashcards.length > 0 && selectedGroup && groupId) {
      // Only auto-select first card when we explicitly have a groupId in URL
      // This prevents auto-navigation when browsing back
      navigate(`/flashcards/${subjectId}/${groupId}/1`, { replace: true });
    } else if (!cardId) {
      setCurrentCard(null);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [cardId, flashcards, selectedGroup, subjectId, groupId, navigate]);

  const loadGroups = async (subjectId) => {
    try {
      let flashcardFiles;
      
      // Use Vite's glob import to get all flashcard files for the subject
      switch (subjectId) {
        case 'softeng-2':
          flashcardFiles = import.meta.glob('../data/flashcards/softeng-2/*.json', { eager: true });
          break;
        case 'cs-elective-3':
          flashcardFiles = import.meta.glob('../data/flashcards/cs-elective-3/*.json', { eager: true });
          break;
        case 'social-issues':
          flashcardFiles = import.meta.glob('../data/flashcards/social-issues/*.json', { eager: true });
          break;
        case 'ethics':
          flashcardFiles = import.meta.glob('../data/flashcards/ethics/*.json', { eager: true });
          break;
        default:
          console.error('Unknown subject ID:', subjectId);
          setGroups([]);
          return;
      }
      
      // Convert the files object to an array of groups
      const groupsArray = Object.values(flashcardFiles).map(module => {
        const data = module.default || module;
        return {
          ...data,
          cardCount: data.flashcards?.length || 0
        };
      });
      
      setGroups(groupsArray);
    } catch (error) {
      console.error('Error loading flashcard groups:', error);
      setGroups([]);
    }
  };

  const handleSubjectSelect = (subject) => {
    navigate(`/flashcards/${subject.id}`);
  };

  const handleGroupSelect = (group) => {
    navigate(`/flashcards/${subjectId}/${group.id}`);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      const newIndex = currentIndex + 1;
      navigate(`/flashcards/${subjectId}/${groupId}/${newIndex + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      const newIndex = currentIndex - 1;
      navigate(`/flashcards/${subjectId}/${groupId}/${newIndex + 1}`);
    }
  };

  const handleBackToGroups = () => {
    setIsFlipped(false);
    setCurrentCard(null);
    setCurrentIndex(0);
    navigate(`/flashcards/${subjectId}`);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setGroups([]);
    setSelectedGroup(null);
    setFlashcards([]);
    setCurrentCard(null);
    setCurrentIndex(0);
    setIsFlipped(false);
    navigate('/flashcards');
  };

  // Touch handlers for swipe navigation
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  return (
    <>
      {/* Subject Selection (when no subject selected) */}
      {!subjectId && (
        <section className="py-8 md:py-16 grid-background-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 inline-block border-b-4 border-black pb-2">
                Choose a Subject
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer group aspect-square flex flex-col"
                  onClick={() => handleSubjectSelect(subject)}
                >
                  {/* SVG Logo Area - Takes up most of the card */}
                  <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-gradient-to-br from-purple-50 to-white overflow-hidden">
                    <img 
                      src={subject.svgIcon} 
                      alt={subject.title}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  {/* Title Area at Bottom - Fixed height */}
                  <div className="bg-gradient-to-r from-purple-600 to-purple-500 border-t-4 border-black p-3 md:p-4 flex-shrink-0">
                    <h3 className="text-xs md:text-sm lg:text-base font-bold text-white text-center leading-tight">
                      {subject.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Group/Set Selection (when subject is selected but no group selected) */}
      {subjectId && !groupId && selectedSubject && (
        <section className="py-8 md:py-16 grid-background-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={handleBackToSubjects}
                className="bg-white text-black px-3 py-2 md:px-4 md:py-2 text-sm font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Subjects
              </button>
              <div className="flex items-center gap-2 md:gap-3">
                <img 
                  src={selectedSubject.svgIcon} 
                  alt={selectedSubject.title}
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
                <h2 className="text-xl md:text-2xl font-bold text-black">{selectedSubject.title}</h2>
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-black mb-2 inline-block border-b-4 border-black pb-2">
                Choose a Flashcard Set
              </h3>
              <p className="text-sm md:text-base text-black font-medium mt-3">
                Select a set to start studying
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer group"
                  onClick={() => handleGroupSelect(group)}
                >
                  <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 md:p-8">
                    <h4 className="text-lg md:text-xl font-bold text-white mb-2">
                      {group.title}
                    </h4>
                    <p className="text-sm text-white opacity-90 font-medium">
                      {group.cardCount} {group.cardCount === 1 ? 'card' : 'cards'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Flashcard Viewer (when group is selected) */}
      {subjectId && groupId && cardId && currentCard && (
        <section className="py-8 md:py-16 grid-background-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={handleBackToGroups}
                className="bg-white text-black px-3 py-2 md:px-4 md:py-2 text-sm font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Sets
              </button>
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <span className="text-xl md:text-2xl">{selectedGroup.icon}</span>
                <h2 className="text-lg md:text-xl font-bold text-black">{selectedGroup.title}</h2>
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
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
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

            {/* Navigation Buttons - Hidden on mobile */}
            <div className="hidden md:flex items-center justify-center gap-4">
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

            {/* Swipe instruction for mobile */}
            <div className="md:hidden text-center">
              <p className="text-sm text-gray-600 font-medium">
                Swipe left or right to navigate
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
