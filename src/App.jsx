import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import subjectsData from "./data/subjects.json";

// Lazy load all page components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
// const TakeExam = lazy(() => import("./pages/TakeExam"));
const ExamEngine = lazy(() => import("./components/ExamEngine"));
const StudyMaterials = lazy(() => import("./pages/StudyMaterials"));
const Flashcards = lazy(() => import("./pages/Flashcards"));

// Loading Component
function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-screen grid-background-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-black border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-black font-bold text-lg">Loading...</p>
      </div>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen grid-background-white">
        <div className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-black border-t-purple-500 animate-spin mx-auto mb-4"></div>
          <p className="text-black font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen grid-background-white flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-black mb-4">Login Required</h2>
          <p className="text-black font-medium mb-6">
            You need to be logged in to access this feature.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full bg-purple-500 text-white py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Go to Login
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-white text-black py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Add artificial delay for initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800); // 800ms delay

    return () => clearTimeout(timer);
  }, []);

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

  if (isInitialLoad) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            
            {/* Protected Routes - Require Login */}
            <Route path="/reviewer" element={
              <ProtectedRoute>
                <StudyMaterials />
              </ProtectedRoute>
            } />
            <Route path="/reviewer/:subjectId" element={
              <ProtectedRoute>
                <StudyMaterials />
              </ProtectedRoute>
            } />
            <Route path="/reviewer/:subjectId/:docId" element={
              <ProtectedRoute>
                <StudyMaterials />
              </ProtectedRoute>
            } />
            {/* <Route path="/exam" element={
              <ProtectedRoute>
                <TakeExam setSelectedSubject={setSelectedSubject} />
              </ProtectedRoute>
            } />
            <Route path="/exam/:subjectId" element={
              <ProtectedRoute>
                <ExamRoute />
              </ProtectedRoute>
            } /> */}
            <Route path="/flashcards" element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            } />
            <Route path="/flashcards/:subjectId" element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            } />
            <Route path="/flashcards/:subjectId/:groupId" element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            } />
            <Route path="/flashcards/:subjectId/:groupId/:cardId" element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}