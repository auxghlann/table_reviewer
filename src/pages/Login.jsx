import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userService } from '../supabase/userService';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const user = await userService.signIn(formData.username, formData.password);

      if (user) {
        // Login successful
        const userData = {
          username: user.username
        };
        login(userData);
        navigate("/");
      } else {
        // Login failed
        setErrors({ 
          username: "Invalid username or password",
          password: "Invalid username or password"
        });
      }
    }
  };

  return (
    <div className="min-h-screen grid-background-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black border-4 border-black bg-white inline-block px-6 py-3 md:px-8 md:py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Welcome Back!
          </h1>
          <p className="text-black font-medium mt-4">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              {/* <label className="block text-sm font-bold text-black mb-2">
                Username
              </label> */}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-3 border-4 ${errors.username ? 'border-red-500' : 'border-black'} focus:ring-0 focus:outline-none bg-white font-medium`}
                placeholder="username"
              />
              {errors.username && (
                <p className="text-red-600 text-xs font-bold mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              {/* <label className="block text-sm font-bold text-black mb-2">
                Password
              </label> */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 border-4 ${errors.password ? 'border-red-500' : 'border-black'} focus:ring-0 focus:outline-none bg-white font-medium`}
                placeholder="password"
              />
              {errors.password && (
                <p className="text-red-600 text-xs font-bold mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Sign In
            </button>

          </form>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm text-black font-bold hover:underline inline-flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
