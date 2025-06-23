'use client';

import Link from 'next/link';
export default function Header() {
  return (
    <header className="container mx-auto fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-transparent  text-white z-50">
    
    <div className="text-5xl font-semibold tracking-wide">
      V<span className="italic">ă</span>
    </div>


    <button className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
      <div className="space-y-1">
        <span className="block w-5 h-0.5 bg-white"></span>
        <span className="block w-5 h-0.5 bg-white"></span>
      </div>
    </button>

    
  </header>
  );
}
