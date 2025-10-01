import React, { useState, useEffect } from "react";

// Ethics Prelims — Single-file React exam app
// Usage: drop into a React project (e.g. Vite/CRA). This is a self-contained component.
// It includes the question bank (JSON), a simple UI (Tailwind classes assumed), and scoring.

const QUESTIONS = [
  // True/False 1-10
  { id: 1, type: "tf", question: "Philosophy begins with wonder, which is expressed in questioning.", answer: "True" },
  { id: 2, type: "tf", question: "The goal of philosophy is simply to possess the truth.", answer: "False" },
  { id: 3, type: "tf", question: "Epistemology studies the fundamental concepts of existence.", answer: "False" },
  { id: 4, type: "tf", question: "Ethics is considered a practical science because it studies human acts in terms of their morality.", answer: "True" },
  { id: 5, type: "tf", question: "According to Aristotle, happiness is achieved through moderation of reason and passion.", answer: "True" },
  { id: 6, type: "tf", question: "Morality relies solely on human reason and does not include Divine Revelation.", answer: "False" },
  { id: 7, type: "tf", question: "Laws are always ethical because they are created by society.", answer: "False" },
  { id: 8, type: "tf", question: "Human Acts require knowledge and free will.", answer: "True" },
  { id: 9, type: "tf", question: "Stealing for charity is considered moral because of its good intention.", answer: "False" },
  { id: 10, type: "tf", question: "Pragmatism holds that truth is what works, is useful, and produces beneficial results.", answer: "True" },

  // Multiple Choice 11-30
  { id: 11, type: "mc", question: "'Philo' and 'Sophia' mean:", options: ["Wisdom & Knowledge","Love & Wisdom","Truth & Philosophy","Study & Logic"], answer: "Love & Wisdom" },
  { id: 12, type: "mc", question: "Which branch of philosophy studies correct reasoning?", options: ["Metaphysics","Ethics","Logic","Epistemology"], answer: "Logic" },
  { id: 13, type: "mc", question: "Which of the following is NOT a benefit of philosophy according to Babor?", options: ["Grasping the meaning of life","Understanding God and the divine","Mastery of physical sciences","Understanding self and others"], answer: "Mastery of physical sciences" },
  { id: 14, type: "mc", question: "Metaethics is concerned with:", options: ["Application of moral principles in daily life","Criteria of right and wrong","The origin and meaning of moral principles","None of the above"], answer: "The origin and meaning of moral principles" },
  { id: 15, type: "mc", question: "Ethics and Law may conflict when:", options: ["The law is unjust but ethical action is required","Religion is involved","Society approves of the law","The law is always higher than ethics"], answer: "The law is unjust but ethical action is required" },
  { id: 16, type: "mc", question: "Which philosopher said, 'Man is condemned to be free'?", options: ["Martin Heidegger","Jean-Paul Sartre","Aristotle","Immanuel Kant"], answer: "Jean-Paul Sartre" },
  { id: 17, type: "mc", question: "A person acting without knowledge or free will is performing:", options: ["Human Act","Act of Man","Moral Act","Indifferent Act"], answer: "Act of Man" },
  { id: 18, type: "mc", question: "Which is NOT an impediment to human acts?", options: ["Ignorance","Fear","Freedom","Violence"], answer: "Freedom" },
  { id: 19, type: "mc", question: "Which principle applies: 'The end does not justify the means'?", options: ["Circumstance principle","Conscience principle","Morality of human acts","Pragmatism principle"], answer: "Morality of human acts" },
  { id: 20, type: "mc", question: "A conscience that judges good acts as bad is called:", options: ["Scrupulous conscience","False conscience","Lax conscience","Certain conscience"], answer: "False conscience" },
  { id: 21, type: "mc", question: "Kohlberg’s Stage 2 morality is focused on:", options: ["Law and Order","Punishment avoidance","Rewards and self-interest","Universal principles"], answer: "Rewards and self-interest" },
  { id: 22, type: "mc", question: "Which moral dilemma case is most famously used by Kohlberg?", options: ["Trolley Problem","Euthanasia case","Heinz Dilemma","Prisoner’s Dilemma"], answer: "Heinz Dilemma" },
  { id: 23, type: "mc", question: "Realism (Aristotle) asserts that:", options: ["Reality exists only in the mind","Universals exist apart from particulars","Reality exists independently of the human mind","Truth is relative"], answer: "Reality exists independently of the human mind" },
  { id: 24, type: "mc", question: "Which is an example of applied ethics?", options: ["Discussing the origin of morality","Debating whether euthanasia is moral","Questioning the meaning of right and wrong","Defining obligation"], answer: "Debating whether euthanasia is moral" },
  { id: 25, type: "mc", question: "The 'Golden Rule' is an example of:", options: ["Religious law","Social custom","Ethical standard","Personal preference"], answer: "Ethical standard" },
  { id: 26, type: "mc", question: "Existentialism emphasizes:", options: ["Society as the ultimate source of values","Individual freedom and responsibility","Divine authority as the only moral guide","Universal principles that are absolute"], answer: "Individual freedom and responsibility" },
  { id: 27, type: "mc", question: "Which kind of ignorance cannot be removed and does not incur culpability?", options: ["Vincible Ignorance","Supine Ignorance","Invincible Ignorance","Affected Ignorance"], answer: "Invincible Ignorance" },
  { id: 28, type: "mc", question: "Which condition is NOT required for valid self-defense?", options: ["Aggression must be unjust","Aggression must be actual","Violence must be proportional","Aggression must be legal"], answer: "Aggression must be legal" },
  { id: 29, type: "mc", question: "A person who cheats and later feels guilt is showing which type of conscience?", options: ["Antecedent","Consequent","False","Scrupulous"], answer: "Consequent" },
  { id: 30, type: "mc", question: "Pragmatism defines truth as:", options: ["What corresponds to universal ideals","What is consistent with reason alone","What is practical and useful","What society approves"], answer: "What is practical and useful" },

  // Situational 31-40 (treated as MCQ with scenario)
  { id: 31, type: "situational", question: "A student refuses to cheat in an exam despite knowing classmates are doing it. Which type of conscience is at work?", options: ["Scrupulous","Lax","Correct","False"], answer: "Correct" },
  { id: 32, type: "situational", question: "A doctor steals medicine to save a poor patient’s life. According to the principle 'the end does not justify the means,' the act is:", options: ["Good, because intention is pure","Bad, because the act is wrong regardless of intention","Indifferent","Acceptable in ethics"], answer: "Bad, because the act is wrong regardless of intention" },
  { id: 33, type: "situational", question: "A soldier follows an order to attack civilians because the law requires it. Which Kohlberg stage is this?", options: ["Stage 2 – Rewards/Self-interest","Stage 3 – Good Boy","Stage 4 – Law & Order","Stage 5 – Social Contract"], answer: "Stage 4 – Law & Order" },
  { id: 34, type: "situational", question: "A man pretends ignorance of rules to escape responsibility for his wrong act. This is:", options: ["Invincible Ignorance","Vincible Ignorance – Affected","Vincible Ignorance – Supine","Indifferent"], answer: "Vincible Ignorance – Affected" },
  { id: 35, type: "situational", question: "Choosing to donate money only because it improves one’s reputation is an act influenced by:", options: ["Correct Conscience","False Conscience","Rewards/Self-interest stage","Social Contract"], answer: "Rewards/Self-interest stage" },
  { id: 36, type: "situational", question: "A woman resists theft but under grave threat gives up her wallet. Her act is:", options: ["Fully culpable","Less culpable due to grave fear","Not culpable at all","A virtue"], answer: "Less culpable due to grave fear" },
  { id: 37, type: "situational", question: "A student studies hard because he values learning and wisdom. This reflects which philosophical root?", options: ["Metaphysics","Philosophy as love of wisdom","Existentialism","Pragmatism"], answer: "Philosophy as love of wisdom" },
  { id: 38, type: "situational", question: "A leader enforces a corrupt law because 'everyone else is doing it.' This shows influence of:", options: ["Ethics and Religion","Ethics and Sociology","Ethics and Psychology","Applied Ethics"], answer: "Ethics and Sociology" },
  { id: 39, type: "situational", question: "A father disciplines his child moderately to guide him well. Which Aristotelian idea applies?", options: ["Happiness through moderation","Existence precedes essence","Social Contract","Pragmatic Ethics"], answer: "Happiness through moderation" },
  { id: 40, type: "situational", question: "An athlete loses his career due to injury and questions his purpose. This is an example of:", options: ["Realism","Existential Crisis","Pragmatism","Idealism"], answer: "Existential Crisis" },

  // Identification 41-50
  { id: 41, type: "id", question: "Philosophy literally means __________.", answer: "love of wisdom" },
  { id: 42, type: "id", question: "The branch of philosophy dealing with knowledge and truth is called __________.", answer: "epistemology" },
  { id: 43, type: "id", question: "The study of morality and moral concepts is known as __________.", answer: "ethics" },
  { id: 44, type: "id", question: "Acts done without knowledge or free will are called __________.", answer: "acts of man" },
  { id: 45, type: "id", question: "'Being-there' is the concept of __________ (philosopher).", answer: "dasein" },
  { id: 46, type: "id", question: "The principle stating 'Always follow your __________' is a key in moral decision-making.", answer: "conscience" },
  { id: 47, type: "id", question: "The type of conscience that is overly fearful of committing mistakes is __________.", answer: "scrupulous conscience" },
  { id: 48, type: "id", question: "The six stages of moral reasoning were proposed by __________.", answer: "lawrence kohlberg" },
  { id: 49, type: "id", question: "The view that 'truth is what works' is central to __________.", answer: "pragmatism" },
  { id: 50, type: "id", question: "The philosophical school that emphasizes the realm of Forms or Ideas is __________.", answer: "idealism" }
];

function shuffle(arr) {
  return arr.slice();
}

export default function EthicsExam({ subject, setCurrentPage, setSelectedSubject }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [shuffled, setShuffled] = useState(QUESTIONS);

  const goBackToSubjects = () => {
    setSelectedSubject(null); // Reset the selected subject
    // The page will automatically show SubjectSelection since selectedSubject is null
  };

  useEffect(() => {
    // keep the questions order stable; you can shuffle if desired
    setShuffled(QUESTIONS);
  }, []);

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
        if (given && given === item.answer) s += 1;
      } else if (item.type === "mc" || item.type === "situational") {
        if (given && given === item.answer) s += 1;
      } else if (item.type === "identification") {
        if (typeof given === "string" && item.answer) {
          const normalize = str => str.trim().toLowerCase();
          if (normalize(given) === normalize(item.answer)) s += 1;
        }
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
    a.download = "ethics_prelim_questions.json";
    a.click();
    URL.revokeObjectURL(url);
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
              {subject ? `${subject.title} Exam` : 'Ethics Prelim Exam'}
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
                  Question {index + 1} of {shuffled.length}
                </div>
                
                <h2 className="text-lg font-medium mb-4 text-gray-800">
                  {q?.question}
                </h2>

                {q?.type === "mc" && (
                  <div className="space-y-3">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={(answers[q.id] || '') === option}
                          onChange={(e) => recordAnswer(q.id, e.target.value)}
                          className="mt-0.5 text-indigo-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q?.type === "tf" && (
                  <div className="space-y-3">
                    {["True", "False"].map((option) => (
                      <label key={option} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={(answers[q.id] || '') === option}
                          onChange={(e) => recordAnswer(q.id, e.target.value)}
                          className="mt-0.5 text-indigo-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q?.type === "id" && (
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

                {q?.type === "situational" && (
                  <div className="space-y-3">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={(answers[q.id] || '') === option}
                          onChange={(e) => recordAnswer(q.id, e.target.value)}
                          className="mt-0.5 text-indigo-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button onClick={prev} disabled={index === 0} className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">
                Previous
              </button>
              <div className="text-sm text-gray-500">
                {Object.keys(answers).length} of {shuffled.length} answered
              </div>
              {index === shuffled.length - 1 ? (
                <button onClick={computeScore} className="px-4 py-2 bg-green-600 text-white rounded">
                  Submit
                </button>
              ) : (
                <button onClick={next} className="px-4 py-2 bg-indigo-600 text-white rounded">
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
                } else if (q.type === "mc" || q.type === "situational") {
                  isCorrect = userAnswer === q.answer;
                  correctAnswerText = q.answer;
                  userAnswerText = userAnswer || 'No answer';
                } else if (q.type === "id") {
                  const normalize = str => str ? str.trim().toLowerCase() : '';
                  isCorrect = normalize(userAnswer) === normalize(q.answer);
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
