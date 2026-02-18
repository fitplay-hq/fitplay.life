"use client";

import React from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Image from "next/image";
import { toast } from "sonner";
import { useAtomValue, useSetAtom } from "jotai";
import {
  addToCartAtom,
  cartAnimationAtom,
  getCartItemQuantityAtom,
  updateCartQuantityByProductAtom,
} from "@/lib/store";
import { useUser } from "@/app/hooks/useUser";
import { getLowestCredits, getLowestMRP } from "@/lib/utils";
import { ProductWithVariant } from "@/lib/types";

interface ProductCardProps {
  product: ProductWithVariant;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useUser();

  const addToCart = useSetAtom(addToCartAtom);
  const updateCartQuantityByProduct = useSetAtom(
    updateCartQuantityByProductAtom
  );
  const getCartItemQuantity = useAtomValue(getCartItemQuantityAtom);
  const setCartAnimation = useSetAtom(cartAnimationAtom);

  // 🔹 Get lowest variant
  const lowestVariant = product.variants?.reduce((lowest, current) =>
    current.mrp < lowest.mrp ? current : lowest
  );

  const quantity = getCartItemQuantity(product.id, lowestVariant?.id);

  // 🔹 Add To Cart Logic
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Login Required", {
        description: "You need to log in to add items to your cart.",
      });
      return;
    }

    const result = addToCart({
      product,
      selectedVariant: lowestVariant?.variantValue,
      variantId: lowestVariant?.id,
    });

    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 600);

    if (result.wasUpdated) {
      toast.success(`${product.name} quantity updated`);
    } else if (result.isNewItem) {
      toast.success(`${product.name} added to cart`);
    }
  };

  return (
    <div className="group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-3xl blur-sm opacity-20 group-hover:opacity-40 transition-all duration-300"></div>

          <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-auto lg:h-[440px]">
            
            {/* Image */}
            <div className="relative overflow-hidden bg-gray-50 aspect-square">
              <Image
    src={product.images[0] || "/placeholder.png"}
    alt={product.name}
    fill
    sizes="(max-width: 768px) 100vw, 25vw"
    className="object-cover"
  />
             
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow space-y-3">
              <p className="text-xs text-emerald-600 font-semibold   py-1 rounded-full">
                {(product as any).vendor?.name || "FitPlay"}
              </p>

              <h3 className="text-gray-900 font-bold text-base line-clamp-2 group-hover:text-emerald-700 transition-colors">
                {product.name}
              </h3>

              {/* Price */}
              <div className="mt-auto mb-3">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-lg font-bold text-emerald-600">
                    {getLowestCredits(product)}
                  </span>
                  <span className="text-xs font-medium text-emerald-600">
                    credits
                  </span>
                </div>

                <span className="text-xs text-gray-500 line-through">
                  ₹{getLowestMRP(product)}
                </span>
              </div>

              {/* Cart Controls */}
              <div onClick={(e) => e.preventDefault()}>
                {quantity === 0 ? (
                  <Button
                    size="sm"
                    onClick={handleAddToCart}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center border border-emerald-300 rounded-lg bg-emerald-50 w-full h-9">
                    <button
                      onClick={() =>
                        updateCartQuantityByProduct({
                          productId: product.id,
                          quantity: Math.max(0, quantity - 1),
                          variantId: lowestVariant?.id,
                        })
                      }
                      className="flex-1 flex justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="flex-1 text-center font-medium">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateCartQuantityByProduct({
                          productId: product.id,
                          quantity: quantity + 1,
                          variantId: lowestVariant?.id,
                        })
                      }
                      className="flex-1 flex justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
