"use client";

import React, { useState } from 'react';
import Link from 'next/link'
import { Search, Star, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { toast } from 'sonner'
import { useAtomValue, useSetAtom } from 'jotai';
import { addToCartAtom, cartAnimationAtom, getCartItemQuantityAtom, updateCartQuantityByProductAtom } from '@/lib/store';

export default function WellnessStore() {
  const addToCart = useSetAtom(addToCartAtom);
  const updateCartQuantityByProduct = useSetAtom(updateCartQuantityByProductAtom);
  const getCartItemQuantity = useAtomValue(getCartItemQuantityAtom);

  const setCartAnimation = useSetAtom(cartAnimationAtom);

  const handleAddToCart = (product: any) => {
    const result = addToCart(product);

    // Trigger cart animation
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 600);

    // Show custom toast notification
    if (result.wasUpdated) {
      toast.success(
        `${product.title} quantity updated!`,
        {
          description: `Now you have ${result.newQuantity} in your cart.`,
          duration: 3000
        }
      );
    } else if (result.isNewItem) {
      toast.success(
        `${product.title} added to cart!`,
        {
          description: `${product.credits} credits - Great choice for your wellness journey!`,
          duration: 3000
        }
      );
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandsOpen, setBrandsOpen] = useState(true);

  const products = [
    {
      title: 'Premium Adjustable Dumbbells Set',
      brand: 'FlexFit',
      credits: 200,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Fitness Equipment',
      rating: 4.8,
      reviews: 124
    },
    {
      title: 'Organic Whey Protein Powder',
      brand: 'NutriPure',
      credits: 80,
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Supplements',
      rating: 4.6,
      reviews: 89
    },
    {
      title: 'Smart Fitness Tracker Watch',
      brand: 'HealthTech',
      credits: 150,
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Wearables',
      rating: 4.7,
      reviews: 156
    },
    {
      title: 'Yoga Premium Mat & Block Set',
      brand: 'ZenFlex',
      credits: 60,
      image: 'https://images.unsplash.com/photo-1506629905607-772da3a7e5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Fitness Equipment',
      rating: 4.9,
      reviews: 203
    },
    {
      title: 'Plant-Based Omega-3 Capsules',
      brand: 'GreenLife',
      credits: 45,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Supplements',
      rating: 4.5,
      reviews: 67
    },
    {
      title: 'Electric Foam Roller Massager',
      brand: 'RecoveryPro',
      credits: 120,
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Recovery',
      rating: 4.4,
      reviews: 91
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', count: products.length },
    { value: 'Fitness Equipment', label: 'Fitness Equipment', count: products.filter(p => p.category === 'Fitness Equipment').length },
    { value: 'Supplements', label: 'Supplements', count: products.filter(p => p.category === 'Supplements').length },
    { value: 'Wearables', label: 'Wearables', count: products.filter(p => p.category === 'Wearables').length },
    { value: 'Recovery', label: 'Recovery', count: products.filter(p => p.category === 'Recovery').length }
  ];

  const brands = [...new Set(products.map(p => p.brand))].map(brand => ({
    name: brand,
    count: products.filter(p => p.brand === brand).length
  }));

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.credits - b.credits;
      case 'price-high':
        return b.credits - a.credits;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return 0; // Keep original order for newest
      default:
        return 0; // Featured - keep original order
    }
  });

  const QuantitySelector = ({ product }: { product: any }) => {
    const quantity = getCartItemQuantity(product.title, product.brand);
    
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
          onClick={() => updateCartQuantityByProduct({
            title: product.title,
            brand: product.brand,
            quantity: Math.max(0, quantity - 1)
          })}
          className="px-3 py-2 hover:bg-emerald-100 text-emerald-700 transition-colors flex-1 flex items-center justify-center"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="px-4 py-2 text-emerald-800 font-medium min-w-[40px] text-center border-x border-emerald-200">
          {quantity}
        </span>
        <button
          onClick={() => updateCartQuantityByProduct({
            title: product.title,
            brand: product.brand,
            quantity: Math.max(0, quantity + 1)
          })}
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
        <h1 className="text-3xl md:text-4xl text-primary mb-6">Wellness Store</h1>
        <p className="text-gray-600 max-w-3xl text-lg leading-relaxed">
          Discover curated wellness products, fitness equipment, and health supplements. 
          Use your company wellness credits to invest in your health journey.
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
                {categories.map(category => (
                  <label key={category.value} className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                        selectedCategory === category.value 
                          ? 'border-emerald-500 bg-emerald-500' 
                          : 'border-gray-300 group-hover:border-emerald-400'
                      }`}>
                        {selectedCategory === category.value && (
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 flex-1">{category.label}</span>
                    <span className="text-xs text-gray-500">({category.count})</span>
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

            {/* Brands */}
            <Collapsible open={brandsOpen} onOpenChange={setBrandsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full mb-4 hover:text-emerald-600 transition-colors">
                <h3 className="font-medium text-gray-900">Brands</h3>
                {brandsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4">
                {brands.map(brand => (
                  <div key={brand.name} className="flex items-center space-x-3">
                    <Checkbox
                      id={brand.name}
                      checked={selectedBrands.includes(brand.name)}
                      onCheckedChange={(checked) => handleBrandChange(brand.name, checked === true)}
                      className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                    />
                    <label htmlFor={brand.name} className="text-sm text-gray-700 cursor-pointer flex-1">
                      {brand.name}
                    </label>
                    <span className="text-xs text-gray-500">({brand.count})</span>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Clear Filters */}
            {(selectedBrands.length > 0 || selectedCategory !== 'all' || searchTerm) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategory('all');
                  setSearchTerm('');
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
              {searchTerm && <span> for "{searchTerm}"</span>}
              {selectedCategory !== 'all' && <span> in {selectedCategory}</span>}
            </p>
          </div>

          {/* Product Grid - Limited to 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full border-0 shadow-md">
                <div className="aspect-square overflow-hidden rounded-t-xl bg-gray-100">
                  <Link href={`/product/${index + 1}`}>
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-emerald-600 bg-emerald-50 font-medium">
                      {product.brand}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  <Link href={`/product/${index + 1}`}>
                    <h3 className="text-primary hover:text-emerald-600 transition-colors line-clamp-2 mb-4 text-lg leading-snug">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="mt-auto mb-4">
                    <span className="text-xl font-bold text-emerald-600">{product.credits} credits</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 mt-auto">
                  <QuantitySelector product={product} />
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-6 text-lg">No products found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategory('all');
                  setSearchTerm('');
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