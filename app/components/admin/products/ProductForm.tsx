"use client";

import { useState } from "react";
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

interface ProductFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: any) => void;
  editingProduct: any;
}

const categories = [
  "Fitness_And_Gym_Equipment",
  "Nutrition_And_Health",
  "Diagnostics_And_Prevention",
  "Ergonomics_And_Workspace_Comfort",
  "Health_And_Wellness_Services",
];

const subcategories: Record<string, string[]> = {
  Fitness_And_Gym_Equipment: ["Cardio_Equipment", "Probiotics_And_Supplements"],
  Nutrition_And_Health: ["Probiotics_And_Supplements"],
  Diagnostics_And_Prevention: ["Wearable_Health_Technology"],
  Ergonomics_And_Workspace_Comfort: ["Standing_Desks_And_Accessories"],
  Health_And_Wellness_Services: ["Onsite_Fitness_Classes_And_Workshops"],
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
  const [formData, setFormData] = useState({
    name: editingProduct?.name || "",
    description: editingProduct?.description || "",
    vendorName: editingProduct?.vendorName || "",
    sku: editingProduct?.sku || "",
    availableStock: editingProduct?.availableStock?.toString() || "",
    category: editingProduct?.category || "",
    images: editingProduct?.images || [],
  });

  const [selectedCategory, setSelectedCategory] = useState(
    editingProduct?.category || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      availableStock: parseInt(formData.availableStock),
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
      images: [],
    });
    setSelectedCategory("");
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      resetForm();
    } else if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        vendorName: editingProduct.vendorName || "",
        sku: editingProduct.sku || "",
        availableStock: editingProduct.availableStock?.toString() || "",
        category: editingProduct.category || "",
        images: editingProduct.images || [],
      });
      setSelectedCategory(editingProduct.category || "");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
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
            <Select
              value={formData.vendorName}
              onValueChange={(value) =>
                setFormData({ ...formData, vendorName: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WellFit Equipment Co.">
                  WellFit Equipment Co.
                </SelectItem>
                <SelectItem value="NutriLife Solutions">
                  NutriLife Solutions
                </SelectItem>
                <SelectItem value="MindWell Therapy">
                  MindWell Therapy
                </SelectItem>
                <SelectItem value="FlexYoga Studio">FlexYoga Studio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
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
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {selectedCategory &&
                  subcategories[selectedCategory]?.map((subcategory) => (
                    <SelectItem key={subcategory} value={subcategory}>
                      {subcategory}
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
        </form>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSubmit}
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
