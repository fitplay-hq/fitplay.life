"use client";

import Link from "next/link";
import { User, Shield, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { CartButton } from "./cart-button";
import { NavLinks } from "./nav-links";
import Logo from "../logo";
import { useUser } from "@/app/hooks/useUser";
import { useWallet } from "@/app/hooks/useWallet";

interface NavItem {
  name: string;
  path: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Wellness Store", path: "/store" },
  { name: "My Benefits", path: "/benefits" },
  { name: "Help & Support", path: "/support" },
] as const;

export function Navbar() {
  const { isAuthenticated } = useUser();
  const { credits, isLoading: walletLoading } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <NavLinks
            items={NAV_ITEMS}
            className="hidden md:flex items-center space-x-8"
          />

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && <CartButton />}

            {isAuthenticated && (
              <Link href="/benefits">
                <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full hover:bg-emerald-100 transition-all duration-200 cursor-pointer">
                  <Coins className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">
                    {walletLoading ? "..." : credits}
                  </span>
                </div>
              </Link>
            )}

            {/* Partner with Us Button */}
            <Link href="/partner">
              <Button
                size="sm"
                className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-medium"
              >
                Partner with Us
              </Button>
            </Link>

            {/* Profile Icon */}
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="p-3 rounded-full hover:bg-gray-100">
                <User className="w-5 h-5 text-gray-600" />
              </Button>
            </Link>

            {/* Admin Portal Button */}
            <Link href="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-full"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
