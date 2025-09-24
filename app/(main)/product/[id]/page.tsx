"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { toast } from "sonner";
import {
  addToCartAtom,
  cartAnimationAtom,
  addToWishlistAtom,
  removeFromWishlistAtom,
  isInWishlistAtom,
} from "@/lib/store";
import { useSetAtom, useAtomValue } from "jotai";
import { useProduct } from "@/app/hooks/useProduct";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const addToCart = useSetAtom(addToCartAtom);
  const setCartAnimation = useSetAtom(cartAnimationAtom);
  const addToWishlist = useSetAtom(addToWishlistAtom);
  const removeFromWishlist = useSetAtom(removeFromWishlistAtom);
  const isInWishlist = useAtomValue(isInWishlistAtom);
  const { product, isLoading, error } = useProduct(id);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

  // Helper function to format category names
  const formatCategoryName = (category: string) => {
    return category
      .replace(/_/g, " ") // Replace underscores with spaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "); // Capitalize each word
  };

  // Helper functions to get selected variant MRP and credits
  const getSelectedVariantMRP = () => {
    if (!product || !product?.variants?.length) return 0;

    if (!selectedVariant) {
      return (product.variants[0] as any)?.mrp || 0;
    }

    // Find the variant that matches the selected variant
    const matchingVariant = product.variants.find(
      (variant: any) => variant.variantValue === selectedVariant
    );

    return (
      (matchingVariant as any)?.mrp || (product.variants[0] as any)?.mrp || 0
    );
  };

  const getSelectedVariantCredits = () => {
    return getSelectedVariantMRP() * 2;
  };

  const selectedVariantMRP = getSelectedVariantMRP();
  const selectedVariantCredits = getSelectedVariantCredits();

  const handleAddToCart = () => {
    if (!product) return;

    // Determine the correct variantId to use
    let variantIdToUse = selectedVariantId;
    if (!variantIdToUse && product.variants && product.variants.length > 0) {
      // For products with variants but none selected, use the first variant
      variantIdToUse = (product.variants[0] as any).id;
    }

    for (let i = 0; i < quantity; i++) {
      const result = addToCart({
        product,
        selectedVariant:
          selectedVariant ||
          (product.variants && product.variants.length > 0
            ? (product.variants[0] as any).variantValue
            : ""),
        variantId: variantIdToUse,
      });
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 600);

      // Show custom toast notification
      if (result.wasUpdated) {
        toast.success(`${product.name} quantity updated!`, {
          description: `Now you have ${result.newQuantity} in your cart.`,
          duration: 3000,
        });
      } else if (result.isNewItem) {
        toast.success(`${product.name} added to cart!`, {
          description: `${
            selectedVariantCredits * quantity
          } credits - Great choice for your wellness journey!`,
          duration: 3000,
        });
      }
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    const isInWish = isInWishlist(product.id, selectedVariant);

    if (isInWish) {
      // Remove from wishlist
      const variantKey = selectedVariant
        ? `${product.id}-${selectedVariant}`
        : product.id;
      removeFromWishlist(variantKey);
      toast.success(`${product.name} removed from wishlist!`, {
        duration: 2000,
      });
    } else {
      // Add to wishlist
      const result = addToWishlist(product, selectedVariant);
      if (result.wasAdded) {
        toast.success(`${product.name} added to wishlist!`, {
          duration: 2000,
        });
      } else {
        toast.info(result.message, {
          duration: 2000,
        });
      }
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <p className="text-red-600 mb-6 text-lg">
            Error loading product: {error.message}
          </p>
          <Link href="/store">
            <Button
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              Back to Store
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <p className="text-gray-600 mb-6 text-lg">Product not found</p>
          <Link href="/store">
            <Button variant="outline">Back to Store</Button>
          </Link>
        </div>
      </div>
    );
  }

  const faqs = [
    {
      question: "How quickly can I change weights?",
      answer:
        "The dial system allows you to change weights in under 3 seconds. Simply turn the dial to your desired weight and lift.",
    },
    {
      question: "What is the warranty coverage?",
      answer:
        "This product comes with a 2-year manufacturer warranty covering defects in materials and workmanship.",
    },
    {
      question: "Is assembly required?",
      answer:
        "Minimal assembly required. The dumbbells come pre-assembled, you just need to set up the storage tray.",
    },
    {
      question: "Can I use these for all muscle groups?",
      answer:
        "Yes, these adjustable dumbbells are perfect for full-body workouts including arms, chest, back, shoulders, and legs.",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link
          href="/store"
          className="hover:text-emerald-600 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Store
        </Link>
        <span>/</span>
        <span>{formatCategoryName(product.category)}</span>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-3">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 aspect-square w-16 h-16 rounded border-2 transition-colors ${
                  selectedImage === index
                    ? "border-emerald-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          {/* Title and Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm text-gray-600">
                by {product.vendorName}
              </span>
              {product.availableStock > 0 && (
                <span className="text-xs text-green-600 font-medium">
                  In Stock
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl text-gray-900 font-medium leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.avgRating || 0)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.avgRating || 0} ({product.noOfReviews || 0})
            </span>
          </div>

          {/* Price */}
          <div className="py-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">
                {selectedVariantCredits} credits
              </span>
              <span className="text-lg text-gray-500 line-through">
                ₹{selectedVariantMRP}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Use your company wellness credits
            </p>
          </div>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="py-2">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Options:
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant: any) => (
                  <Button
                    key={variant.variantValue}
                    variant={
                      selectedVariant === variant.variantValue
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setSelectedVariant(variant.variantValue);
                      setSelectedVariantId(variant.id);
                    }}
                    className={
                      selectedVariant === variant.variantValue
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                  >
                    {variant.variantValue}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="py-2">
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="py-2">
            <div className="flex items-center space-x-4 mb-4">
              <label className="text-sm font-medium text-gray-900">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                >
                  -
                </button>
                <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 mb-3"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart - {selectedVariantCredits * quantity} credits
            </Button>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={`flex-1 border-gray-300 hover:bg-gray-50 ${
                  isInWishlist(product?.id || "", selectedVariant)
                    ? "text-red-600 border-red-300 hover:bg-red-50"
                    : "text-gray-700"
                }`}
                onClick={handleWishlistToggle}
              >
                <Heart
                  className={`w-4 h-4 mr-1 ${
                    isInWishlist(product?.id || "", selectedVariant)
                      ? "fill-current"
                      : ""
                  }`}
                />
                {isInWishlist(product?.id || "", selectedVariant)
                  ? "Saved"
                  : "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          {/* Product Details Sections */}
          <div className="mt-8 space-y-6">
            {/* Specifications - Only show if specifications exist and are not empty */}
            {product.specifications &&
            typeof product.specifications === "object" &&
            product.specifications !== null &&
            Object.keys(product.specifications).length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Specifications
                </h3>
                <div className="space-y-2">
                  {Object.entries(
                    product.specifications as Record<string, string>
                  ).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between text-sm py-1"
                    >
                      <span className="text-gray-600">{key}</span>
                      <span className="text-gray-900 font-medium">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Partner Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FF</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.vendorName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Trusted Wellness Partner
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {product.vendorName} has been providing premium wellness
                products for over 15 years, helping millions achieve their
                health goals.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>
                    {product.avgRating ? product.avgRating.toFixed(1) : "4.8"}{" "}
                    Partner Rating
                  </span>
                </div>
                <div>{product.noOfReviews || "500+"} Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-gray-100"
            >
              <AccordionTrigger className="text-left text-sm py-3">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 pb-3">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Support */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-3">
          Our wellness experts are here to help you make the right choice
        </p>
        <Link href="/support">
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white"
          >
            Contact Support
          </Button>
        </Link>
      </div>
    </div>
  );
}
