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
    { name: "Feedback", href: "https://www.google.com/maps/place/Bajaj+Auto+(Bharat+Automobiles,+Bhubaneshwar,+Nayapalli)/@20.2907399,85.808734,15.85z/data=!4m16!1m7!3m6!1s0x3a1909f14e56a9c5:0x915c58f75df63281!2sNAJ+MOTORS!8m2!3d20.2894055!4d85.8095674!16s%2Fg%2F11lgczjbh9!3m7!1s0x3a1909b19a3cda0b:0x821db4a3340f8c2d!8m2!3d20.2902578!4d85.8172452!9m1!1b1!16s%2Fg%2F11c522mnls?entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D", key: "/feedback" },
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
