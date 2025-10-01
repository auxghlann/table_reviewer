import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SubjectSelection from "./pages/SubjectSelection";
import ExamApp from "./subject/ExamApp";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "exam":
        if (selectedSubject) {
          return <ExamApp subject={selectedSubject} setCurrentPage={setCurrentPage} setSelectedSubject={setSelectedSubject} />;
        } else {
          return <SubjectSelection setCurrentPage={setCurrentPage} setSelectedSubject={setSelectedSubject} />;
        }
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}