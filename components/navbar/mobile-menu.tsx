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
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col space-y-4 mt-8">
          {/* Credits Display */}
          <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <Coins className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              {walletLoading ? "..." : credits} Credits
            </span>
          </div>

          {/* Navigation Links */}
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Cart Link */}
          <Link
            href="/cart"
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              pathname === "/cart"
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
            </div>
            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Partner Link */}
          <Link
            href="/partner"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Shield className="h-4 w-4" />
            <span>Partner</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
