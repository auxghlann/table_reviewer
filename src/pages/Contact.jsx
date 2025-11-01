import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-purple-100 py-16 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6 text-black border-4 border-black bg-white inline-block px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Contact Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-black font-medium mt-8">
            Have questions about our AI exam platform? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-purple-100 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold mb-6 text-black">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-4 border-black focus:ring-0 focus:outline-none bg-white font-medium"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border-4 border-black focus:ring-0 focus:outline-none bg-white font-medium"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Subject
                  </label>
                  <select className="w-full p-3 border-4 border-black focus:ring-0 focus:outline-none bg-white font-medium">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Exam Content Question</option>
                    <option>Partnership Opportunity</option>
                    <option>Bug Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full p-3 border-4 border-black focus:ring-0 focus:outline-none bg-white font-medium"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-500 text-white py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black border-b-4 border-black pb-2 inline-block">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-purple-600 mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Email</h3>
                    <p className="text-black font-medium">support@aiexam.platform</p>
                    <p className="text-black font-medium">info@aiexam.platform</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-200 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-purple-600 mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Phone</h3>
                    <p className="text-black font-medium">+1 (555) 123-4567</p>
                    <p className="text-black font-medium">Mon-Fri 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-purple-600 mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Office</h3>
                    <p className="text-black font-medium">123 AI Learning Street</p>
                    <p className="text-black font-medium">Tech Valley, CA 94000</p>
                    <p className="text-black font-medium">United States</p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4 text-black border-b-4 border-black pb-2 inline-block">Frequently Asked Questions</h3>
                <div className="space-y-4 mt-6">
                  <div className="bg-purple-300 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h4 className="font-bold text-black mb-2">How many times can I take the exam?</h4>
                    <p className="text-black font-medium text-sm">You can take the exam unlimited times. Each attempt helps reinforce your learning.</p>
                  </div>
                  <div className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h4 className="font-bold text-black mb-2">Is there a time limit?</h4>
                    <p className="text-black font-medium text-sm">No, the exam is self-paced. Take as much time as you need to think through each question.</p>
                  </div>
                  <div className="bg-purple-200 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h4 className="font-bold text-black mb-2">Can I see the correct answers?</h4>
                    <p className="text-black font-medium text-sm">Yes! After completing the exam, you'll see a detailed breakdown with all correct answers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}