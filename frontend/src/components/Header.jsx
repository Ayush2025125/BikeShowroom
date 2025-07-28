import React from 'react';
import { Clock } from 'lucide-react';

export default function Header() {
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
      <div className="bg-black text-white px-6 py-7 flex justify-center items-center">
        {/* Nav Links */}
        <nav className="flex gap-8 text-lg">
          <a href="/home" className="hover:text-orange-500 text-orange-500">Home</a>
          <a href="/aboutus" className="hover:text-orange-500 text-gray-400">About Us</a>
          <a href="#" className="hover:text-orange-500 text-gray-400">Bikes</a>
          <a href="#" className="hover:text-orange-500 text-gray-400">Tyres</a>
          <a href="#" className="hover:text-orange-500 text-gray-400">Feedback</a>
          <a href="#" className="hover:text-orange-500 text-gray-400">Contact Us</a>
        </nav>
      </div>
    </header>
  );
}
