"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Variant {
  id: string;
  variantCategory: string;
  variantValue: string;
  mrp: number;
  credits?: string;
  product: any;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  vendorName: string;
  discount?: number;
  sku: string;
  availableStock: number;
  category: string;
  subCategory?: string;
  specifications?: any;
  avgRating?: number;
  noOfReviews?: number;
  variants: Variant[];
  createdAt: Date;
  updatedAt: Date;
}

import {
  Search,
  Star,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Filter,
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
import { prefetchProducts } from "@/lib/prefetch";
import { useEffect } from "react";
import { getLowestCredits, getLowestMRP } from "@/lib/utils";
import { ProductWithVariant } from "@/lib/types";

export default function WellnessStore() {
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { products, isLoading: productsLoading, error } = useProducts();

  // Prefetch products on component mount for better performance
  useEffect(() => {
    prefetchProducts();
  }, []);

  const addToCart = useSetAtom(addToCartAtom);
  const updateCartQuantityByProduct = useSetAtom(
    updateCartQuantityByProductAtom
  );
  const getCartItemQuantity = useAtomValue(getCartItemQuantityAtom);

  const setCartAnimation = useSetAtom(cartAnimationAtom);

  // Helper function to get the lowest priced variant
  const getLowestPricedVariant = (product: Product): string | undefined => {
    if (!product.variants || product.variants.length === 0) return undefined;

    const lowestVariant = product.variants.reduce((lowest, current) => {
      const lowestMRP = lowest.mrp || 0;
      const currentMRP = current.mrp || 0;
      return currentMRP < lowestMRP ? current : lowest;
    });

    return lowestVariant.variantValue;
  };

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

    // Get the lowest priced variant automatically
    const lowestPricedVariant = getLowestPricedVariant(product as Product);
    const result = addToCart({ product, selectedVariant: lowestPricedVariant });

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
      // Get lowest credits from variants
      const credits = getLowestCredits(product as Product);
      toast.success(`${product.name} added to cart!`, {
        description: `${credits} credits - Great choice for your wellness journey!`,
        duration: 3000,
      });
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [brandsOpen, setBrandsOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  // Generate dynamic categories from products
  const dynamicCategories = Array.from(
    new Set(products.map((product) => product.category))
  ).map((category) => ({
    value: category,
    label: category
      .replace(/_/g, " ") // Replace underscores with spaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "), // Capitalize each word
    count: products.filter((p) => p.category === category).length,
  }));

  const categories = [
    { value: "all", label: "All Categories", count: products.length },
    ...dynamicCategories,
  ];

  // Generate dynamic brands from products (using vendorName as brand)
  const brands = Array.from(
    new Set(products.map((product) => product.vendorName).filter(Boolean))
  ).map((brand) => ({
    name: brand as string,
    count: products.filter((p) => p.vendorName === brand).length,
  }));

  const priceRanges = [
    { value: "under-100", label: "Under 100 credits", min: 0, max: 99 },
    { value: "100-300", label: "100 - 300 credits", min: 100, max: 300 },
    { value: "300-500", label: "300 - 500 credits", min: 300, max: 500 },
    { value: "above-500", label: "Above 500 credits", min: 500, max: Infinity },
  ];

  const ratingOptions = [
    { value: "4.5+", label: "4.5+ Stars", min: 4.5 },
    { value: "4.0+", label: "4.0+ Stars", min: 4.0 },
    { value: "3.5+", label: "3.5+ Stars", min: 3.5 },
    { value: "3.0+", label: "3.0+ Stars", min: 3.0 },
  ];

  const categoryBanners = [
    {
      value: "all",
      label: "All Products",
      image:
        "https://images.unsplash.com/photo-1613637069737-2cce919a4ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG51dHJpdGlvbiUyMGhlYWx0aHklMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU3NzUxMTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Complete Wellness Range",
    },
    {
      value: "Fitness_And_Gym_Equipment",
      label: "Fitness Equipment",
      image:
        "https://images.unsplash.com/photo-1652492041264-efba848755d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwZHVtYmJlbGxzJTIwZ3ltfGVufDF8fHx8MTc1Nzc1MTE1NHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Gym Equipment & Gear",
    },
    {
      value: "Nutrition_And_Health",
      label: "Nutrition & Health",
      image:
        "https://images.unsplash.com/photo-1593181581874-361761582b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50cyUyMHZpdGFtaW5zJTIwbnV0cml0aW9ufGVufDF8fHx8MTc1Nzc1MTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Vitamins & Nutrition",
    },
    {
      value: "Diagnostics_And_Prevention",
      label: "Diagnostics",
      image:
        "https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFyYWJsZXMlMjBmaXRuZXNzJTIwdHJhY2tlciUyMHNtYXJ0d2F0Y2h8ZW58MXx8fHwxNzU3NzUxMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Health Monitoring",
    },
    {
      value: "Ergonomics_And_Workspace_Comfort",
      label: "Ergonomics",
      image:
        "https://images.unsplash.com/photo-1740748776786-74365e440be4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvdmVyeSUyMHRoZXJhcHklMjBtYXNzYWdlJTIwc3BhfGVufDF8fHx8MTc1Nzc1MTE2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Workspace Comfort",
    },
    {
      value: "Health_And_Wellness_Services",
      label: "Wellness Services",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Professional Services",
    },
  ];

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range));
    }
  };

  const handleRatingChange = (rating: string, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating]);
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.vendorName &&
        product.vendorName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesBrand =
      selectedBrands.length === 0 ||
      (product.vendorName && selectedBrands.includes(product.vendorName));

    // Price range filter (using lowest credits from variants)
    const productCredits = getLowestCredits(product as Product);
    const matchesPriceRange =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((rangeValue) => {
        const range = priceRanges.find((r) => r.value === rangeValue);
        if (!range) return false;
        return productCredits >= range.min && productCredits <= range.max;
      });

    // Rating filter
    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((ratingValue) => {
        const ratingOption = ratingOptions.find((r) => r.value === ratingValue);
        if (!ratingOption) return false;
        return (product.avgRating || 0) >= ratingOption.min;
      });

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPriceRange &&
      matchesRating
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": {
        const aCredits = getLowestCredits(a as Product);
        const bCredits = getLowestCredits(b as Product);
        return aCredits - bCredits;
      }
      case "price-high": {
        const aCredits = getLowestCredits(a as Product);
        const bCredits = getLowestCredits(b as Product);
        return bCredits - aCredits;
      }
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
    const lowestPricedVariant = getLowestPricedVariant(product as Product);
    const quantity = getCartItemQuantity(product.id, lowestPricedVariant);

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
              selectedVariant: lowestPricedVariant,
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
              selectedVariant: lowestPricedVariant,
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
    <div className="min-h-screen max-w-[1600px] py-12 space-y-4 mx-auto bg-background px-8">
      {/* Header */}
      <div className="bg-white">
        <h1 className="text-3xl md:text-4xl text-primary mb-6">
          Wellness Store
        </h1>
        <p className="text-gray-600 max-w-4xl text-lg leading-relaxed mb-8">
          Discover curated wellness products, fitness equipment, and health
          supplements. Use your company wellness credits to invest in your
          health journey.
        </p>

        {/* Top Search and Filters Bar - Full Width */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center">
          {/* Search - Takes most of the width */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search products, brands, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-base bg-gray-100 text-gray-500 placeholder-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 focus:text-gray-900"
            />
          </div>

          {/* Sort Filter */}
          <div className="flex gap-4 items-center lg:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-56 py-4 bg-gray-100 border-gray-200 text-gray-500 focus:bg-white focus:border-emerald-500 focus:text-gray-900">
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
        </div>
      </div>

      {/* Category Banners */}
      <div className="bg-gray-50 py-4">
        <h2 className="text-2xl text-primary mb-6">Shop by Category</h2>
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
          role="tablist"
          aria-label="Product categories"
        >
          {categoryBanners.map((category) => (
            <button
              key={category.value}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category.value}
              aria-label={`Select ${category.label} category`}
              className={`group cursor-pointer transition-all duration-300 focus:outline-none ${
                selectedCategory === category.value
                  ? "transform scale-105"
                  : "hover:transform hover:scale-105"
              }`}
              onClick={() => setSelectedCategory(category.value)}
            >
              <div
                className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "border-emerald-500 shadow-lg ring-2 ring-emerald-200"
                    : "border-gray-200 hover:border-emerald-300 hover:shadow-md"
                }`}
              >
                {/* Image Container */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay for selected state */}
                  {selectedCategory === category.value && (
                    <div className="absolute inset-0 bg-emerald-500/20" />
                  )}
                </div>

                {/* Category Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3
                    className={`font-semibold text-sm text-white transition-colors line-clamp-2 text-center ${
                      selectedCategory === category.value
                        ? "text-emerald-200"
                        : "group-hover:text-emerald-200"
                    }`}
                  >
                    {category.label}
                  </h3>
                </div>

                {/* Selection Indicator */}
                {selectedCategory === category.value && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left Sidebar - Filters */}
        <div className="w-72 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24 shadow-sm">
            {/* Filter Header */}
            <div className="flex items-center gap-2 mb-5">
              <Filter className="w-4 h-4 text-emerald-600" />
              <h3 className="font-medium text-gray-900 text-sm">Filters</h3>
            </div>

            {/* Price Range Filter */}
            <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full mb-3 hover:text-emerald-600 transition-colors text-gray-700">
                <h3 className="font-medium text-gray-900 text-sm">
                  Price Range
                </h3>
                {priceOpen ? (
                  <ChevronUp className="w-3 h-3 text-emerald-600" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-emerald-600" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mb-5">
                {priceRanges.map((range) => (
                  <div
                    key={range.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={range.value}
                      checked={selectedPriceRanges.includes(range.value)}
                      onCheckedChange={(checked) =>
                        handlePriceRangeChange(range.value, checked === true)
                      }
                      className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 border-gray-300 bg-gray-50"
                    />
                    <label
                      htmlFor={range.value}
                      className="text-xs text-gray-700 cursor-pointer flex-1"
                    >
                      {range.label}
                    </label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Rating Filter */}
            <Collapsible open={ratingOpen} onOpenChange={setRatingOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full mb-3 hover:text-emerald-600 transition-colors text-gray-700">
                <h3 className="font-medium text-gray-900 text-sm">
                  Customer Rating
                </h3>
                {ratingOpen ? (
                  <ChevronUp className="w-3 h-3 text-emerald-600" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-emerald-600" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mb-5">
                {ratingOptions.map((rating) => (
                  <div
                    key={rating.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={rating.value}
                      checked={selectedRatings.includes(rating.value)}
                      onCheckedChange={(checked) =>
                        handleRatingChange(rating.value, checked === true)
                      }
                      className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 border-gray-300 bg-gray-50"
                    />
                    <label
                      htmlFor={rating.value}
                      className="text-xs text-gray-700 cursor-pointer flex-1 flex items-center gap-1"
                    >
                      {rating.label}
                      <div className="flex">
                        {[...Array(Math.floor(rating.min))].map((_, i) => (
                          <Star
                            key={i}
                            className="w-2.5 h-2.5 text-yellow-400 fill-current"
                          />
                        ))}
                        {rating.min % 1 !== 0 && (
                          <Star className="w-2.5 h-2.5 text-yellow-400 fill-current opacity-50" />
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Brands */}
            <Collapsible open={brandsOpen} onOpenChange={setBrandsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full mb-3 hover:text-emerald-600 transition-colors text-gray-700">
                <h3 className="font-medium text-gray-900 text-sm">Brands</h3>
                {brandsOpen ? (
                  <ChevronUp className="w-3 h-3 text-emerald-600" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-emerald-600" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand.name}
                      checked={selectedBrands.includes(brand.name)}
                      onCheckedChange={(checked) =>
                        handleBrandChange(brand.name, checked === true)
                      }
                      className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 border-gray-300 bg-gray-50"
                    />
                    <label
                      htmlFor={brand.name}
                      className="text-xs text-gray-700 cursor-pointer flex-1"
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

            {/* Clear Filters */}
            {(selectedBrands.length > 0 ||
              selectedPriceRanges.length > 0 ||
              selectedRatings.length > 0 ||
              selectedCategory !== "all" ||
              searchTerm) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedPriceRanges([]);
                  setSelectedRatings([]);
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
                className="w-full mt-5 text-gray-600 border-gray-300 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 text-xs transition-colors"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {productsLoading ? (
                "Loading products..."
              ) : (
                <>
                  Showing {sortedProducts.length} of {products.length} products
                  {searchTerm && <span> for "{searchTerm}"</span>}
                  {selectedCategory !== "all" && (
                    <span> in {selectedCategory.replace(/_/g, " ")}</span>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Loading State */}
          {productsLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse"
                >
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
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

          {/* Product Grid */}
          {!productsLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {sortedProducts.map((product, index) => (
                <div key={index} className="group">
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border border-gray-100 h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-gray-50">
                        <ImageWithFallback
                          src={product.images[0] || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-sm">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-semibold text-gray-700">
                            {product.avgRating?.toFixed(1) ?? "0.0"}
                          </span>
                        </div>
                        {/* Stock Status */}
                        {product.availableStock === 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        {/* Product Name */}
                        <h3 className="text-gray-900 font-semibold text-base line-clamp-2 mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
                          {product.name}
                        </h3>

                        {/* Vendor */}
                        {product.vendorName && (
                          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                            by {product.vendorName}
                          </p>
                        )}

                        {/* Price Section */}
                        <div className="mt-auto mb-4">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-2xl font-bold text-emerald-600">
                              {getLowestCredits(product)}
                            </span>
                            <span className="text-sm font-medium text-emerald-600">
                              credits
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 line-through">
                              ₹{getLowestMRP(product as ProductWithVariant)}
                            </span>
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                              Save{" "}
                              {Math.round(
                                ((getLowestMRP(product as ProductWithVariant) -
                                  getLowestCredits(
                                    product as ProductWithVariant
                                  ) /
                                    2) /
                                  getLowestMRP(product as ProductWithVariant)) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="p-4 pt-0">
                        <div onClick={(e) => e.preventDefault()}>
                          <QuantitySelector product={product} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!productsLoading && !error && sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No products found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedPriceRanges([]);
                  setSelectedRatings([]);
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-2"
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
