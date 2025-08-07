import React, { useState, useEffect } from "react";
import { Clock, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Custom hook to get localStorage values safely
const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setValue(item ?? defaultValue);
    } catch (error) {
      console.log("localStorage not available");
    }
  }, [key]);

  return value;
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminToken = useLocalStorage("adminToken");
  const storedUsername = useLocalStorage("adminUsername");

  const isAdminLoggedIn = !!adminToken;
  const username = storedUsername;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/", key: "/" },
    { name: "About Us", href: "/about", key: "/about" },
    { name: "Bikes", href: "/bikes", key: "/bikes" },
    { name: "Tyres", href: "/tyres", key: "/tyres" },
    {
      name: "Feedback",
      href: "https://www.google.com/maps/place/Bajaj+Auto+(Bharat+Automobiles,+Bhubaneshwar,+Nayapalli)/@20.2907399,85.808734,15.85z/data=!4m16...",
      key: "/feedback",
    },
    { name: "Contact Us", href: "/contact", key: "/contact" },
  ];

  return (
    <div className="w-full">
      <header className="w-full">
        {/* Top Bar - Hidden on mobile, visible on desktop */}
        <div className="hidden sm:block bg-neutral-800 text-white px-4 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-center sm:text-left">Open Hours: Mon - Fri 8.00 am - 6.00 pm</span>
            </div>
            <div className="italic text-sm sm:text-lg tracking-wide font-mono">
              A key to happiness.
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-black text-white px-4 py-4">
          {/* Mobile Layout */}
          <div className="sm:hidden flex justify-between items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-orange-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Tagline */}
            <div className="italic text-sm tracking-wide font-mono text-center flex-1">
              A key to happiness.
            </div>

            {/* Admin Info on Mobile */}
            {isAdminLoggedIn && (
              <div className="flex items-center gap-2">
                <span className="text-white text-xs font-semibold max-w-20 truncate">
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex justify-between items-center">
            {/* Left Spacer */}
            <div className="w-32" />

            {/* Centered Navigation */}
            <nav className="flex gap-8 text-lg">
              {navItems.map((item) =>
                item.href.startsWith("http") ? (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-orange-500 ${
                      location.pathname === item.key
                        ? "text-red-500"
                        : "text-gray-400"
                    } text-sm transition-colors duration-200`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.key}
                    to={item.href}
                    className={`hover:text-orange-500 ${
                      location.pathname === item.key
                        ? "text-red-500"
                        : "text-gray-400"
                    } text-sm transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            {/* Admin Username Display */}
            <div className="w-32 flex justify-end">
              {isAdminLoggedIn && (
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm font-semibold">
                    {username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-neutral-900 border-t border-neutral-700">
            <nav className="flex flex-col">
              {navItems.map((item) =>
                item.href.startsWith("http") ? (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 border-b border-neutral-800 hover:bg-neutral-800 ${
                      location.pathname === item.key
                        ? "text-red-500 bg-neutral-800"
                        : "text-gray-300"
                    } transition-colors duration-200`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 border-b border-neutral-800 hover:bg-neutral-800 ${
                      location.pathname === item.key
                        ? "text-red-500 bg-neutral-800"
                        : "text-gray-300"
                    } transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                )
              )}
              
              {/* Mobile Top Bar Info */}
              <div className="px-4 py-3 border-b border-neutral-800 text-gray-400">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Open Hours: Mon - Fri 8.00 am - 6.00 pm</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}