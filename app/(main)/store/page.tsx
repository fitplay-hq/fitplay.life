"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { toast } from "sonner";
import { useAtomValue, useSetAtom } from "jotai";
import {
  addToCartAtom,
  cartAnimationAtom,
  getCartItemQuantityAtom,
  updateCartQuantityByProductAtom,
} from "@/lib/store";
import { useUser } from "@/app/hooks/useUser";
import { useProducts } from "@/app/hooks/useProducts";
import ProductCard from "./ProductCard";

export default function WellnessStore() {
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { products, isLoading: productsLoading, error } = useProducts();

  const addToCart = useSetAtom(addToCartAtom);
  const updateCartQuantityByProduct = useSetAtom(
    updateCartQuantityByProductAtom
  );
  const getCartItemQuantity = useAtomValue(getCartItemQuantityAtom);

  const setCartAnimation = useSetAtom(cartAnimationAtom);

  const handleAddToCart = (product: any) => {
    // Check if user is logged in
    if (!isAuthenticated) {
      toast.error("Login Required", {
        description: "You need to log in to add items to your cart.",
        duration: 5000,
        action: {
          label: "Login",
          onClick: () => {
            window.location.href = "/login";
          },
        },
      });
      return;
    }

    const result = addToCart(product);

    // Trigger cart animation
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
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandsOpen, setBrandsOpen] = useState(true);

  // Generate dynamic categories from products
  const dynamicCategories = Array.from(
    new Set(products.map((product) => product.category))
  ).map((category) => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize first letter
    count: products.filter((p) => p.category === category).length,
  }));

  const categories = [
    { value: "all", label: "All Categories", count: products.length },
    ...dynamicCategories,
  ];

  // Generate dynamic brands from products
  const brands = Array.from(
    new Set(products.map((product) => product.brand).filter(Boolean))
  ).map((brand) => ({
    name: brand as string,
    count: products.filter((p) => p.brand === brand).length,
  }));

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand &&
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesBrand =
      selectedBrands.length === 0 ||
      (product.brand && selectedBrands.includes(product.brand));
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.avgRating || 0) - (a.avgRating || 0);
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0; // Featured - keep original order
    }
  });

  const QuantitySelector = ({ product }: { product: any }) => {
    const quantity = getCartItemQuantity(product.id);

    if (quantity === 0) {
      return (
        <Button
          size="sm"
          onClick={() => handleAddToCart(product)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Add to Cart
        </Button>
      );
    }

    return (
      <div className="flex items-center border border-emerald-300 rounded-lg bg-emerald-50 w-full">
        <button
          onClick={() =>
            updateCartQuantityByProduct({
              productId: product.id,
              quantity: Math.max(0, quantity - 1),
            })
          }
          className="px-3 py-2 hover:bg-emerald-100 text-emerald-700 transition-colors flex-1 flex items-center justify-center"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="px-4 py-2 text-emerald-800 font-medium min-w-[40px] text-center border-x border-emerald-200">
          {quantity}
        </span>
        <button
          onClick={() =>
            updateCartQuantityByProduct({
              productId: product.id,
              quantity: Math.max(0, quantity + 1),
            })
          }
          className="px-3 py-2 hover:bg-emerald-100 text-emerald-700 transition-colors flex-1 flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl text-primary mb-6">
          Wellness Store
        </h1>
        <p className="text-gray-600 max-w-3xl text-lg leading-relaxed">
          Discover curated wellness products, fitness equipment, and health
          supplements. Use your company wellness credits to invest in your
          health journey.
        </p>
      </div>

      <div className="flex gap-12">
        {/* Left Sidebar - Filters */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-8 sticky top-24 shadow-sm">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-medium mb-4 text-gray-900">Categories</h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-colors ${
                          selectedCategory === category.value
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-gray-300 group-hover:border-emerald-400"
                        }`}
                      >
                        {selectedCategory === category.value && (
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 flex-1">
                      {category.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({category.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="mb-8">
              <h3 className="font-medium mb-4 text-gray-900">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brands - Only show if there are brands available */}
            {brands.length > 0 && (
              <Collapsible open={brandsOpen} onOpenChange={setBrandsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full mb-4 hover:text-emerald-600 transition-colors">
                  <h3 className="font-medium text-gray-900">Brands</h3>
                  {brandsOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  {brands.map((brand) => (
                    <div
                      key={brand.name}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={brand.name}
                        checked={selectedBrands.includes(brand.name)}
                        onCheckedChange={(checked) =>
                          handleBrandChange(brand.name, checked === true)
                        }
                        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                      <label
                        htmlFor={brand.name}
                        className="text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        {brand.name}
                      </label>
                      <span className="text-xs text-gray-500">
                        ({brand.count})
                      </span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Clear Filters */}
            {(selectedBrands.length > 0 ||
              selectedCategory !== "all" ||
              searchTerm ||
              sortBy !== "featured") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategory("all");
                  setSearchTerm("");
                  setSortBy("featured");
                }}
                className="w-full mt-6 text-gray-600 border-gray-300 hover:border-emerald-500 hover:text-emerald-600"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600 text-lg">
              Showing {sortedProducts.length} of {products.length} products
              {searchTerm && <span> for &quot;{searchTerm}&quot;</span>}
              {selectedCategory !== "all" && (
                <span> in {selectedCategory}</span>
              )}
            </p>
          </div>

          {/* Loading State */}
          {(userLoading || productsLoading) && (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-600 mb-6 text-lg">
                Error loading products: {error.message}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-red-500 text-red-600 hover:bg-red-50 px-8 py-3"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Product Grid - Limited to 3 columns */}
          {!userLoading && !productsLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={getCartItemQuantity(product.id)}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={(productId, qty) =>
                    updateCartQuantityByProduct({ productId, quantity: qty })
                  }
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {!userLoading &&
            !productsLoading &&
            !error &&
            sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-6 text-lg">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedCategory("all");
                    setSearchTerm("");
                  }}
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-3"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
