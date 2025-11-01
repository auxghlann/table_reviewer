import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-purple-100 py-20 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 text-black border-4 border-black bg-white inline-block px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Sana Makagraduate hehe :D
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-black font-medium">
            Test your knowledge with this comprehensive examination platform. 
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/exam"
              className="bg-purple-500 text-white px-8 py-4 text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Start Exam Now
            </Link>
            <Link
              to="/reviewer"
              className="bg-white text-purple-600 px-8 py-4 text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Study Materials
            </Link>
            <Link
              to="/about"
              className="bg-purple-300 text-black px-8 py-4 text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4 inline-block border-b-4 border-black pb-2">
              Why Choose this Platform?
            </h2>
            <p className="text-lg text-black font-medium max-w-2xl mx-auto mt-4">
              The platform offers a comprehensive assessment experience designed by sleepdeprivedtable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-200 p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4 text-black">Comprehensive Coverage</h3>
              <p className="text-black font-medium">
                carefully crafted questions covering subjects from university courses.
              </p>
            </div>

            <div className="bg-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-4 text-black">Instant Results</h3>
              <p className="text-black font-medium">
                Get immediate feedback with detailed score breakdown and correct answers 
                to enhance your learning experience.
              </p>
            </div>

            <div className="bg-purple-300 p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-4 text-black">Multiple Formats</h3>
              <p className="text-black font-medium">
                Test different aspects of knowledge with True/False, Multiple Choice, 
                Situational.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-purple-500 py-16 border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="bg-white text-black p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg font-bold">Expert Questions</div>
            </div>
            <div className="bg-purple-300 text-black p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="text-lg font-bold">Question Types</div>
            </div>
            <div className="bg-white text-black p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg font-bold">Interactive</div>
            </div>
            <div className="bg-purple-300 text-black p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-lg font-bold">Attempts</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-6 inline-block border-4 border-black bg-white px-8 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Ready to Improve Your Knowledge?
          </h2>
          <p className="text-lg text-black font-medium mb-8 mt-8">
            Prepare for your exams with our comprehensive materials or test your knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/reviewer"
              className="bg-purple-400 text-black px-8 py-4 text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Study Materials
            </Link>
            <Link
              to="/exam"
              className="bg-white text-purple-600 px-8 py-4 text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Begin Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}