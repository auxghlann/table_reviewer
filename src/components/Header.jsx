import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Hide header on scroll down (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only apply on mobile (screen width < 768px)
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down & past 50px
          setIsHeaderVisible(false);
          setIsMobileMenuOpen(false); // Close menu when hiding
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsHeaderVisible(true);
        }
      } else {
        // Always show on desktop
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  
  // Only show protected items if authenticated
  const navItems = [
    { path: "/", label: "Home", protected: false },
    { path: "/about", label: "About", protected: false },
    { path: "/exam", label: "Take Exam", protected: true },
    { path: "/reviewer", label: "Study Materials", protected: true },
  ].filter(item => !item.protected || isAuthenticated());

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={`bg-white border-b-4 border-black sticky top-0 z-50 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Table Reviewer" className="h-10 w-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
            <div className="ml-2 text-sm text-black font-bold">Table Reviewer</div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-bold border-4 border-black transition-all ${
                  isActive(item.path)
                    ? "bg-purple-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-black hover:bg-purple-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Auth Section */}
            {isAuthenticated() ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center text-xl"
                >
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
                    <div className="px-4 py-3 border-b-4 border-black bg-purple-100">
                      <p className="text-sm font-bold text-black">{user?.username}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/login");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm font-bold text-black hover:bg-red-100 transition-colors flex items-center gap-2"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-bold border-4 border-black bg-purple-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black border-4 border-black p-2 bg-purple-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t-4 border-black mt-4 pt-4 bg-purple-50">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-bold border-4 border-black text-left transition-all ${
                    isActive(item.path)
                      ? "bg-purple-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-black hover:bg-purple-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Auth Section for Mobile */}
              {isAuthenticated() ? (
                <>
                  <div className="px-4 py-3 bg-purple-100 border-4 border-black">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white font-bold border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-xl flex-shrink-0">
                        {user?.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black">{user?.username}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-sm font-bold border-4 border-black bg-red-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left flex items-center gap-2"
                  >
                    <span>🚪</span> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-bold border-4 border-black bg-purple-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}