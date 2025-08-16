import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/nav-logo.png";

const Navbar = () => {
  const { user, logout } = useApp();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-white shadow-md">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="PEAK FIT Logo" 
                className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/')}
              />
            </Link>
          </div>

          {/* Right side navigation and user actions */}
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                Contact
              </NavLink>
            </div>

            {/* User Actions */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2"
                >
                  <div className="text-right">
                    <span className="text-blue-700 font-semibold block">{user.name || 'User'}</span>
                    <span className="text-blue-600 text-sm block">{user.email}</span>
                  </div>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-bold text-blue-700 hover:text-blue-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="font-semibold bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button
              onClick={() => setShowMenu(true)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Features Navigation Bar */}
      {user && (
        <div className="bg-blue-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-8 h-12">
              <Link
                to="/dashboard"
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/metrics"
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                Health Metrics
              </Link>
              <Link
                to="/progress"
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                Progress
              </Link>
              <Link
                to="/workout-meal-plans"
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                Meal Plans
              </Link>
              <Link
                to="/hydration-tracker"
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                Hydration Tracker
              </Link>
              <Link
                to="/sleep-tracker"
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                Sleep Tracker
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="PEAK FIT Logo" 
                className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  navigate('/');
                  setShowMenu(false);
                }}
              />
            </Link>
            <button
              onClick={() => setShowMenu(false)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="px-4 py-6">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setShowMenu(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setShowMenu(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setShowMenu(false)}
              >
                Contact
              </Link>
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900"
                    onClick={() => setShowMenu(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-700 hover:text-gray-900"
                    onClick={() => setShowMenu(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-gray-900"
                    onClick={() => setShowMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-gray-900"
                    onClick={() => setShowMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-700 hover:text-gray-900"
                    onClick={() => setShowMenu(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMenu(false);
                    }}
                    className="text-left text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
