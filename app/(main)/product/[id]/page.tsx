"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Plus,
  Minus,
} from "lucide-react";
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
  getCartItemQuantityAtom,
  updateCartQuantityByProductAtom,
} from "@/lib/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useProduct } from "@/app/hooks/useProduct";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const getCartItemQuantity = useAtomValue(getCartItemQuantityAtom);
  const addToCart = useSetAtom(addToCartAtom);
  const updateCartQuantityByProduct = useSetAtom(
    updateCartQuantityByProductAtom
  );
  const setCartAnimation = useSetAtom(cartAnimationAtom);
  const { product, isLoading, error } = useProduct(id);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      const result = addToCart(product);
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
          description: `₹${(product.price / 100).toFixed(
            2
          )} - Great choice for your wellness journey!`,
          duration: 3000,
        });
      }
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
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
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge
                variant="secondary"
                className="text-emerald-600 bg-emerald-50"
              >
                {product.brand || "FitPlay"}
              </Badge>
              {product.availableStock > 0 && (
                <Badge
                  variant="secondary"
                  className="text-green-600 bg-green-50"
                >
                  In Stock ({product.availableStock})
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl text-primary mb-4">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.avgRating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {product.avgRating || 0} ({product.noOfReviews || 0} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl text-primary font-bold">
                ₹{(product.price / 100).toFixed(2)}
              </span>
              <Badge className="bg-emerald-100 text-emerald-800">
                Great Value
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              Premium quality product from {product.vendorName}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">{product.description}</p>

            <div>
              <h3 className="font-medium text-primary mb-2">
                Product Details:
              </h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">SKU:</span> {product.sku}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Vendor:</span>{" "}
                  {product.vendorName}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Stock:</span>{" "}
                  {product.availableStock} units
                </div>
                {product.tags.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Tags:</span>{" "}
                    {product.tags.join(", ")}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {getCartItemQuantity(product.name, product.brand || "FitPlay") ===
            0 ? (
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{((product.price * quantity) / 100).toFixed(2)}
              </Button>
            ) : (
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center border-2 border-emerald-300 rounded-lg bg-emerald-50">
                  <button
                    onClick={() =>
                      updateCartQuantityByProduct({
                        title: product.name,
                        brand: product.brand || "FitPlay",
                        quantity:
                          getCartItemQuantity(
                            product.name,
                            product.brand || "FitPlay"
                          ) - 1,
                      })
                    }
                    className="px-4 py-3 hover:bg-emerald-100 text-emerald-700 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 text-emerald-800 font-bold text-lg min-w-[60px] text-center">
                    {getCartItemQuantity(
                      product.name,
                      product.brand || "FitPlay"
                    )}
                  </span>
                  <button
                    onClick={() =>
                      updateCartQuantityByProduct({
                        title: product.name,
                        brand: product.brand || "FitPlay",
                        quantity:
                          getCartItemQuantity(
                            product.name,
                            product.brand || "FitPlay"
                          ) + 1,
                      })
                    }
                    className="px-4 py-3 hover:bg-emerald-100 text-emerald-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              >
                <Heart className="w-5 h-5 mr-2" />
                Save for Later
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Sections */}
      <div className="mt-16 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium text-primary mb-4">
                Product Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Product ID</span>
                  <span className="text-primary">{product.id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">SKU</span>
                  <span className="text-primary">{product.sku}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Category</span>
                  <span className="text-primary">{product.category}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Stock Status</span>
                  <span className="text-primary">
                    {product.availableStock > 0
                      ? `${product.availableStock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-primary">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">FF</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary">
                    {product.brand}
                  </h3>
                  <p className="text-gray-600">Trusted Fitness Partner</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                FlexFit has been providing premium fitness equipment for over 15
                years, helping millions achieve their wellness goals.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8 Brand Rating</span>
                </div>
                <div>500+ Products</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-medium text-primary mb-6">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-medium text-primary mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Our wellness experts are here to help you make the right choice
            </p>
            <Link href="/support">
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white"
              >
                Contact Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
