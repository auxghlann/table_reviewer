import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import subjectsData from "../data/subjects.json";
import ErrorBoundary from "./ErrorBoundary";
import { loadReviewMaterials, createFallbackMaterial } from "../utils/contentLoader";
import "./markdown.css";

// Fallback content in case of loading errors
const FALLBACK_CONTENT = {
  introduction: "# Introduction\n\nThis is the introduction to the subject. It covers the basic concepts and principles.\n\n## Key Points\n\n- Point 1: Important concept\n- Point 2: Another crucial idea\n- Point 3: Foundational principle",
  
  coreConcepts: "# Core Concepts\n\nThis chapter covers the core concepts of the subject.\n\n## Main Theories\n\n1. Theory One: Explanation of the first theory\n2. Theory Two: Details about the second theory\n3. Theory Three: Information about the third theory",
  
  advancedTopics: "# Advanced Topics\n\nThis section delves into more complex aspects of the subject.\n\n## Complex Ideas\n\n- Advanced concept 1\n- Advanced concept 2\n- Advanced concept 3"
};

export default function ReviewerSection() {
  const { subjectId, materialId } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load subjects when component mounts
  useEffect(() => {
    setSubjects(subjectsData);
  }, []);

  // Handle URL parameters - load subject and material from URL
  useEffect(() => {
    if (subjectId) {
      const subject = subjectsData.find(s => s.id === subjectId);
      if (subject) {
        handleSubjectSelect(subject, false); // false = don't navigate
      } else {
        // Invalid subject ID, redirect to reviewer home
        navigate("/reviewer");
      }
    }
  }, [subjectId]);

  useEffect(() => {
    if (materialId && materials.length > 0) {
      const material = materials.find(m => m.id === parseInt(materialId));
      if (material) {
        handleMaterialSelect(material, false); // false = don't navigate
      }
    }
  }, [materialId, materials]);

  // Load materials for a subject
  const loadMaterials = async (subjectId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to load real materials from question data
      const realMaterials = await loadReviewMaterials(subjectId);
      
      if (realMaterials && realMaterials.length > 0) {
        setMaterials(realMaterials);
      } else {
        // Fallback to default materials if no real materials found
        let fallbackMaterials = [];
        
        // Customize fallback materials based on subject
        if (subjectId === 'softeng-2') {
          fallbackMaterials = [
            { id: 1, title: "Requirements Engineering", content: createFallbackMaterial("Requirements Engineering") },
            { id: 2, title: "System Boundaries & Context", content: createFallbackMaterial("System Boundaries & Context") },
            { id: 3, title: "UML Diagrams", content: createFallbackMaterial("UML Diagrams") }
          ];
        } else if (subjectId === 'cs-elective-3') {
          fallbackMaterials = [
            { id: 1, title: "Introduction to AI", content: createFallbackMaterial("Introduction to AI") },
            { id: 2, title: "Search Algorithms", content: createFallbackMaterial("Search Algorithms") },
            { id: 3, title: "Neural Networks", content: createFallbackMaterial("Neural Networks") }
          ];
        } else {
          // Default materials for any other subject
          fallbackMaterials = [
            { id: 1, title: "Introduction", content: FALLBACK_CONTENT.introduction },
            { id: 2, title: "Core Concepts", content: FALLBACK_CONTENT.coreConcepts },
            { id: 3, title: "Advanced Topics", content: FALLBACK_CONTENT.advancedTopics }
          ];
        }
        
        setMaterials(fallbackMaterials);
      }
    } catch (err) {
      console.error("Error loading materials:", err);
      setError("Failed to load review materials. Please try again.");
      
      // Set default materials as fallback
      setMaterials([
        { id: 1, title: "Introduction", content: FALLBACK_CONTENT.introduction },
        { id: 2, title: "Core Concepts", content: FALLBACK_CONTENT.coreConcepts },
        { id: 3, title: "Advanced Topics", content: FALLBACK_CONTENT.advancedTopics }
      ]);
    } finally {
      setIsLoading(false);
      setSidebarOpen(true);
    }
  };

  const handleSubjectSelect = (subject, shouldNavigate = true) => {
    setSelectedSubject(subject);
    setSelectedMaterial(null);
    setContent("");
    loadMaterials(subject.id);
    
    // Navigate to subject URL
    if (shouldNavigate) {
      navigate(`/reviewer/${subject.id}`);
    }
  };

  const handleMaterialSelect = (material, shouldNavigate = true) => {
    // Debugging: log selected material to verify content type
    console.log('Selecting material:', material && material.id);
    console.log('Material content (preview):', material && String(material.content).slice(0, 200));
    setSelectedMaterial(material);
    setContent(String(material.content || ''));
    
    // Navigate to material URL
    if (shouldNavigate && selectedSubject) {
      navigate(`/reviewer/${selectedSubject.id}/${material.id}`);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Study Materials</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Select a subject to review comprehensive study materials and enhance your learning.
          </p>
        </div>
      </section>

      {/* Subject Cards Section (visible when no subject is selected) */}
      {!selectedSubject && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose a Subject</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  onClick={() => handleSubjectSelect(subject)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-r ${subject.color} p-4 text-white`}>
                    <div className="flex items-center mb-2">
                      <div className="text-3xl">{subject.icon}</div>
                      <h3 className="text-xl font-bold ml-3">{subject.title.split(' ')[0]}</h3>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">
                      Review materials for {subject.title}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {subject.topics.slice(0, 2).map((topic, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                      {subject.topics.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{subject.topics.length - 2} more
                        </span>
                      )}
                    </div>
                    <button
                      className={`w-full bg-gradient-to-r ${subject.color} text-white py-2 rounded-lg text-sm font-medium hover:opacity-90`}
                    >
                      View Materials
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviewer Section with Sidebar (visible when subject is selected) */}
      {selectedSubject && (
        <div className="flex min-h-[calc(100vh-30rem)]">
          {/* Sidebar */}
          <div 
            className={`bg-white shadow-md transition-all duration-300 ${
              sidebarOpen ? 'w-80' : 'w-0 overflow-hidden'
            }`}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{selectedSubject.icon}</span>
                  <h3 className="font-semibold truncate">{selectedSubject.title}</h3>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">MATERIALS</h4>
              <ul className="space-y-2">
                {materials.map(material => (
                  <li key={material.id}>
                    <button
                      onClick={() => handleMaterialSelect(material)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedMaterial && selectedMaterial.id === material.id
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {material.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className={`flex-grow bg-gray-50 transition-all duration-300 ${sidebarOpen ? 'pl-0' : 'pl-0'}`}>
            {/* Toggle Button and Header */}
            <div className="bg-white shadow-sm p-4 flex items-center sticky top-0 z-10">
              <button 
                onClick={toggleSidebar}
                className="mr-4 p-2 rounded-md hover:bg-gray-100 text-gray-700"
              >
                {sidebarOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className="mr-4 text-gray-600 hover:text-indigo-600 transition-colors text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Subjects
                </button>
                
                {selectedMaterial && <h2 className="text-lg font-medium text-gray-800">{selectedMaterial.title}</h2>}
              </div>
            </div>
            
            {/* Rendered Markdown Content */}
            <div className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-lg font-medium text-red-800 mb-2">{error}</h3>
                  <button 
                    onClick={() => loadMaterials(selectedSubject.id)} 
                    className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium"
                  >
                    Try Again
                  </button>
                </div>
              ) : selectedMaterial ? (
                <div className="max-w-none">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <ErrorBoundary 
                      resetAction={() => setContent(selectedMaterial.content)}
                      fallbackAction={() => setContent(String(selectedMaterial.content || '').replace(/[#*_`]/g, ''))}
                      showDetails={false}
                    >
                      {/* Wrap in div with markdown class since react-markdown v10+ doesn't accept className prop */}
                      <div className="markdown">
                        <ReactMarkdown 
                          key={selectedMaterial.id}
                          remarkPlugins={[remarkGfm]}
                        >
                          {String(content || selectedMaterial.content || '')}
                        </ReactMarkdown>
                      </div>
                    </ErrorBoundary>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Select a material to start reviewing</h3>
                  <p className="text-gray-600">
                    Choose from the materials list in the sidebar to view content
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}