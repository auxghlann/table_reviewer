import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">About Our AI Exam Platform</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A comprehensive assessment tool designed to evaluate and enhance your understanding 
            of Artificial Intelligence concepts and applications.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              We believe that understanding Artificial Intelligence is crucial in today's rapidly 
              evolving technological landscape. Our examination platform is designed to provide 
              students, professionals, and AI enthusiasts with a comprehensive tool to assess 
              and improve their knowledge of AI fundamentals, applications, and advanced concepts.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">What We Cover</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• AI History and Pioneers (John McCarthy, Alan Turing)</li>
                  <li>• Machine Learning Fundamentals</li>
                  <li>• Expert Systems and Knowledge Bases</li>
                  <li>• Natural Language Processing</li>
                  <li>• Robotics and Computer Vision</li>
                  <li>• Agent-Based Systems</li>
                  <li>• Search Algorithms (BFS, DFS, A*)</li>
                  <li>• Fuzzy Logic and Neural Networks</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">Question Types</h3>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <strong>True/False:</strong> Test fundamental AI concepts and principles
                  </div>
                  <div>
                    <strong>Multiple Choice:</strong> Evaluate understanding of AI applications and theories
                  </div>
                  <div>
                    <strong>Situational:</strong> Apply AI knowledge to real-world scenarios
                  </div>
                  <div>
                    <strong>Identification:</strong> Define key terms and identify AI pioneers
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-semibold mb-2">Instant Feedback</h4>
                <p className="text-sm text-gray-600">Get immediate results with detailed explanations</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-semibold mb-2">Responsive Design</h4>
                <p className="text-sm text-gray-600">Works perfectly on desktop, tablet, and mobile</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🔄</div>
                <h4 className="font-semibold mb-2">Unlimited Attempts</h4>
                <p className="text-sm text-gray-600">Take the exam as many times as you want</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who This Is For</h2>
            <div className="bg-indigo-50 p-6 rounded-lg mb-8">
              <ul className="space-y-3 text-gray-700">
                <li><strong>Students:</strong> Computer Science, AI, and related fields preparing for examinations</li>
                <li><strong>Professionals:</strong> Software developers looking to expand into AI/ML roles</li>
                <li><strong>Researchers:</strong> Academic researchers wanting to test foundational knowledge</li>
                <li><strong>Enthusiasts:</strong> Anyone interested in understanding AI concepts better</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Exam Structure</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Format Details</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Total Questions: 50</li>
                    <li>• Time Limit: Self-paced</li>
                    <li>• Passing Score: No formal pass/fail</li>
                    <li>• Navigation: Forward and backward</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Additional Features</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Download questions as JSON</li>
                    <li>• Detailed answer explanations</li>
                    <li>• Score percentage calculation</li>
                    <li>• Question-by-question breakdown</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-indigo-200 mb-6">
            Put your AI knowledge to the test with our comprehensive examination platform.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Take the Exam
          </button>
        </div>
      </section>
    </div>
  );
}