"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { User, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    // Ensure initial state is correct
    setIsScrolled(false);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About us', href: '/about' },
    { label: 'Wellness Store', href: '/store' },
  ];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" 
      style={{ 
        background: isScrolled ? undefined : 'transparent !important',
        backgroundColor: isScrolled ? undefined : 'transparent !important' 
      }}
    >
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-teal-950/90 to-emerald-950/85 backdrop-blur-md border-b border-emerald-400/20 shadow-lg shadow-emerald-500/30 transition-all duration-500"></div>
      )}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg blur transition-opacity duration-500 ${
              isScrolled ? 'opacity-30' : 'opacity-20 group-hover:opacity-25'
            }`}></div>
            <div className={`relative px-3 py-2 rounded-lg transition-all duration-500 ${
              isScrolled 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                : 'bg-gradient-to-br from-emerald-500/50 to-teal-600/50'
            }`}>
              <Sparkles className={`w-6 h-6 transition-colors duration-500 ${
                isScrolled ? 'text-white' : 'text-white/90'
              }`} />
            </div>
          </div>
          <span className={`text-2xl font-bold bg-clip-text text-transparent transition-all duration-500 ${
            isScrolled
              ? 'bg-gradient-to-r from-emerald-300 to-teal-200'
              : 'bg-gradient-to-r from-emerald-200 to-teal-100 group-hover:from-emerald-100 group-hover:to-teal-50'
          }`}>
            FitPlay
          </span>
          <span className={`text-sm font-semibold transition-colors duration-500 ${
            isScrolled ? 'text-emerald-300' : 'text-emerald-200/90 group-hover:text-emerald-100'
          }`}>.life</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-medium text-sm transition-all duration-300 relative group ${
                isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              <span className="relative">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/partner">
            <button className={`relative group px-6 py-2.5 overflow-hidden transition-all duration-500 rounded-full ${
              isScrolled ? 'shadow-lg shadow-emerald-500/20' : 'shadow-lg shadow-emerald-500/10'
            }`}>
              <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 rounded-full ${
                isScrolled
                  ? 'from-emerald-600 to-teal-600'
                  : 'from-emerald-600/60 to-teal-600/60 group-hover:from-emerald-500/70 group-hover:to-teal-500/70'
              }`}></div>
              <div className={`absolute inset-0.5 rounded-full transition-colors duration-500 ${
                isScrolled ? 'bg-slate-900/80' : 'bg-slate-900/60'
              }`}></div>
              <span className={`relative font-semibold text-sm transition-colors duration-500 ${
                isScrolled ? 'text-white' : 'text-white/90'
              }`}>Partner with Us</span>
            </button>
          </Link>

          <Link href="/profile">
            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
              isScrolled
                ? 'bg-emerald-400/30 border border-emerald-400/60'
                : 'bg-emerald-400/20 border border-emerald-400/40 hover:bg-emerald-400/25 hover:border-emerald-400/50'
            } group`}>
              <User className={`w-5 h-5 transition-colors duration-500 ${
                isScrolled ? 'text-emerald-200 group-hover:text-emerald-100' : 'text-emerald-200/90 group-hover:text-emerald-100'
              }`} />
            </button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isScrolled
              ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
              : 'bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30'
          }`}
        >
          {isOpen ? (
            <X className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-white/90'}`} />
          ) : (
            <Menu className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-white/90'}`} />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-slate-900/95 via-teal-950/80 to-emerald-950/70 border-b border-emerald-400/20 backdrop-blur-xl animate-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-gray-300 hover:text-white font-medium py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link href="/partner" onClick={() => setIsOpen(false)}>
                <button className="w-full relative group px-6 py-2.5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300 rounded-full"></div>
                  <div className="absolute inset-0.5 bg-slate-900 rounded-full"></div>
                  <span className="relative text-white font-semibold text-sm">Partner with Us</span>
                </button>
              </Link>

              <Link href="/profile" onClick={() => setIsOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <User className="w-5 h-5 text-emerald-300" />
                  <span className="text-white font-medium">Profile</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


