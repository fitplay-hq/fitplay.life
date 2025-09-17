"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAtomValue } from "jotai";
import { cartCountAtom } from "@/lib/store";

interface NavItem {
  name: string;
  path: string;
}

export function MobileMenu(props: { navItems: readonly NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = useCallback((path: string) => pathname === path, [pathname]);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const cartCount = useAtomValue(cartCountAtom);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <div className="flex flex-col space-y-4 mt-8">
          {props.navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={handleClose}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-emerald-50 text-emerald-600 font-medium"
                  : "text-foreground hover:bg-gray-50"
              }`}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/cart"
            onClick={handleClose}
            className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
              isActive("/cart")
                ? "bg-emerald-50 text-emerald-600 font-medium"
                : "text-foreground hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center">
              <ShoppingCart className="w-4 h-4 mr-3" />
              My Cart
            </span>
            {cartCount > 0 && (
              <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <div className="mt-6 px-4">
            <Link href="/partner" onClick={handleClose}>
              <Button
                variant="outline"
                className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              >
                Partner with Us
              </Button>
            </Link>
          </div>

          <div className="mt-4 px-4">
            <Link href="/admin" onClick={handleClose}>
              <Button
                variant="outline"
                className="w-full border-red-400 text-red-600 hover:bg-red-50"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
