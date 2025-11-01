import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ExamEngine({ subject, questions, setSelectedSubject }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [shuffled, setShuffled] = useState([]);

  const goBackToSubjects = () => {
    setSelectedSubject(null);
    navigate("/exam");
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
      <div className="min-h-screen grid-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading exam questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid-background-white p-6 flex items-start justify-center">
      <div className="w-full max-w-3xl bg-purple-100 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6">
        <header className="mb-6">
          {/* Back Button and Subject Info */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={goBackToSubjects}
              className="flex items-center px-4 py-2 bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Subjects
            </button>
          </div>
          
          {/* Subject Header */}
          {subject && (
            <div className="bg-purple-300 p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{subject.icon}</span>
                <div>
                  <h1 className="text-xl font-bold text-black">{subject.title}</h1>
                  <p className="text-sm text-black font-medium">{subject.description}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-lg font-bold text-black border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {subject ? `${subject.title} Exam` : 'Interactive Exam'}
            </h2>
            <div className="flex gap-2">
              <button onClick={downloadJSON} className="px-4 py-2 bg-purple-500 text-white font-bold border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-sm">
                Download JSON
              </button>
              <button onClick={restart} className="px-4 py-2 bg-white text-black font-bold border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-sm">
                Restart
              </button>
            </div>
          </div>
        </header>

        {!showResult ? (
          <div className="flex flex-col">
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
              <div className="text-sm text-black font-bold mb-4 bg-purple-200 inline-block px-3 py-1 border-2 border-black">
                Question {index + 1} of {shuffled.length}
              </div>
              <h2 className="text-lg font-bold mb-4 text-black">{q?.question}</h2>

              {q?.type === "tf" && (
                <div className="space-y-3">
                  {["True", "False"].map(opt => (
                    <label key={opt} className="flex items-start space-x-3 cursor-pointer hover:bg-purple-100 p-3 border-4 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={(e) => recordAnswer(q.id, e.target.value)}
                        className="mt-0.5 w-5 h-5"
                      />
                      <span className="text-sm text-black font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {(q?.type === "mcq" || q?.type === "smcq") && (
                <div className="space-y-3">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-start space-x-3 cursor-pointer hover:bg-purple-100 p-3 border-4 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={(e) => recordAnswer(q.id, e.target.value)}
                        className="mt-0.5 w-5 h-5"
                      />
                      <span className="text-sm text-black font-medium">{String.fromCharCode(65 + i)}. {opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {q?.type === "iden" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none bg-white font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="Type your answer here..."
                    value={answers[q.id] || ''}
                    onChange={(e) => recordAnswer(q.id, e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 gap-4 flex-wrap">
              <button 
                onClick={prev} 
                disabled={index === 0}
                className="px-4 py-2 bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Previous
              </button>
              
              <div className="text-sm text-black font-bold bg-purple-200 px-4 py-2 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {Object.keys(answers).length} of {shuffled.length} answered
              </div>
              
              {index === shuffled.length - 1 ? (
                <button 
                  onClick={computeScore}
                  className="px-4 py-2 bg-purple-500 text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  Submit
                </button>
              ) : (
                <button 
                  onClick={next}
                  className="px-4 py-2 bg-purple-400 text-black font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
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
            <h2 className="text-2xl font-bold mb-4 text-black border-4 border-black bg-white inline-block px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Exam Complete!
            </h2>
            <div className="text-lg mb-6 text-black font-bold">
              Your Score: <span className="text-purple-600 bg-purple-200 px-3 py-1 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{score}/{shuffled.length}</span>
              <span className="text-black ml-2">({Math.round((score / shuffled.length) * 100)}%)</span>
            </div>
            
            {/* Score breakdown */}
            <div className="max-w-md mx-auto mb-6">
              <div className="bg-white border-4 border-black h-6 mb-4">
                <div 
                  className="bg-purple-500 h-full transition-all duration-500 border-r-4 border-black" 
                  style={{ width: `${(score / shuffled.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm font-bold grid grid-cols-3 gap-2">
                <div className="bg-purple-200 border-4 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Correct: {score}</div>
                <div className="bg-white border-4 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Wrong: {shuffled.length - score}</div>
                <div className="bg-purple-300 border-4 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Total: {shuffled.length}</div>
              </div>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={() => setShowReview(!showReview)} className="px-6 py-2 bg-purple-400 text-black font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                {showReview ? 'Hide' : 'Review'} Answers
              </button>
              <button onClick={restart} className="px-6 py-2 bg-purple-500 text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                Try Again
              </button>
              <button onClick={goBackToSubjects} className="px-6 py-2 bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                Back to Subjects
              </button>
            </div>
          </div>
        )}

        {/* Answer Review Section */}
        {showReview && showResult && (
          <div className="mt-6 border-t-4 border-black pt-6">
            <h3 className="text-xl font-bold mb-4 text-black border-4 border-black bg-white inline-block px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Answer Review
            </h3>
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
                  <div key={q.id} className={`p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isCorrect ? 'bg-purple-200' : 'bg-white'}`}>
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                      <span className="text-sm font-bold text-black bg-white px-3 py-1 border-2 border-black">Question {idx + 1}</span>
                      <span className={`text-sm px-3 py-1 font-bold border-2 border-black ${isCorrect ? 'bg-purple-300 text-black' : 'bg-white text-black'}`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="text-black font-medium mb-3">{q.question}</p>
                    <div className="grid gap-2 text-sm font-medium">
                      <div className="bg-white p-2 border-2 border-black"><strong>Your Answer:</strong> <span className={isCorrect ? 'text-purple-600' : 'text-black'}>{userAnswerText}</span></div>
                      <div className="bg-purple-100 p-2 border-2 border-black"><strong>Correct Answer:</strong> <span className="text-black">{correctAnswerText}</span></div>
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