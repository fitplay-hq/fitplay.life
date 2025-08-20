"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface NavbarProps {
  cartCount: number;
  cartAnimation?: boolean;
}

export function Navbar({ cartCount, cartAnimation = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Wellness Store', path: '/store' },
    { name: 'My Benefits', path: '/benefits' },
    { name: 'Help & Support', path: '/support' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
          {/* TODO: request assets from figma */}
            {/* <img 
              src={} 
              alt="FitPlay" 
              className="h-15 w-auto"
            /> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`transition-colors hover:text-emerald-600 ${
                  isActive(item.path) ? 'text-emerald-600 font-medium' : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon - Desktop */}
            <Link href="/cart" className="relative hidden md:block">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-2 transition-transform duration-300 ${
                  cartAnimation ? 'animate-bounce scale-110' : ''
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                    cartAnimation ? 'animate-pulse scale-125' : ''
                  }`}>
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart Icon - Mobile */}
            <Link href="/cart" className="relative md:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-2 transition-transform duration-300 ${
                  cartAnimation ? 'animate-bounce scale-110' : ''
                }`}
              >
                <ShoppingCart className="w-6 h-6 text-foreground" />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                    cartAnimation ? 'animate-pulse scale-125' : ''
                  }`}>
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Partner with Us Button */}
            <Link href="/partner">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              >
                Partner with Us
              </Button>
            </Link>

            {/* Profile Icon */}
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="p-2">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-emerald-50 text-emerald-600 font-medium'
                          : 'text-foreground hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Cart link in mobile menu */}
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                      isActive('/cart')
                        ? 'bg-emerald-50 text-emerald-600 font-medium'
                        : 'text-foreground hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-3" />
                      My Cart
                    </span>
                    {cartCount > 0 && (
                      <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <div className="mt-6 px-4">
                    <Link href="/partner" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="outline" 
                        className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                      >
                        Partner with Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
