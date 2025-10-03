// softeng2_prelims.jsx
// Single-file React exam app for Soft Eng 2 (Prelim)
// - 50 questions (10 True/False, 30 MCQ, 10 Situational MCQ)
// - Download JSON, scoring, restart

import React, { useState, useEffect } from "react";

const QUESTIONS = [
  // --- True / False (10)
  { id: 1, type: "tf", question: "A 'system boundary' separates elements that belong to the system from the external environment.", answer: "True" },
  { id: 2, type: "tf", question: "Context boundary is used to include irrelevant external data for completeness.", answer: "False" },
  { id: 3, type: "tf", question: "Functional requirements define what the system should do.", answer: "True" },
  { id: 4, type: "tf", question: "A constraint restricts the solution space beyond functional and quality requirements.", answer: "True" },
  { id: 5, type: "tf", question: "ISO/IEC 25010's Product Quality model includes Maintainability and Portability.", answer: "True" },
  { id: 6, type: "tf", question: "Data Flow Diagrams (DFDs) are implementation-dependent diagrams.", answer: "False" },
  { id: 7, type: "tf", question: "Referential integrity prevents deleting a referenced primary key if dependent rows exist.", answer: "True" },
  { id: 8, type: "tf", question: "TRUNCATE removes table structure as well as its rows.", answer: "False" },
  { id: 9, type: "tf", question: "Use Case Diagrams are best for capturing non-functional requirements like performance.", answer: "False" },
  { id: 10, type: "tf", question: "Requirements validation ensures requirements are correct, complete, consistent, and relevant.", answer: "True" },

  // --- Multiple Choice (30)
  { id: 11, type: "mcq", question: "Which activity of Requirements Engineering focuses on gathering and refining stakeholder needs?", options: ["Elicitation","Documentation","Validation & Negotiation","Management"], answer: "Elicitation" },
  { id: 12, type: "mcq", question: "Which ISO/IEC 25010 characteristic concerns 'Response time' and 'Throughput'?", options: ["Usability","Performance efficiency","Reliability","Security"], answer: "Performance efficiency" },
  { id: 13, type: "mcq", question: "Which of the following is NOT a reliability sub-characteristic in ISO/IEC 25010?", options: ["Maturity","Availability","Portability","Fault tolerance"], answer: "Portability" },
  { id: 14, type: "mcq", question: "Which diagram models data movement between processes, stores, and external entities?", options: ["ERD","Use Case Diagram","DFD","Activity Diagram"], answer: "DFD" },
  { id: 15, type: "mcq", question: "In an ERD, a many-to-many relationship between two entities is typically resolved using:", options: ["Aggregation","A join table (associative entity)","Inheritance","A single combined entity"], answer: "A join table (associative entity)" },
  { id: 16, type: "mcq", question: "Which SQL command removes all rows but keeps the table structure?", options: ["DELETE","DROP","TRUNCATE","ALTER"], answer: "TRUNCATE" },
  { id: 17, type: "mcq", question: "Which SQL category does GRANT belong to?", options: ["DDL","DML","DCL","DQL"], answer: "DCL" },
  { id: 18, type: "mcq", question: "Which quality characteristic refers to 'ease of learning' and 'operability'?", options: ["Usability","Maintainability","Portability","Security"], answer: "Usability" },
  { id: 19, type: "mcq", question: "Traceability in requirements management primarily helps to:", options: ["Prevent unauthorized access","Link requirements to design and tests","Ensure UI aesthetics","Guarantee performance"], answer: "Link requirements to design and tests" },
  { id: 20, type: "mcq", question: "Which element in a Use Case Diagram represents an external actor?", options: ["Ellipse","Stick figure","Rectangle box","Diamond"], answer: "Stick figure" },
  { id: 21, type: "mcq", question: "Which sub-characteristic describes a system's ability to be moved to different environments?", options: ["Recoverability","Installability","Adaptability","Portability"], answer: "Portability" },
  { id: 22, type: "mcq", question: "Which testing-related sub-characteristic in ISO 25010 helps find errors easily?", options: ["Testability","Reusability","Installability","Authenticity"], answer: "Testability" },
  { id: 23, type: "mcq", question: "Which requirement type specifies non-functional behavior like 'handle 500 concurrent users'?", options: ["Functional requirement","Quality requirement","Constraint","Use case"], answer: "Quality requirement" },
  { id: 24, type: "mcq", question: "What does 'non-repudiation' ensure in Security?", options: ["Faster response time","Users cannot deny having performed an action","System recovers after crash","UI is accessible"], answer: "Users cannot deny having performed an action" },
  { id: 25, type: "mcq", question: "Which UML diagram shows classes, attributes, and operations in a static view?", options: ["Activity Diagram","Class Diagram","Use Case Diagram","Sequence Diagram"], answer: "Class Diagram" },
  { id: 26, type: "mcq", question: "Which SQL command changes table structure (e.g., rename a column)?", options: ["INSERT","ALTER","UPDATE","SELECT"], answer: "ALTER" },
  { id: 27, type: "mcq", question: "Which of these is a PRIMARY KEY property in a relational table?", options: ["May contain duplicates","Must be NULL","Unique and not null","Only textual"], answer: "Unique and not null" },
  { id: 28, type: "mcq", question: "In Requirements Negotiation, the preferred outcome is:", options: ["Stakeholder compromise documented","Ignoring minority stakeholders","Immediate full consensus with no record","Delivering without agreement"], answer: "Stakeholder compromise documented" },
  { id: 29, type: "mcq", question: "Which diagram is most useful to model parallelism in workflows?", options: ["ERD","Activity Diagram","Use Case Diagram","Class Diagram"], answer: "Activity Diagram" },
  { id: 30, type: "mcq", question: "Which ISO characteristic ensures actions can be traced back to the responsible entity?", options: ["Accountability","Accessibility","Recoverability","Learnability"], answer: "Accountability" },
  { id: 31, type: "mcq", question: "A 'context boundary' should EXCLUDE which of the following if it's irrelevant to system goals?", options: ["External tax rules that affect system outputs","Local bus timetables if unrelated","Mandatory compliance rules","Existing integrated systems"], answer: "Local bus timetables if unrelated" },
  { id: 32, type: "mcq", question: "Which practice helps reduce validation blind spots in system boundary definition?", options: ["Ignoring external stakeholders","Context identification and stakeholder analysis","Removing test cases","Avoiding prototyping"], answer: "Context identification and stakeholder analysis" },
  { id: 33, type: "mcq", question: "Which of these is a KEY reason to produce prototypes during requirements validation?", options: ["To finalize database engine","To validate stakeholders' expectations","To avoid documenting requirements","To delay negotiation"], answer: "To validate stakeholders' expectations" },
  { id: 34, type: "mcq", question: "Which database constraint restricts a column to a specific set or range of values?", options: ["PRIMARY KEY","NOT NULL","CHECK","UNIQUE"], answer: "CHECK" },
  { id: 35, type: "mcq", question: "Which modeling artifact best captures data requirements (entities and attributes)?", options: ["ERD","Use Case Diagram","Activity Diagram","Sequence Diagram"], answer: "ERD" },
  { id: 36, type: "mcq", question: "Which of these is an INTERFACE example between systems?", options: ["Airline reservation system <-> airport baggage system","Internal variable name","Private function","Local text file"], answer: "Airline reservation system <-> airport baggage system" },
  { id: 37, type: "mcq", question: "Which is an example of a 'constraint' in requirements?", options: ["Must support monthly payroll","Must run on Windows Server 2019","Must have a login screen","Must send email"], answer: "Must run on Windows Server 2019" },
  { id: 38, type: "mcq", question: "Which ISO 25010 sub-characteristic helps users with disabilities use the system?", options: ["Accessibility","Adaptability","Resource utilization","Maturity"], answer: "Accessibility" },
  { id: 39, type: "mcq", question: "Which DFD element represents a repository of stored data?", options: ["Circle (Process)","Arrow (Data Flow)","Parallel lines or cylinder (Data Store)","Rectangle (External Entity)"], answer: "Parallel lines or cylinder (Data Store)" },
  { id: 40, type: "mcq", question: "Which of the following is an outcome of good requirements management?", options: ["Traceability between requirements and tests","Removal of all stakeholders","Infinite scope increase","No documentation"], answer: "Traceability between requirements and tests" },

  // --- Situational Multiple Choice (10)
  { id: 41, type: "smcq", question: "During elicitation, a stakeholder insists on an external data source that violates privacy regulations. The best immediate action is to:", options: ["Ignore the regulation and implement the source","Document the stakeholder need and flag the regulatory conflict for negotiation","Remove the stakeholder requirement without discussion","Assume future law changes will allow it"], answer: "Document the stakeholder need and flag the regulatory conflict for negotiation" },
  { id: 42, type: "smcq", question: "You find two requirements that contradict each other (one requires minimal UI, another requires extensive dashboards). What should you do first?", options: ["Implement both and see which works","Perform conflict analysis and negotiate with stakeholders","Delete one requirement","Defer to the development team's preference"], answer: "Perform conflict analysis and negotiate with stakeholders" },
  { id: 43, type: "smcq", question: "A system must handle 10,000 concurrent users during peak. Which requirement category is this?", options: ["Functional requirement","Quality requirement (performance)","Constraint","Use case"], answer: "Quality requirement (performance)" },
  { id: 44, type: "smcq", question: "A developer wants to drop referential integrity checks to speed up imports. What is the likely risk?", options: ["Improved data quality","Loss of referential integrity and orphaned rows","Better normalization","Faster query planning"], answer: "Loss of referential integrity and orphaned rows" },
  { id: 45, type: "smcq", question: "During validation, user tests show the workflow is confusing. The recommended next step is to:", options: ["Ignore user feedback","Prototype an improved workflow and revalidate","Replace users with developers","Add more features immediately"], answer: "Prototype an improved workflow and revalidate" },
  { id: 46, type: "smcq", question: "An external system changes its API contract mid-development causing integration failures. You should:", options: ["Blame the external team publicly","Update the interface specification and negotiate a migration plan","Remove the integration","Hardcode workarounds without documentation"], answer: "Update the interface specification and negotiate a migration plan" },
  { id: 47, type: "smcq", question: "A requirement says 'system shall be secure.' The best way to make it testable is to:", options: ["Leave it as is","Refine it into measurable security controls (e.g., authentication, encryption)","Make it a constraint","Mark it low priority"], answer: "Refine it into measurable security controls (e.g., authentication, encryption)" },
  { id: 48, type: "smcq", question: "During negotiation, stakeholders cannot agree on scheduling. A pragmatic compromise is to:", options: ["Cancel the project","Define a minimum viable set of features and a phased delivery plan","Pick one stakeholder's date at random","Delay all work indefinitely"], answer: "Define a minimum viable set of features and a phased delivery plan" },
  { id: 49, type: "smcq", question: "An analyst identifies an irrelevant external factor during context identification (e.g., local bus schedule). They should:", options: ["Document it as irrelevant context and exclude it from scope","Remove all documentation","Make it an active requirement","Informally ignore it"], answer: "Document it as irrelevant context and exclude it from scope" },
  { id: 50, type: "smcq", question: "A requirement prototype reveals a missing mandatory legal rule (e.g., tax law). The correct action is to:", options: ["Proceed without it","Update the requirement context to include the legal rule and validate with stakeholders","Ignore legal rules until later","Assume users will comply manually"], answer: "Update the requirement context to include the legal rule and validate with stakeholders" }
];

function ExamApp({ subject, setCurrentPage, setSelectedSubject }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [shuffled, setShuffled] = useState(QUESTIONS);

  useEffect(() => {
    // keep stable order; shuffle if you want by uncommenting:
    setShuffled(QUESTIONS);
  }, []);

  const q = shuffled[index];

  function recordAnswer(qid, value) {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  }

  function next() { if (index < shuffled.length - 1) setIndex(i=>i+1); }
  function prev() { if (index > 0) setIndex(i=>i-1); }

  function computeScore() {
    let s = 0;
    for (const item of shuffled) {
      const given = answers[item.id];
      if (item.type === "tf") {
        if (given && given === item.answer) s += 1;
      } else if (item.type === "mcq" || item.type === "smcq") {
        if (given && given === item.answer) s += 1;
      }
    }
    setScore(s);
    setShowResult(true);
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setShowResult(false);
    setScore(0);
    setShowReview(false);
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(shuffled, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "softeng2_prelim_questions.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const goBackToSubjects = () => {
    setSelectedSubject && setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6">
        <header className="mb-6">
          {/* Back Button and Subject Info */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={goBackToSubjects}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Subjects
            </button>
          </div>
          
          {/* Subject Header */}
          {subject && (
            <div className={`bg-gradient-to-r ${subject.color} p-4 rounded-lg text-white mb-4`}>
              <div className="flex items-center">
                <span className="text-2xl mr-3">{subject.icon}</span>
                <div>
                  <h1 className="text-xl font-bold">{subject.title}</h1>
                  <p className="text-sm opacity-90">{subject.description}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {subject ? `${subject.title} Exam` : 'Soft Eng 2 — Prelim Exam'}
            </h2>
            <div className="flex gap-2">
              <button onClick={downloadJSON} className="px-3 py-1 bg-indigo-500 text-white rounded text-sm">Download JSON</button>
              <button onClick={restart} className="px-3 py-1 bg-gray-200 rounded text-sm">Restart</button>
            </div>
          </div>
        </header>

        {!showResult ? (
          <div className="flex flex-col">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-500 mb-4">Question {index + 1} of {shuffled.length}</div>
              <h2 className="text-lg font-medium mb-4 text-gray-800">{q?.question}</h2>

              {q?.type === "tf" && (
                <div className="space-y-3">
                  {["True", "False"].map(opt => (
                    <label key={opt} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={(e) => recordAnswer(q.id, e.target.value)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {(q?.type === "mcq" || q?.type === "smcq") && (
                <div className="space-y-3">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={(e) => recordAnswer(q.id, e.target.value)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-gray-700">{String.fromCharCode(65 + i)}. {opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <button 
                onClick={prev} 
                disabled={index === 0}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
              
              <div className="text-sm text-gray-500">
                {Object.keys(answers).length} of {shuffled.length} answered
              </div>
              
              {index === shuffled.length - 1 ? (
                <button 
                  onClick={computeScore}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Submit
                </button>
              ) : (
                <button 
                  onClick={next}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">
              {score / shuffled.length >= 0.8 ? "🎉" : score / shuffled.length >= 0.6 ? "👍" : "📚"}
            </div>
            <h2 className="text-2xl font-bold mb-2">Exam Complete!</h2>
            <div className="text-lg mb-6">
              Your Score: <span className="font-bold text-indigo-600">{score}/{shuffled.length}</span>
              <span className="text-gray-500 ml-2">({Math.round((score / shuffled.length) * 100)}%)</span>
            </div>
            
            {/* Score breakdown */}
            <div className="max-w-md mx-auto mb-6">
              <div className="bg-gray-100 rounded-full h-3 mb-2">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${(score / shuffled.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 grid grid-cols-3 gap-2">
                <div className="text-green-600">Correct: {score}</div>
                <div className="text-red-600">Wrong: {shuffled.length - score}</div>
                <div className="text-gray-500">Total: {shuffled.length}</div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowReview(!showReview)} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                {showReview ? 'Hide' : 'Review'} Answers
              </button>
              <button onClick={restart} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                Try Again
              </button>
              <button onClick={goBackToSubjects} className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                Back to Subjects
              </button>
            </div>
          </div>
        )}

        {/* Answer Review Section */}
        {showReview && showResult && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Answer Review</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {shuffled.map((q, idx) => {
                const userAnswer = answers[q.id];
                let isCorrect = false;
                let correctAnswerText = '';
                let userAnswerText = '';
                
                if (q.type === "tf") {
                  isCorrect = userAnswer === q.answer;
                  correctAnswerText = q.answer;
                  userAnswerText = userAnswer || 'No answer';
                } else if (q.type === "mcq" || q.type === "smcq") {
                  isCorrect = userAnswer === q.answer;
                  correctAnswerText = q.answer;
                  userAnswerText = userAnswer || 'No answer';
                }
                
                return (
                  <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Question {idx + 1}</span>
                      <span className={`text-sm px-2 py-1 rounded ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-3">{q.question}</p>
                    <div className="grid gap-2 text-sm">
                      <div><strong>Your Answer:</strong> <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{userAnswerText}</span></div>
                      <div><strong>Correct Answer:</strong> <span className="text-green-600">{correctAnswerText}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamApp;
