import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SubjectSelection from "./pages/SubjectSelection";
import ExamEngine from "./components/ExamEngine";
import ReviewerSection from "./components/ReviewerSection";
import subjectsData from "./data/subjects.json";

function ExamRoute() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (subjectId) {
      // Find the subject from the subjectsData
      const foundSubject = subjectsData.find(s => s.id === subjectId);
      if (foundSubject) {
        setSubject(foundSubject);
        loadExamQuestions(subjectId);
      } else {
        // Invalid subject ID, redirect to subject selection
        navigate("/exam");
      }
    }
  }, [subjectId, navigate]);

  const loadExamQuestions = async (subjectId) => {
    try {
      let questionsModule;
      
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
          setQuestions([]);
          return;
      }
      
      setQuestions(questionsModule.default || questionsModule);
    } catch (error) {
      console.error('Failed to load exam questions:', error);
      setQuestions([]);
    }
  };

  if (!subject || questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <ExamEngine 
      subject={subject} 
      questions={questions}
      setSelectedSubject={setSubject} 
    />
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviewer" element={<ReviewerSection />} />
          <Route path="/reviewer/:subjectId" element={<ReviewerSection />} />
          <Route path="/reviewer/:subjectId/:materialId" element={<ReviewerSection />} />
          <Route path="/exam" element={<SubjectSelection setSelectedSubject={setSelectedSubject} />} />
          <Route path="/exam/:subjectId" element={<ExamRoute />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}