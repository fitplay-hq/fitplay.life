"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { User, Menu, X, Shield, Coins } from 'lucide-react';
import { CartButton } from "./cart-button";
import { useUser } from "@/app/hooks/useUser";
import { useWallet } from "@/app/hooks/useWallet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useUser();
  const { credits, isLoading: walletLoading } = useWallet();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Wellness Store', href: '/store' },
    { label: 'My Benefits', href: '/benefits' },
    { label: 'Help & Support', href: '/support' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-800/90 backdrop-blur-xl border-b border-emerald-500/20 shadow-xl shadow-emerald-500/10"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg">
              <Image
                src="/0fb9f65e2661db2b87893ff105f63e194a80db14.png"
                alt="FitPlay Logo"
                width={32}
                height={32}
                className="rounded-lg object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-200 group-hover:from-emerald-200 group-hover:to-teal-100 transition-all duration-300">
              FitPlay
            </span>
            <span className="text-sm font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">.life</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-medium text-sm transition-all duration-300 relative group text-gray-200 hover:text-white"
            >
              <span className="relative">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated && <CartButton />}

          {isAuthenticated && (
            <Link href="/benefits">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 bg-emerald-500/20 border border-emerald-400/50 hover:bg-emerald-500/30 hover:border-emerald-400/70">
                <Coins className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-semibold text-emerald-200">
                  {walletLoading ? "..." : credits}
                </span>
              </div>
            </Link>
          )}

          <Link href="/partner">
            <button className="relative group px-6 py-2.5 overflow-hidden transition-all duration-300 rounded-full shadow-lg shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300 rounded-full"></div>
              <span className="relative font-semibold text-sm text-white">Partner with Us</span>
            </button>
          </Link>

          <Link href="/profile">
            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-emerald-500/20 border border-emerald-400/50 hover:bg-emerald-500/30 hover:border-emerald-400/70 group">
              <User className="w-5 h-5 transition-colors duration-300 text-emerald-300 group-hover:text-emerald-200" />
            </button>
          </Link>

          <Link href="/admin">
            <button className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 bg-slate-700/40 border border-slate-600/40 text-gray-300 hover:bg-slate-600/50 hover:text-gray-200">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Admin</span>
            </button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-slate-700/40 border border-slate-600/40 hover:bg-slate-600/50 hover:border-slate-500/50"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/10 backdrop-blur-xl animate-in slide-in-from-top-2">
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
              {isAuthenticated && (
                <Link href="/benefits" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-400/20 border border-emerald-400/40">
                    <Coins className="w-5 h-5 text-emerald-300" />
                    <span className="text-emerald-200 font-medium">
                      Credits: {walletLoading ? "..." : credits}
                    </span>
                  </div>
                </Link>
              )}

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

              <Link href="/admin" onClick={() => setIsOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">Admin Portal</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
