import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Home", href: "/", key: "/" },
    { name: "About Us", href: "/about", key: "/about" },
    { name: "Bikes", href: "/bikes", key: "/bikes" },
    { name: "Tyres", href: "/tyres", key: "/tyres" },
    { name: "Feedback", href: "/feedback", key: "/feedback" },
    { name: "Contact Us", href: "/contact", key: "/contact" },
  ];

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-neutral-800 text-white px-6 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Open Hours: Mon - Fri 8.00 am - 6.00 pm</span>
        </div>
        <div className="italic text-lg tracking-wide font-mono">A key to happiness.</div>
      </div>

      {/* Main Navigation */}
      <div className="bg-black text-white px-6 py-8 flex justify-center items-center">
        <nav className="flex gap-8 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={`hover:text-orange-500 ${
                currentPath === item.key ? "text-red-500" : "text-gray-400"
              } text-sm transition-colors duration-200`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
