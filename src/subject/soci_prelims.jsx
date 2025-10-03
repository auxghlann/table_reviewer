// SOCI Prelim Exam — Single-file React app
// Embedded questions JSON (50 items) + scoring + download
import React, { useState, useEffect } from 'react';

const questions = [
  // True/False (10)
  { id: 1, type: 'tf', q: 'Morality refers to social conventions about right and wrong that form a consensus.', a: 'true' },
  { id: 2, type: 'tf', q: 'Morality always leads to the same rules across all cultures.', a: 'false' },
  { id: 3, type: 'tf', q: 'James Moor distinguishes between directive rules and social policy.', a: 'true' },
  { id: 4, type: 'tf', q: 'Bernard Gert\'s moral system is informal, public, rational, and impartial.', a: 'true' },
  { id: 5, type: 'tf', q: 'The Golden Rule states: Do not treat others in ways you don’t want to be treated.', a: 'false' },
  { id: 6, type: 'tf', q: 'Natural law is written and enforced by government institutions.', a: 'false' },
  { id: 7, type: 'tf', q: 'Conventional law is created by people or governments for social order.', a: 'true' },
  { id: 8, type: 'tf', q: 'Declarative law affirms general principles of morality in legal form.', a: 'true' },
  { id: 9, type: 'tf', q: 'Determinative law resolves specific disputes through court decisions.', a: 'true' },
  { id: 10, type: 'tf', q: 'Morality and law have identical modes of enforcement.', a: 'false' },

  // Multiple Choice (20)
  { id: 11, type: 'mcq', q: 'Which factor does NOT typically influence moral beliefs?', options: ['Age','Education','Gravity','Religion'], a: 2 },
  { id: 12, type: 'mcq', q: 'Which is an example of a directive rule?', options: ['Laws','Golden Rule','Bronze Rule','Nepotism Rule'], a: 0 },
  { id: 13, type: 'mcq', q: 'Social policy primarily aims to:', options: ['Punish offenders','Address complex social problems','Eliminate morality','Teach etiquette'], a: 1 },
  { id: 14, type: 'mcq', q: 'Which characteristic is NOT part of Gert’s definition of a moral system?', options: ['Public','Informal','Arbitrary','Impartial'], a: 2 },
  { id: 15, type: 'mcq', q: 'The Silver Rule emphasizes:', options: ['Reciprocity','Non-harm/avoid causing harm','Aggression','Imitation'], a: 1 },
  { id: 16, type: 'mcq', q: 'Which “rule” promotes favoring relatives and in-group members?', options: ['Tin Rule','Iron Rule','Nepotism Rule','Bronze Rule'], a: 2 },
  { id: 17, type: 'mcq', q: 'Natural law is best described as:', options: ['Legislation passed by parliament','Unwritten universal rules discovered by reason','A type of social policy','A criminal code'], a: 1 },
  { id: 18, type: 'mcq', q: 'Conventional law that states broad principles rather than specific cases is called:', options: ['Declarative law','Determinative law','Natural law','Nepotism law'], a: 0 },
  { id: 19, type: 'mcq', q: 'Which is an example of a determinative law source?', options: ['Court rulings','Conscience','Customary ethics','Folk tales'], a: 0 },
  { id: 20, type: 'mcq', q: 'Which is a common enforcement consequence of immoral but legal actions?', options: ['Criminal imprisonment','Social shame and loss of reputation','Guaranteed compensation','Automatic pardon'], a: 1 },
  { id: 21, type: 'mcq', q: 'Which statement best describes the relationship between law and morality?', options: ['They are always identical','They both guide behavior but differ in enforcement','Law never reflects moral values','Morality is enforced by courts'], a: 1 },
  { id: 22, type: 'mcq', q: 'Which is NOT listed as a variation factor for morality?', options: ['Gender','Life experiences','Ethnicity','Planet of origin'], a: 3 },
  { id: 23, type: 'mcq', q: 'Which moral rule suggests acting before others act against you?', options: ['Golden Rule','Iron Rule','Silver Rule','Bronze Rule'], a: 1 },
  { id: 24, type: 'mcq', q: 'Which of the following is an example of social policy?', options: ['Welfare program','Traffic signal','Natural law','Iron Rule'], a: 0 },
  { id: 25, type: 'mcq', q: 'Which is an aim of a moral system per Bernard Gert?', options: ['Prevent harm and promote human flourishing','Maximize profits','Eliminate conscience','Enact punishments'], a: 0 },
  { id: 26, type: 'mcq', q: 'An example where law declares something legal but many consider it immoral is:', options: ['Abortion','Murder','Arson','Theft'], a: 0 },
  { id: 27, type: 'mcq', q: 'Which is a public feature of moral rules?', options: ['Everyone knows the rules','Only judges know the rules','They are secret','They are non-rational'], a: 0 },
  { id: 28, type: 'mcq', q: 'Which moral code element is a norm?', options: ['A rule or standard for behavior','A legal penalty','A court decision','A legislated statute'], a: 0 },
  { id: 29, type: 'mcq', q: 'Which punishment is typical of law but not morality?', options: ['Imprisonment','Guilt','Loss of reputation','Shame'], a: 0 },
  { id: 30, type: 'mcq', q: 'Which best describes conventional law?', options: ['Made by people/groups for order','Always unwritten','Same as natural law','Never enforced'], a: 0 },

  // Situational (10)
  { id: 31, type: 'smcq', q: 'A community enacts a recycling ordinance with fines for noncompliance. This is an example of:', options: ['Natural law','Conventional law','Golden Rule','Moral code'], a: 1 },
  { id: 32, type: 'smcq', q: 'A family favors hiring relatives for jobs. Which rule best describes this?', options: ['Bronze Rule','Nepotism Rule','Silver Rule','Declarative law'], a: 1 },
  { id: 33, type: 'smcq', q: 'A government establishes healthcare reform to reduce poverty. This is:', options: ['Directive rule','Social policy','Determinative law','Nepotism'], a: 1 },
  { id: 34, type: 'smcq', q: 'A court interprets a statute in a specific case and sets a precedent. This is:', options: ['Declarative law','Determinative law','Golden Rule','Natural law'], a: 1 },
  { id: 35, type: 'smcq', q: 'A person lies but suffers social shame rather than legal punishment. This illustrates:', options: ['Law enforcement','Moral enforcement','Determinative law','Declarative law'], a: 1 },
  { id: 36, type: 'smcq', q: 'A society where everyone knows common courtesy norms: which Gert characteristic does this show?', options: ['Informal','Public','Arbitrary','Deterministic'], a: 1 },
  { id: 37, type: 'smcq', q: 'Traffic speed limits set by government are examples of which two concepts?', options: ['Natural law & moral code','Conventional law & directive rule','Silver Rule & bronze rule','Nepotism & iron rule'], a: 1 },
  { id: 38, type: 'smcq', q: 'An activist argues a law is unjust because it violates basic human rights. Which law type would they appeal to?', options: ['Declarative law','Natural law','Tin Rule','Determinative law'], a: 1 },
  { id: 39, type: 'smcq', q: 'A workplace has an unwritten expectation to help colleagues. This best fits:', options: ['Moral norm','Determinative law','Declarative statute','Court precedent'], a: 0 },
  { id: 40, type: 'smcq', q: 'A legislature passes an anti-discrimination statute that applies to all citizens. This is an example of:', options: ['Declarative law','Nepotism rule','Iron rule','Bronze rule'], a: 0 },

  // Identification (10)
  { id: 41, type: 'iden', q: 'Who defined morality as social conventions and emphasized virtues like compassion?', a_text: 'No single author — concept described in the module (answer: general definition of morality)' },
  { id: 42, type: 'iden', q: 'Who proposed the two types of rules: directive and social policy (2004)?', a_text: 'James Moor' },
  { id: 43, type: 'iden', q: 'Which thinker described a moral system as public, informal, rational, and impartial?', a_text: 'Bernard Gert' },
  { id: 44, type: 'iden', q: 'Name the rule summarized as "Do unto others as you would have them do unto you."', a_text: 'Golden Rule' },
  { id: 45, type: 'iden', q: 'Name the rule that advises not to treat others in ways you would not want to be treated.', a_text: 'Silver Rule' },
  { id: 46, type: 'iden', q: 'What is law defined as by Webster — in short?', a_text: 'A rule of conduct recognized by custom or formal enactment' },
  { id: 47, type: 'iden', q: 'What form of law is established through court decisions and precedents?', a_text: 'Determinative law' },
  { id: 48, type: 'iden', q: 'What form of conventional law states broad principles and affirms natural morality?', a_text: 'Declarative law' },
  { id: 49, type: 'iden', q: 'Give an example of a social policy.', a_text: 'Welfare program (or healthcare reform)' },
  { id: 50, type: 'iden', q: 'Which moral rule emphasizes favoring in-group or relatives?', a_text: 'Nepotism Rule' }
];

export default function SOCIExam({ subject, setCurrentPage, setSelectedSubject }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const goBackToSubjects = () => {
    setSelectedSubject(null); // Reset the selected subject
    // The page will automatically show SubjectSelection since selectedSubject is null
  };

  useEffect(() => {}, []);

  const q = questions[index];

  function recordAnswer(qid, value) {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  }

  function next() { if (index < questions.length-1) setIndex(i=>i+1); }
  function prev() { if (index>0) setIndex(i=>i-1); }

  function computeScore() {
    let s=0;
    for (const question of questions) {
      const given = answers[question.id];
      if (question.type==='tf') { if (given && given.toLowerCase()===question.a) s++; }
      else if (question.type==='mcq' || question.type==='smcq') { if (given!==undefined && Number(given)===question.a) s++; }
      else if (question.type==='iden') { if (typeof given==='string' && given.trim().toLowerCase()===question.a_text.trim().toLowerCase()) s++; }
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
    const blob = new Blob([JSON.stringify(questions,null,2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'soci_prelim_questions.json'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6">
        {/* Header with Back Button and Subject Info */}
        <header className="mb-6">
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
              {subject ? `${subject.title} Exam` : 'SOCI Prelim Exam'}
            </h2>
            <div className="flex gap-2">
              <button onClick={downloadJSON} className="px-3 py-1 bg-indigo-500 text-white rounded text-sm">Download JSON</button>
              <button onClick={restart} className="px-3 py-1 bg-gray-200 rounded text-sm">Restart</button>
            </div>
          </div>
        </header>

        {!showResult ? (
          <div className="flex flex-col h-96">
            <div className="flex-1 flex flex-col">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-4">
                  Question {index + 1} of {questions.length}
                </div>
                
                <h2 className="text-lg font-medium mb-4 text-gray-800">
                  {q?.q}
                </h2>

                {q?.type === "tf" && (
                  <div className="space-y-3">
                    {["true", "false"].map((option) => (
                      <label key={option} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={answers[q.id] === option}
                          onChange={(e) => recordAnswer(q.id, e.target.value)}
                          className="mt-0.5 text-indigo-600"
                        />
                        <span className="text-sm text-gray-700">{option.toUpperCase()}</span>
                      </label>
                    ))}
                  </div>
                )}

                {(q?.type === "mcq" || q?.type === "smcq") && (
                  <div className="space-y-3">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={optIndex}
                          checked={answers[q.id] === optIndex}
                          onChange={(e) => recordAnswer(q.id, parseInt(e.target.value))}
                          className="mt-0.5 text-indigo-600"
                        />
                        <span className="text-sm text-gray-700">{String.fromCharCode(65 + optIndex)}. {option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q?.type === 'iden' && (
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      value={answers[q.id] || ''}
                      onChange={(e) => recordAnswer(q.id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button onClick={prev} disabled={index === 0} className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors">
                Previous
              </button>
              <div className="text-sm text-gray-500">
                {Object.keys(answers).length} of {questions.length} answered
              </div>
              {index === questions.length - 1 ? (
                <button onClick={computeScore} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Submit
                </button>
              ) : (
                <button onClick={next} className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors">
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">
              {score / questions.length >= 0.8 ? "🎉" : score / questions.length >= 0.6 ? "👍" : "📚"}
            </div>
            <h2 className="text-2xl font-bold mb-2">Exam Complete!</h2>
            <div className="text-lg mb-6">
              Your Score: <span className="font-bold text-indigo-600">{score}/{questions.length}</span>
              <span className="text-gray-500 ml-2">({Math.round((score / questions.length) * 100)}%)</span>
            </div>
            
            {/* Score breakdown */}
            <div className="max-w-md mx-auto mb-6">
              <div className="bg-gray-100 rounded-full h-3 mb-2">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${(score / questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 grid grid-cols-3 gap-2">
                <div className="text-green-600">Correct: {score}</div>
                <div className="text-red-600">Wrong: {questions.length - score}</div>
                <div className="text-gray-500">Total: {questions.length}</div>
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
              {questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                let isCorrect = false;
                let correctAnswerText = '';
                let userAnswerText = '';
                
                if (q.type === "tf") {
                  isCorrect = userAnswer && userAnswer.toLowerCase() === q.a;
                  correctAnswerText = q.a;
                  userAnswerText = userAnswer || 'No answer';
                } else if (q.type === "mcq" || q.type === "smcq") {
                  isCorrect = userAnswer !== undefined && Number(userAnswer) === q.a;
                  correctAnswerText = q.options[q.a];
                  userAnswerText = userAnswer !== undefined ? q.options[userAnswer] : 'No answer';
                } else if (q.type === 'iden') {
                  const normalize = str => str ? str.trim().toLowerCase() : '';
                  isCorrect = normalize(userAnswer) === normalize(q.a_text);
                  correctAnswerText = q.a_text;
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
                    <p className="text-gray-800 mb-3">{q.q}</p>
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
