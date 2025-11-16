import React from "react";
import { useNavigate } from "react-router-dom";
import subjectsData from "../data/subjects.json";

export default function TakeExam({ setSelectedSubject }) {
  const navigate = useNavigate();
  
  // Load subjects from JSON file
  const subjects = subjectsData;

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    navigate(`/exam/${subject.id}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-purple-200 border-4 border-black";
      case "Intermediate": return "bg-purple-300 border-4 border-black";
      case "Advanced": return "bg-purple-400 border-4 border-black";
      default: return "bg-white border-4 border-black";
    }
  };

  return (
    <div className="min-h-screen grid-background-white">
      {/* Hero Section */}
      <section className="grid-background py-16 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6 text-black border-4 border-black bg-white inline-block px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Exam Platform
          </h1>
          <p className="text-xl text-black font-medium max-w-2xl mx-auto mt-8">
            Select from our available examination subjects to test your knowledge and enhance your learning.
          </p>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16 grid-background-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                {/* Card Header */}
                <div className="bg-purple-300 p-6 border-b-4 border-black">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{subject.icon}</div>
                    <span className={`px-3 py-1 text-sm font-bold ${getDifficultyColor(subject.difficulty)} text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                      {subject.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black">{subject.title}</h3>
                  <p className="text-sm font-medium text-black">{subject.description}</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Topics */}
                  <div className="mb-6">
                    <h4 className="font-bold text-black mb-3">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-black font-medium border-2 border-black text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-purple-200 border-4 border-black">
                      <div className="text-2xl font-bold text-black">{subject.questions}</div>
                      <div className="text-sm text-black font-bold">Questions</div>
                    </div>
                    <div className="text-center p-3 bg-white border-4 border-black">
                      <div className="text-lg font-bold text-black">⏱️</div>
                      <div className="text-sm text-black font-bold">{subject.duration}</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleSubjectSelect(subject)}
                    className="w-full bg-purple-500 text-white py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-purple-100 py-12 border-t-4 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-8 border-4 border-black bg-white inline-block px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Examination Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-300 p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-purple-600 mb-3">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Instant Results</h3>
                <p className="text-sm text-black font-medium">Get immediate feedback</p>
              </div>
            </div>
            <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-purple-600 mb-3">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Unlimited Attempts</h3>
                <p className="text-sm text-black font-medium">Practice as much as you need</p>
              </div>
            </div>
            <div className="bg-purple-200 p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-purple-600 mb-3">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Detailed Analytics</h3>
                <p className="text-sm text-black font-medium">Track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}