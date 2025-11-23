"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Package,
  Eye,
  EyeOff,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "@/components/ImageWithFallback";

interface Product {
  id: string;
  name: string;
  images: string[];
  category: string;
  availableStock: number;
  companies: { id: string; name: string }[];
  vendor?: { name: string };
}

interface Company {
  id: string;
  name: string;
}

export default function HRProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, companiesRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/companies"),
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        // Ensure each product has a companies array, default to empty if missing
        const productsWithDefaults = (productsData.data || productsData.products || []).map((product: any) => ({
          ...product,
          companies: product.companies || []
        }));
        setProducts(productsWithDefaults);
      }

      if (companiesRes.ok) {
        const companiesData = await companiesRes.json();
        setCompanies(companiesData.companies || companiesData.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const updateProductVisibility = async (productId: string, visible: boolean) => {
    try {
      const companyIds = visible ? companies.map(c => c.id) : [];
      
      const response = await fetch("/api/prod-visiblity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          companyIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update visibility");
      }

      // Update local state
      setProducts(prev =>
        prev.map(product =>
          product.id === productId
            ? { ...product, companies: visible ? companies : [] }
            : product
        )
      );

      toast.success(`Product ${visible ? "enabled" : "disabled"} successfully`);
    } catch (error) {
      console.error("Failed to update visibility:", error);
      toast.error("Failed to update product visibility");
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product?.vendor?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map(p => p?.category).filter(Boolean)));

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Product Visibility
        </h1>
        <p className="text-gray-600">
          Control which products are available to your company employees
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products or vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isVisible = (product?.companies || []).length > 0;
          
          return (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product?.images?.[0] || "/placeholder.png"}
                  alt={product?.name || "Product"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={(product?.availableStock || 0) > 0 ? "default" : "secondary"}>
                    {(product?.availableStock || 0) > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-2 text-base">
                  {product?.name || "Unknown Product"}
                </CardTitle>
                <CardDescription className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {(product?.category || "").replace(/_/g, " ")}
                    </span>
                    <span className="text-sm font-medium">
                      Stock: {product?.availableStock || 0}
                    </span>
                  </div>
                  {product?.vendor?.name && (
                    <div className="text-sm text-gray-600">
                      by {product.vendor.name}
                    </div>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {isVisible ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm font-medium">
                      {isVisible ? "Visible to Employees" : "Hidden from Employees"}
                    </span>
                  </div>
                  
                  <Switch
                    checked={isVisible}
                    onCheckedChange={(checked) => 
                      updateProductVisibility(product?.id || "", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 text-center">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}