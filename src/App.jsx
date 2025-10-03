import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SubjectSelection from "./pages/SubjectSelection";
import ExamEngine from "./components/ExamEngine";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);

  // Load exam questions when a subject is selected
  useEffect(() => {
    if (selectedSubject && selectedSubject.questionsFile) {
      loadExamQuestions(selectedSubject.id);
    }
  }, [selectedSubject]);

  const loadExamQuestions = async (subjectId) => {
    try {
      let questionsModule;
      
      // Map subject IDs to their corresponding JSON files with explicit imports
      switch (subjectId) {
        case 'softeng-2':
          questionsModule = await import('./data/questions/softeng2_prelims.json');
          break;
        case 'cs-elective-3':
          questionsModule = await import('./data/questions/elective3_prelims.json');
          break;
        case 'social-issues':
          questionsModule = await import('./data/questions/soci_prelims.json');
          break;
        case 'ethics':
          questionsModule = await import('./data/questions/ethics_prelims.json');
          break;
        default:
          console.error('Unknown subject ID:', subjectId);
          setExamQuestions([]);
          return;
      }
      
      setExamQuestions(questionsModule.default || questionsModule);
    } catch (error) {
      console.error('Failed to load exam questions:', error);
      setExamQuestions([]);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "exam":
        if (selectedSubject) {
          return (
            <ExamEngine 
              subject={selectedSubject} 
              questions={examQuestions}
              setCurrentPage={setCurrentPage} 
              setSelectedSubject={setSelectedSubject} 
            />
          );
        } else {
          return <SubjectSelection setCurrentPage={setCurrentPage} setSelectedSubject={setSelectedSubject} />;
        }
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}