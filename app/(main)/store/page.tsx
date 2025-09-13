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
        description: `${Math.round(
          product.price / 100
        )} credits - Great choice for your wellness journey!`,
        duration: 3000,
      });
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandsOpen, setBrandsOpen] = useState(true);

  // Quick filters state
  const [priceRange, setPriceRange] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  // Generate dynamic tags from products
  const allTags = products.flatMap((product) => product.tags || []);
  const tagFrequency = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.entries(tagFrequency)
    .sort(([, a], [, b]) => b - a) // Sort by frequency descending
    .slice(0, 8) // Take top 8 most popular tags
    .map(([tag, count]) => ({ name: tag, count }));

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
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

    // Quick filters
    const matchesPriceRange = (() => {
      const price = Math.round(product.price / 100);
      switch (priceRange) {
        case "under-100":
          return price < 100;
        case "100-300":
          return price >= 100 && price <= 300;
        case "over-300":
          return price > 300;
        default:
          return true;
      }
    })();

    const matchesRating = (() => {
      const rating = product.avgRating || 0;
      switch (ratingFilter) {
        case "4-stars":
          return rating >= 4;
        case "3-stars":
          return rating >= 3;
        default:
          return true;
      }
    })();

    const matchesStock = !inStockOnly || product.availableStock > 0;

    const matchesTags =
      selectedTags.length === 0 ||
      (product.tags && selectedTags.some((tag) => product.tags.includes(tag)));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPriceRange &&
      matchesRating &&
      matchesStock &&
      matchesTags
    );
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
    <div className="max-w-4/5 mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl text-primary mb-3">
          Wellness Store
        </h1>
        <p className="text-gray-600 max-w-3xl text-sm leading-relaxed">
          Discover curated wellness products, fitness equipment, and health
          supplements. Use your company wellness credits to invest in your
          health journey.
        </p>
      </div>

      {/* Top Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Category:</span>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
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

          {/* Brands Filter - Compact */}
          {brands.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Brands:</span>
              <Collapsible open={brandsOpen} onOpenChange={setBrandsOpen}>
                <CollapsibleTrigger className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700">
                  Filter Brands
                  {brandsOpen ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute top-full left-0 bg-white border border-gray-200 rounded-md p-3 mt-1 shadow-lg z-10 min-w-[200px]">
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div
                        key={brand.name}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`top-${brand.name}`}
                          checked={selectedBrands.includes(brand.name)}
                          onCheckedChange={(checked) =>
                            handleBrandChange(brand.name, checked === true)
                          }
                          className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                        />
                        <label
                          htmlFor={`top-${brand.name}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {brand.name} ({brand.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Clear Filters */}
          {(selectedBrands.length > 0 ||
            selectedCategory !== "all" ||
            searchTerm ||
            sortBy !== "featured" ||
            priceRange ||
            ratingFilter ||
            inStockOnly ||
            selectedTags.length > 0) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedBrands([]);
                setSelectedCategory("all");
                setSearchTerm("");
                setSortBy("featured");
                setPriceRange("");
                setRatingFilter("");
                setInStockOnly(false);
                setSelectedTags([]);
              }}
              className="h-9 text-xs border-gray-300 hover:border-emerald-500 hover:text-emerald-600"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Compact Sidebar - Quick Filters */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 sticky top-4">
            <h3 className="font-medium mb-3 text-gray-900 text-sm">
              Quick Filters
            </h3>

            {/* Brands Filter */}
            {brands.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-700 mb-2">
                  Brands
                </h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {brands.slice(0, 6).map((brand) => (
                    <label
                      key={brand.name}
                      className="flex items-center space-x-2 cursor-pointer text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.name)}
                        onChange={(e) =>
                          handleBrandChange(brand.name, e.target.checked)
                        }
                        className="w-3 h-3 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                      />
                      <span className="truncate">{brand.name}</span>
                      <span className="text-gray-500">({brand.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                Price Range
              </h4>
              <div className="space-y-1">
                <label className="flex items-center space-x-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="price"
                    value="under-100"
                    checked={priceRange === "under-100"}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-3 h-3 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                  />
                  <span>Under 100 credits</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="price"
                    value="100-300"
                    checked={priceRange === "100-300"}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-3 h-3 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                  />
                  <span>100-300 credits</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="price"
                    value="over-300"
                    checked={priceRange === "over-300"}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-3 h-3 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                  />
                  <span>300+ credits</span>
                </label>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Rating</h4>
              <div className="space-y-1">
                <label className="flex items-center space-x-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="rating"
                    value="4-stars"
                    checked={ratingFilter === "4-stars"}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-3 h-3 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                  />
                  <span>4+ stars</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="rating"
                    value="3-stars"
                    checked={ratingFilter === "3-stars"}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-3 h-3 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                  />
                  <span>3+ stars</span>
                </label>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                Availability
              </h4>
              <label className="flex items-center space-x-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-3 h-3 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Popular Tags */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                Popular Tags
              </h4>
              <div className="flex flex-wrap gap-1">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag.name}
                    variant={
                      selectedTags.includes(tag.name) ? "default" : "outline"
                    }
                    className={`text-xs px-2 py-1 cursor-pointer transition-colors ${
                      selectedTags.includes(tag.name)
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "hover:bg-emerald-50 border-gray-300"
                    }`}
                    onClick={() => handleTagChange(tag.name)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
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
            <div className="flex justify-center items-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Loading products...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4 text-sm">
                Error loading products: {error.message}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Product Grid - Limited to 3 columns */}
          {!userLoading && !productsLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
              <div className="text-center py-8">
                <p className="text-gray-500 mb-6 text-lg">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedCategory("all");
                    setSearchTerm("");
                    setPriceRange("");
                    setRatingFilter("");
                    setInStockOnly(false);
                    setSelectedTags([]);
                  }}
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
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
