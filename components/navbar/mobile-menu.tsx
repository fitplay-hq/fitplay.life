"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, Shield, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAtomValue } from "jotai";
import { cartCountAtom } from "@/lib/store";
import { useWallet } from "@/app/hooks/useWallet";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Wellness Store" },
  { href: "/benefits", label: "My Benefits" },
  { href: "/support", label: "Help & Support" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const cartCount = useAtomValue(cartCountAtom);
  const { credits, isLoading: walletLoading } = useWallet();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden p-3 rounded-full hover:bg-gray-100">
          <Menu className="h-5 w-5 text-gray-600" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-white">
        <div className="flex flex-col space-y-6 mt-8">
          {/* Credits Display */}
          <div className="flex items-center space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <Coins className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">
              {walletLoading ? "..." : credits} Credits
            </span>
          </div>

          {/* Navigation Links */}
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Cart Link */}
          <Link
            href="/cart"
            className={`flex items-center justify-between px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
              pathname === "/cart"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </div>
            {cartCount > 0 && (
              <span className="bg-emerald-600 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Partner Link */}
          <Link
            href="/partner"
            className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-200 border border-emerald-200"
            onClick={() => setIsOpen(false)}
          >
            <Shield className="h-5 w-5" />
            <span>Partner with Us</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
