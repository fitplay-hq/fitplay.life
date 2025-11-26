"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Category, SubCategory } from "@/lib/generated/prisma";

interface ProductFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: any) => void;
  editingProduct: any;
}

const categories = Object.values(Category);

const subcategories: Record<string, SubCategory[]> = {
  Fitness_And_Gym_Equipment: [
    SubCategory.Cardio_Equipment,
    SubCategory.Probiotics_And_Supplements,
  ],
  Nutrition_And_Health: [SubCategory.Probiotics_And_Supplements],
  Diagnostics_And_Prevention: [SubCategory.Wearable_Health_Technology],
  Ergonomics_And_Workspace_Comfort: [
    SubCategory.Standing_Desks_And_Accessories,
  ],
  Health_And_Wellness_Services: [
    SubCategory.Onsite_Fitness_Classes_And_Workshops,
  ],
};

// Friendly category name mapping
const getFriendlyCategoryName = (category: string) => {
  const friendlyNames: Record<string, string> = {
    Fitness_And_Gym_Equipment: "Fitness & Gym Equipment",
    Nutrition_And_Health: "Nutrition & Health",
    Diagnostics_And_Prevention: "Diagnostics & Prevention",
    Ergonomics_And_Workspace_Comfort: "Ergonomics & Workspace Comfort",
    Health_And_Wellness_Services: "Health & Wellness Services",
  };
  return friendlyNames[category] || category;
};

export function ProductForm({
  isOpen,
  onOpenChange,
  onSubmit,
  editingProduct,
}: ProductFormProps) {
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    vendorName: "",
    sku: "",
    availableStock: "",
    category: "",
    subCategory: "",
    images: [],
    variants: [],
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [variants, setVariants] = useState<any[]>([]);

  // Update form data when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        vendorName: editingProduct.vendorName || "",
        sku: editingProduct.sku || "",
        availableStock: editingProduct.availableStock?.toString() || "",
        category: editingProduct.category || "",
        subCategory: editingProduct.subCategory || "",
        images: editingProduct.images || [],
        variants: editingProduct.variants || [],
      });
      setSelectedCategory(editingProduct.category || "");
      setSelectedSubcategory(editingProduct.subCategory || "");
    } else {
      // Reset form for new product
      setFormData({
        name: "",
        description: "",
        vendorName: "",
        sku: "",
        availableStock: "",
        category: "",
        subCategory: "",
        images: [],
        variants: [],
      });
      setSelectedCategory("");
      setSelectedSubcategory("");
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      availableStock: parseInt(formData.availableStock),
      variants: variants
        .map((variant) => ({
          ...variant,
          mrp: parseInt(variant.mrp) || 0,
        }))
        .filter(
          (variant) =>
            variant.variantCategory.trim() &&
            variant.variantValue.trim() &&
            variant.mrp > 0
        ),
    };
    onSubmit(productData);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      vendorName: "",
      sku: "",
      availableStock: "",
      category: "",
      subCategory: "",
      images: [],
      variants: [],
    });
    setSelectedCategory("");
    setSelectedSubcategory("");
    setVariants([]);
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      resetForm();
    }
  };

  // Update formData when selectedCategory changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
    setFormData({ ...formData, category, subCategory: "" });
  };

  // Update formData when selectedSubcategory changes
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setFormData({ ...formData, subCategory: subcategory });
  };

  // Variants management functions
  const addVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      variantCategory: "",
      variantValue: "",
      mrp: "",
    };
    setVariants([...variants, newVariant]);
  };

  const updateVariant = (index: number, field: string, value: string) => {
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    setVariants(updatedVariants);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Initialize variants when editing product
  useEffect(() => {
    if (editingProduct?.variants) {
      setVariants(editingProduct.variants);
    } else {
      setVariants([]);
    }
  }, [editingProduct]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4 bg-white">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-sku">SKU</Label>
            <Input
              id="product-sku"
              placeholder="Product SKU"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-vendor">Vendor</Label>
            <Input
              id="product-vendor"
              placeholder="Enter vendor name"
              value={formData.vendorName}
              onChange={(e) =>
                setFormData({ ...formData, vendorName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {getFriendlyCategoryName(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-subcategory">Subcategory</Label>
            <Select
              disabled={!selectedCategory}
              value={selectedSubcategory}
              onValueChange={handleSubcategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {selectedCategory &&
                  subcategories[selectedCategory]?.map((subcategory) => (
                    <SelectItem key={subcategory} value={subcategory}>
                      {subcategory.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-stock">Stock Quantity</Label>
            <Input
              id="product-stock"
              type="number"
              placeholder="Available quantity"
              value={formData.availableStock}
              onChange={(e) =>
                setFormData({ ...formData, availableStock: e.target.value })
              }
              required
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              placeholder="Product description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          {/* Variants Section */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Product Variants
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addVariant}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Variant
              </Button>
            </div>

            {variants.length > 0 && (
              <div className="space-y-3">
                {variants.map((variant, index) => (
                  <Card key={variant.id || index} className="p-4 bg-gray-50 border border-gray-200">
                    <div className="flex items-end gap-4">
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`variant-category-${index}`}>
                            Category
                          </Label>
                          <Input
                            id={`variant-category-${index}`}
                            placeholder="e.g., Size, Color"
                            value={variant.variantCategory}
                            onChange={(e) =>
                              updateVariant(
                                index,
                                "variantCategory",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-value-${index}`}>
                            Value
                          </Label>
                          <Input
                            id={`variant-value-${index}`}
                            placeholder="e.g., S, M, L"
                            value={variant.variantValue}
                            onChange={(e) =>
                              updateVariant(
                                index,
                                "variantValue",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-mrp-${index}`}>
                            MRP (₹)
                          </Label>
                          <Input
                            id={`variant-mrp-${index}`}
                            type="number"
                            placeholder="Price"
                            value={variant.mrp}
                            onChange={(e) =>
                              updateVariant(index, "mrp", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeVariant(index)}
                        className="mb-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {variants.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>
                  No variants added yet. Click "Add Variant" to create product
                  variations.
                </p>
              </div>
            )}
          </div>
        </form>
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 bg-white">
          <Button 
            variant="outline" 
            onClick={() => handleOpenChange(false)}
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
            onClick={handleSubmit}
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
