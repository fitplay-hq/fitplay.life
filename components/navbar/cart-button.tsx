import { Button } from "@/components/ui/button";
import { cartAnimationAtom, cartCountAtom } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function CartBadge({count}: {
    count: number;
}) {
  if (count <= 0) return null;

  return (
    <span 
      className={cn("absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300", cartAnimationAtom && "animate-pulse scale-125")}
      aria-label={`${count} items in cart`}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};

export function CartButton({ className = '' }) {
  const cartCount = useAtomValue(cartCountAtom)
  const cartAnimation = useAtomValue(cartAnimationAtom);

  return (
    <Link 
      href="/cart" 
      className={`relative focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-sm ${className}`}
    >
      <Button 
        variant="ghost" 
        size="sm" 
        className={cn("p-2 transition-transform duration-300", cartAnimation && "animate-bounce scale-110")}
        aria-label={`Shopping cart with ${cartCount} items`}
      >
        <ShoppingCart className="w-6 h-6 md:w-5 md:h-5" />
        <CartBadge count={cartCount} />
      </Button>
    </Link>
  );
}
