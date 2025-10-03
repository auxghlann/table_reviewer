import React, { useState, useEffect } from "react";

export default function ExamEngine({ subject, questions, setCurrentPage, setSelectedSubject }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [shuffled, setShuffled] = useState([]);

  const goBackToSubjects = () => {
    setSelectedSubject(null);
  };

  useEffect(() => {
    // Initialize with the questions provided (can add shuffling logic here if needed)
    if (questions && questions.length > 0) {
      setShuffled(questions);
    }
  }, [questions]);

  const q = shuffled[index];

  function recordAnswer(qid, value) {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  }

  function next() {
    if (index < shuffled.length - 1) setIndex(i => i + 1);
  }
  
  function prev() {
    if (index > 0) setIndex(i => i - 1);
  }

  function computeScore() {
    let s = 0;
    for (const item of shuffled) {
      const given = answers[item.id];
      if (item.type === "tf") {
        // Handle both "True"/"False" and "true"/"false" formats
        const correctAnswer = item.answer.toLowerCase();
        const userAnswer = given ? given.toLowerCase() : '';
        if (userAnswer === correctAnswer) s += 1;
      } else if (item.type === "mcq" || item.type === "smcq") {
        // Handle both string answers and numeric index answers
        if (typeof item.answer === 'number') {
          // Old format: answer is index
          if (given && item.options[item.answer] === given) s += 1;
        } else {
          // New format: answer is string
          if (given && given === item.answer) s += 1;
        }
      } else if (item.type === "iden") {
        // Identification questions
        const normalize = str => str ? str.trim().toLowerCase() : '';
        const correctAnswer = item.answer_text || item.answer;
        if (normalize(given) === normalize(correctAnswer)) s += 1;
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
    const examName = subject?.title || 'exam';
    const filename = examName.toLowerCase().replace(/\\s+/g, '_') + '_questions.json';
    
    const blob = new Blob([JSON.stringify(shuffled, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Show loading if no questions are loaded yet
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading exam questions...</div>
        </div>
      </div>
    );
  }

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
              {subject ? `${subject.title} Exam` : 'Interactive Exam'}
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

              {q?.type === "iden" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Type your answer here..."
                    value={answers[q.id] || ''}
                    onChange={(e) => recordAnswer(q.id, e.target.value)}
                  />
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
                  const correctAnswer = q.answer.toLowerCase();
                  const userAnswerLower = userAnswer ? userAnswer.toLowerCase() : '';
                  isCorrect = userAnswerLower === correctAnswer;
                  correctAnswerText = q.answer;
                  userAnswerText = userAnswer || 'No answer';
                } else if (q.type === "mcq" || q.type === "smcq") {
                  if (typeof q.answer === 'number') {
                    // Old format
                    isCorrect = userAnswer && q.options[q.answer] === userAnswer;
                    correctAnswerText = q.options[q.answer];
                  } else {
                    // New format
                    isCorrect = userAnswer === q.answer;
                    correctAnswerText = q.answer;
                  }
                  userAnswerText = userAnswer || 'No answer';
                } else if (q.type === "iden") {
                  const normalize = str => str ? str.trim().toLowerCase() : '';
                  const correctAnswer = q.answer_text || q.answer;
                  isCorrect = normalize(userAnswer) === normalize(correctAnswer);
                  correctAnswerText = correctAnswer;
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