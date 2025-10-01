import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SubjectSelection from "./pages/SubjectSelection";
import Elective3Exam from "./subject/elective_3_prelims";
import EthicsExam from "./subject/ethics_prelims";
import SociExam from "./subject/soci_prelims";

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
          // Route to the correct exam component based on selected subject
          switch (selectedSubject.component) {
            case "elective_3_prelims":
              return <Elective3Exam subject={selectedSubject} setCurrentPage={setCurrentPage} setSelectedSubject={setSelectedSubject} />;
            case "ethics_prelims":
              return <EthicsExam subject={selectedSubject} setCurrentPage={setCurrentPage} setSelectedSubject={setSelectedSubject} />;
            case "soci_prelims":
              return <SociExam subject={selectedSubject} setCurrentPage={setCurrentPage} setSelectedSubject={setSelectedSubject} />;
            default:
              return <Elective3Exam subject={selectedSubject} setCurrentPage={setCurrentPage} setSelectedSubject={setSelectedSubject} />;
          }
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