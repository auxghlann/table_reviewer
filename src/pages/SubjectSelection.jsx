import React from "react";

export default function SubjectSelection({ setCurrentPage, setSelectedSubject }) {
  const subjects = [
    {
      id: "cs-elective-3",
      title: "CS - Elective 3 (Prelims)",
      description: "Comprehensive examination covering AI fundamentals, machine learning basics, and expert systems.",
      topics: ["AI History", "Research in AI", "AI Technique", "Search Algorithms"],
      questions: 50,
      duration: "Self-paced",
      difficulty: "Intermediate",
      icon: "🤖",
      color: "from-blue-500 to-indigo-600",
      component: "elective_3_prelims"
    },
    {
      id: "social-issues",
      title: "Social Issues",
      description: "Explore contemporary social challenges, ethical considerations, and societal impacts of technology.",
      topics: ["Morality", "Law", "Moral Code", "Natural & Conventional Law"],
      questions: 50,
      duration: "Self-paced", 
      difficulty: "Beginner",
      icon: "🌍",
      color: "from-green-500 to-emerald-600",
      component: "soci_prelims"
    },
    {
      id: "ethics",
      title: "Ethics",
      description: "Fundamental principles of ethical reasoning, moral philosophy, and professional conduct standards.",
      topics: ["Moral Philosophy", "Ethics", "Conscience", "Human Acts & Acts of Man"],
      questions: 50,
      duration: "Self-paced",
      difficulty: "Intermediate", 
      icon: "⚖️",
      color: "from-purple-500 to-violet-600",
      component: "ethics_prelims"
    }
  ];

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage("exam");
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "text-green-600 bg-green-100";
      case "Intermediate": return "text-yellow-600 bg-yellow-100";
      case "Advanced": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Choose Your Subject</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Select from our available examination subjects to test your knowledge and enhance your learning.
          </p>
        </div>
      </section>

      {/* Subject Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{subject.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(subject.difficulty)} text-gray-800 bg-white bg-opacity-90`}>
                      {subject.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{subject.title}</h3>
                  <p className="text-sm opacity-90">{subject.description}</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Topics */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">{subject.questions}</div>
                      <div className="text-sm text-gray-600">Questions</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-indigo-600">⏱️</div>
                      <div className="text-sm text-gray-600">{subject.duration}</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleSubjectSelect(subject)}
                    className={`w-full bg-gradient-to-r ${subject.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 transform hover:scale-105`}
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
      <section className="bg-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Examination Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center">
              <div className="text-indigo-600 mr-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Instant Results</h3>
                <p className="text-sm text-gray-600">Get immediate feedback</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-indigo-600 mr-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Unlimited Attempts</h3>
                <p className="text-sm text-gray-600">Practice as much as you need</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-indigo-600 mr-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Detailed Analytics</h3>
                <p className="text-sm text-gray-600">Track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}