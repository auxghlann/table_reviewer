// AI Prelim Exam — Single-file React app
// Exports default React component. Uses Tailwind classes for styling.
// The questions are embedded in `questionsJson` (separate data constant) and also downloadable as a .json file.

import React, { useState, useEffect } from "react";

const questionsJson = [
  { id: 1, type: "true_false", question: "John McCarthy is considered the father of Artificial Intelligence.", answer: "true" },
  { id: 2, type: "true_false", question: "AI without learning ability can still generalize new information.", answer: "false" },
  { id: 3, type: "true_false", question: "The Turing Test evaluates whether a machine can imitate human intelligence.", answer: "true" },
  { id: 4, type: "true_false", question: "Expert systems rely on a knowledge base and inference engine.", answer: "true" },
  { id: 5, type: "true_false", question: "Deductive reasoning starts from specific observations and generalizes them.", answer: "false" },
  { id: 6, type: "true_false", question: "Robotics is a research area of AI concerned with language understanding.", answer: "false" },
  { id: 7, type: "true_false", question: "Voice recognition focuses on identifying what is being said, not who.", answer: "false" },
  { id: 8, type: "true_false", question: "BFS always guarantees the shortest path in a search problem.", answer: "true" },
  { id: 9, type: "true_false", question: "A rational agent always acts to maximize performance.", answer: "true" },
  { id: 10, type: "true_false", question: "Inaccessible environments give the agent full information about the system.", answer: "false" },

  { id: 11, type: "multiple_choice", question: "Who coined the term 'Artificial Intelligence'?", options: ["Alan Turing","John McCarthy","Marvin Minsky","Herbert Simon"], answer: 1 },
  { id: 12, type: "multiple_choice", question: "Which of the following is not a contributor to AI?", options: ["Psychology","Biology","Literature","Linguistics"], answer: 2 },
  { id: 13, type: "multiple_choice", question: "Which is an application of NLP?", options: ["Google Translate","Shakey Robot","Stanford Cart","Deep Blue"], answer: 0 },
  { id: 14, type: "multiple_choice", question: "Which milestone introduced the concept of machines imitating human conversation?", options: ["ELIZA (1965)","Deep Blue (1997)","Rossum's Universal Robots (1923)","Turing Test (1950)"], answer: 0 },
  { id: 15, type: "multiple_choice", question: "Which type of intelligence relates to body and motor skills?", options: ["Spatial","Bodily-Kinesthetic","Interpersonal","Logical-Mathematical"], answer: 1 },
  { id: 16, type: "multiple_choice", question: "Which is an example of inductive reasoning?", options: ["If it rains...","Observing many dogs barking...","Using algebra...","Following a recipe..."], answer: 1 },
  { id: 17, type: "multiple_choice", question: "Which type of learning involves imitating others?", options: ["Perceptual","Relational","Observational","Spatial"], answer: 2 },
  { id: 18, type: "multiple_choice", question: "Which is a limitation of machine intelligence compared to humans?", options: ["Use of algorithms","Completion of missing information","Storing data by rules","Execution speed"], answer: 1 },
  { id: 19, type: "multiple_choice", question: "Which AI area is focused on reasoning with vague or imprecise data?", options: ["Robotics","Neural Networks","Fuzzy Logic","NLP"], answer: 2 },
  { id: 20, type: "multiple_choice", question: "Which is an expert task for AI?", options: ["Chess playing","Fault finding in systems","Common-sense reasoning","Recognizing handwriting"], answer: 1 },
  { id: 21, type: "multiple_choice", question: "What does the 'P' in PEAS stand for?", options: ["Planning","Performance measure","Prediction","Perception"], answer: 1 },
  { id: 22, type: "multiple_choice", question: "Which type of agent only reacts to the current percept?", options: ["Utility-based agent","Goal-based agent","Simple reflex agent","Model-based agent"], answer: 2 },
  { id: 23, type: "multiple_choice", question: "In which environment is information complete and available to the agent?", options: ["Inaccessible","Partially Observable","Observable","Non-Episodic"], answer: 2 },
  { id: 24, type: "multiple_choice", question: "Which environment type includes randomness?", options: ["Deterministic","Static","Non-Deterministic","Discrete"], answer: 2 },
  { id: 25, type: "multiple_choice", question: "Which search algorithm uses a FIFO queue?", options: ["DFS","BFS","A*","Hill Climbing"], answer: 1 },
  { id: 26, type: "multiple_choice", question: "What is the space complexity of BFS?", options: ["O(bm)","O(b^d)","O(n)","O(log n)"], answer: 1 },
  { id: 27, type: "multiple_choice", question: "Which agent structure maintains an internal state of the world?", options: ["Simple reflex","Goal-based","Utility-based","Model-based reflex"], answer: 3 },
  { id: 28, type: "multiple_choice", question: "The Stanford Cart is notable for being:", options: ["The first chatbot","An autonomous vehicle","A machine translation system","An early expert system"], answer: 1 },
  { id: 29, type: "multiple_choice", question: "Which of the following is a formal task in AI?", options: ["Medicine diagnosis","Playing chess","Fault detection","Autonomous driving"], answer: 1 },
  { id: 30, type: "multiple_choice", question: "Which learning type is remembering sequences of events?", options: ["Episodic","Motor","Stimulus-response","Relational"], answer: 0 },

  { id: 31, type: "situational", question: "A self-driving car in traffic reacts to other cars moving independently. Which environment type is this?", options: ["Static","Dynamic","Discrete","Episodic"], answer: 1 },
  { id: 32, type: "situational", question: "A washing machine adjusts water usage based on clothes load. Which AI approach is applied?", options: ["Expert System","Fuzzy Logic","Robotics","Neural Networks"], answer: 1 },
  { id: 33, type: "situational", question: "You're playing poker against an AI. Since the AI doesn't know your cards, the environment is:", options: ["Observable","Partially Observable","Accessible","Deterministic"], answer: 1 },
  { id: 34, type: "situational", question: "An AI is trained to classify photos of cats and dogs. Each photo is analyzed independently. This is:", options: ["Episodic","Non-episodic","Continuous","Multi-agent"], answer: 0 },
  { id: 35, type: "situational", question: "An agent maximizing customer satisfaction in a recommendation system is an example of:", options: ["Reflex Agent","Utility-based Agent","Model-based Agent","Goal-based Agent"], answer: 1 },
  { id: 36, type: "situational", question: "A voice-activated banking app identifies the account holder's unique voice. This is:", options: ["Speech recognition","NLP","Voice recognition","Vision system"], answer: 2 },
  { id: 37, type: "situational", question: "If a robot is vacuuming but remembers the areas it has already cleaned, it is acting as a:", options: ["Goal-based agent","Simple reflex agent","Model-based reflex agent","Utility-based agent"], answer: 2 },
  { id: 38, type: "situational", question: "An AI doctor system gives treatment recommendations based on a knowledge base. This is:", options: ["NLP","Expert System","Robotics","Neural Network"], answer: 1 },
  { id: 39, type: "situational", question: "A Rubik's cube solver explores one branch deeply before backtracking. This uses:", options: ["BFS","DFS","A*","Brute-force search"], answer: 1 },
  { id: 40, type: "situational", question: "When rolling dice, the AI cannot predict outcomes with certainty. This environment is:", options: ["Deterministic","Non-Deterministic","Static","Inaccessible"], answer: 1 },

  { id: 41, type: "identification", question: "Father of AI", answer_text: "John McCarthy" },
  { id: 42, type: "identification", question: "AI system that uses sensors and actuators to interact with the physical world", answer_text: "Robot or Robotics" },
  { id: 43, type: "identification", question: "The test that checks if humans can distinguish between machine and human responses", answer_text: "Turing Test" },
  { id: 44, type: "identification", question: "Type of reasoning that goes from general rules to specific conclusions", answer_text: "Deductive reasoning" },
  { id: 45, type: "identification", question: "The first chatbot created in 1965", answer_text: "ELIZA" },
  { id: 46, type: "identification", question: "System designed to mimic human experts using knowledge base and inference engine", answer_text: "Expert System" },
  { id: 47, type: "identification", question: "The game where IBM's Deep Blue defeated Kasparov", answer_text: "Chess" },
  { id: 48, type: "identification", question: "Environment property where multiple agents act and interact", answer_text: "Multi-agent" },
  { id: 49, type: "identification", question: "AI technique where truth values can be between 0 and 1", answer_text: "Fuzzy Logic" },
  { id: 50, type: "identification", question: "Search strategy that explores nodes level by level", answer_text: "Breadth-first search (BFS)" }
];

export default function ExamApp({ subject, setCurrentPage, setSelectedSubject }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffled, setShuffled] = useState(questionsJson);

  const goBackToSubjects = () => {
    setSelectedSubject(null); // Reset the selected subject
    // The page will automatically show SubjectSelection since selectedSubject is null
  };

  useEffect(() => {
    // keep the questions order stable; you can shuffle if desired
    setShuffled(questionsJson);
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
      if (item.type === "true_false") {
        if (given && given.toLowerCase() === item.answer) s += 1;
      } else if (item.type === "multiple_choice" || item.type === "situational") {
        if (given !== undefined && Number(given) === item.answer) s += 1;
      } else if (item.type === "identification") {
        if (typeof given === "string" && item.answer_text) {
          const normalize = str => str.trim().toLowerCase();
          if (normalize(given) === normalize(item.answer_text)) s += 1;
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
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(shuffled, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai_prelim_questions.json";
    a.click();
    URL.revokeObjectURL(url);
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

        <div className="mb-4 text-sm text-gray-600">Question {index + 1} of {shuffled.length}</div>

        <div className="p-4 border rounded-lg mb-4 bg-gray-50">
          <div className="font-medium mb-2">{q.type === 'true_false' ? '(True/False)' : q.type === 'multiple_choice' ? '(Multiple Choice)' : q.type === 'situational' ? '(Situational)' : '(Identification)'} </div>
          <div className="text-lg">{q.question}</div>

          <div className="mt-4">
            {q.type === 'true_false' && (
              <div className="flex gap-2">
                {["true","false"].map(v => (
                  <button key={v} onClick={() => recordAnswer(q.id, v)} className={`px-3 py-1 rounded ${answers[q.id]===v? 'bg-indigo-500 text-white' : 'bg-white border'}`}>{v.toUpperCase()}</button>
                ))}
              </div>
            )}

            {(q.type === 'multiple_choice' || q.type === 'situational') && (
              <div className="grid gap-2 mt-2">
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => recordAnswer(q.id, i)} className={`text-left p-3 rounded border ${answers[q.id]===i? 'bg-indigo-500 text-white' : 'bg-white'}`}>
                    <div className="font-medium">{String.fromCharCode(65+i)}. {opt}</div>
                  </button>
                ))}
              </div>
            )}

            {q.type === 'identification' && (
              <div className="mt-2">
                <input value={answers[q.id] || ''} onChange={e=>recordAnswer(q.id, e.target.value)} className="w-full p-2 border rounded" placeholder="Type your answer (identification)" />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={prev} disabled={index===0} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Previous</button>
            <button onClick={next} disabled={index===shuffled.length-1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
          </div>

          <div className="flex gap-2">
            <button onClick={computeScore} className="px-3 py-1 bg-green-600 text-white rounded">Submit & Score</button>
          </div>
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-white border rounded">
            <div className="text-xl font-semibold">Result</div>
            <div className="mt-2">Score: <span className="font-medium">{score} / {shuffled.length}</span></div>
            <div className="mt-2 text-sm text-gray-600">Percentage: {(score/shuffled.length*100).toFixed(1)}%</div>
            <div className="mt-4">
              <details className="text-sm">
                <summary className="cursor-pointer">Show answer breakdown</summary>
                <ol className="mt-2 ml-4 list-decimal">
                  {shuffled.map(item => (
                    <li key={item.id} className="mb-2">
                      <div className="font-medium">Q {item.id}:</div>
                      <div className="text-sm">Your answer: {String(answers[item.id] ?? '')}</div>
                      <div className="text-sm">Correct: {item.type==='multiple_choice' || item.type==='situational' ? String.fromCharCode(65+item.answer) : item.type==='true_false' ? item.answer.toUpperCase() : item.answer_text}</div>
                    </li>
                  ))}
                </ol>
              </details>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}