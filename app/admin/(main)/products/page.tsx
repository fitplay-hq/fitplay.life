"use client";

import React, { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "@/app/hooks/useAdminProducts";
import {
  ProductStats,
  ProductFilters,
  ProductTable,
  ProductForm,
  ProductLoadingSkeleton,
} from "@/app/components/admin/products";
import { Product, Variant } from "@/lib/generated/prisma";

export default function AdminProductsPage() {
  const { products, isLoading, error, mutate } = useAdminProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const filteredProducts = products
    .filter((product: any) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      const matchesStatus = statusFilter === "all";
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && product.availableStock <= 10) ||
        (stockFilter === "out" && product.availableStock === 0) ||
        (stockFilter === "in_stock" && product.availableStock > 10);
      return matchesSearch && matchesCategory && matchesStatus && matchesStock;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "credits":
          return b.credits - a.credits;
        case "stock":
          return b.availableStock - a.availableStock;
        case "rating":
          return b.rating - a.rating;
        case "sold":
          return b.totalSold - a.totalSold;
        default:
          return 0;
      }
    });

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteAdminProduct(id);
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Error deleting product");
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const variants = formData.variants.map((variant: any) => ({
        variantCategory: variant.variantCategory,
        variantValue: variant.variantValue,
        mrp: variant.mrp,
        id: variant.id,
      }));

      const productData = {
        ...formData,
        availableStock: parseInt(formData.availableStock),
        companies: {},
      };

      if (editingProduct) {
        await updateAdminProduct(editingProduct.id, {
          ...productData,
          variants: {
            upsert: variants.map((variant: Variant) => ({
              where: { id: variant.id },
              create: variant,
              update: variant,
            })),
          },
        });
      } else {
        await createAdminProduct({
          ...productData,
          variants: {
            create: variants,
          },
        });
      }

      setIsAddProductOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Error saving product");
    }
  };

  if (isLoading) return <ProductLoadingSkeleton />;
  if (error)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Error Loading Products
          </div>
          <div className="text-gray-600">{error.message}</div>
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Products Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your product catalog across all vendors
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => {
              setEditingProduct(null);
              setIsAddProductOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <ProductStats products={products} />

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Product Catalog</CardTitle>
            <ProductFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              stockFilter={stockFilter}
              onStockFilterChange={setStockFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {/* Product Table */}
            <ProductTable
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </CardContent>
      </Card>

      {/* Product Form Dialog */}
      <ProductForm
        isOpen={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
      />
    </div>
  );
}
