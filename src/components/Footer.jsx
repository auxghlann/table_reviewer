import React from "react";

export default function Footer() {
  const currentDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <footer className="bg-purple-500 text-black border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-black mb-4 border-4 border-black bg-white inline-block px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Reviewer Platform
            </div>
            <p className="text-black font-medium mb-4 mt-4">
              Comprehensive learning and assessment platform designed to test and improve 
              your knowledge of Computer Science fundamentals, applications, and advanced concepts.
            </p>
            <div className="text-sm text-black font-bold bg-purple-300 inline-block px-3 py-1 border-2 border-black">
                © 2025 sleepdeprivedtable Reviewer Platform. All rights reserved.
              </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-black border-b-4 border-black pb-2">Quick Links</h3>
            <ul className="space-y-2 text-black font-medium">
              <li><a href="#" className="hover:text-white hover:underline transition-colors font-bold">Home</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors font-bold">About</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors font-bold">Take Exam</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors font-bold">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-black border-b-4 border-black pb-2">Resources</h3>
            <ul className="space-y-2 text-black font-medium">
              <li><a href="#" className="hover:text-white hover:underline transition-colors font-bold">Study Guide</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors font-bold">FAQ</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors font-bold">Support</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors font-bold">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t-4 border-black mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-black font-bold text-sm mb-4 md:mb-0 bg-white px-3 py-1 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Last updated: {currentDate}
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/sleepdeprivedtable" target="_blank" rel="noopener noreferrer" className="bg-white border-4 border-black p-2 hover:bg-purple-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
              </svg>
            </a>
            {/* <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border-4 border-black p-2 hover:bg-purple-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a> */}
            <a href="https://www.linkedin.com/in/ak-mesa/" target="_blank" rel="noopener noreferrer" className="bg-white border-4 border-black p-2 hover:bg-purple-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}