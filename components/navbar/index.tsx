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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                  <Coins className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    {walletLoading ? "..." : credits}
                  </span>
                </div>
              </Link>
            )}

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

            {/* Admin Portal Button */}
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex border-red-400 text-red-600 hover:bg-red-50"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>

            {/* Mobile Menu */}
            <MobileMenu navItems={NAV_ITEMS} />
          </div>
        </div>
      </div>
    </nav>
  );
}
