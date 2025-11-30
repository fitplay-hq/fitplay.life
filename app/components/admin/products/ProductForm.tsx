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
import { Plus, X, Upload, Image as ImageIcon } from "lucide-react";
import { Category, SubCategory } from "@/lib/generated/prisma";
import { toast } from "sonner";

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
  const [vendors, setVendors] = useState<any[]>([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Fetch vendors on component mount
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('/api/admin/vendors');
        if (response.ok) {
          const data = await response.json();
          setVendors(data.vendors || []);
        }
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      }
    };
    
    fetchVendors();
  }, []);

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
      setSelectedVendor(editingProduct.vendorId || "");
      setVariants(editingProduct.variants || []);
      setImageFiles([]);
      setImagePreviews([]);
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
      setSelectedVendor("");
    }
  }, [editingProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!selectedCategory || !formData.name.trim()) {
      toast.error("Please fill in product name and category");
      return;
    }
    
    if (!selectedVendor && !formData.vendorName?.trim()) {
      toast.error("Please select a vendor or enter vendor name");
      return;
    }
    
    try {
      // Upload images first
      const imageUrls = await uploadImages();
      
      const productData = {
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        description: formData.description?.trim() || '',
        category: selectedCategory,
        subCategory: selectedSubcategory || null,
        vendorId: selectedVendor || null,
        vendorName: (!selectedVendor && formData.vendorName?.trim()) ? formData.vendorName.trim() : null,
        availableStock: parseInt(formData.availableStock) || 0,
        images: [...(formData.images || []), ...imageUrls],
        variants: variants
          .map((variant) => ({
            variantCategory: variant.variantCategory.trim(),
            variantValue: variant.variantValue.trim(),
            mrp: parseInt(variant.mrp) || 0,
          }))
          .filter(
            (variant) =>
              variant.variantCategory &&
              variant.variantValue &&
              variant.mrp > 0
          ),
      };
      
      console.log('Submitting product data:', productData);
      await onSubmit(productData);
      
      // Reset form after successful submission
      resetForm();
      
    } catch (error) {
      console.error('ProductForm submit error:', error);
      toast.error("Failed to save product");
    }
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
    setSelectedVendor("");
    setVariants([]);
    setImageFiles([]);
    setImagePreviews([]);
    setUploadingImages(false);
    
    // Clear any file inputs
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + imageFiles.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    
    setImageFiles(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  // Remove image
  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(imagePreviews[index]);
  };
  
  // Upload images to server
  const uploadImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return [];
    
    setUploadingImages(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        }
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Failed to upload some images');
    } finally {
      setUploadingImages(false);
    }
    
    return uploadedUrls;
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
            <div className="space-y-2">
              <Select
                value={selectedVendor}
                onValueChange={setSelectedVendor}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mb-2">Or enter vendor name manually:</p>
              <Input
                id="product-vendor"
                placeholder="Enter vendor name (if not in list)"
                value={formData.vendorName}
                onChange={(e) =>
                  setFormData({ ...formData, vendorName: e.target.value })
                }
              />
            </div>
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
          
          <div className="col-span-2 space-y-2">
            <Label htmlFor="product-images">Product Images</Label>
            <div className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <div className="text-4xl text-gray-400">📷</div>
                  <div className="text-sm font-medium text-gray-700">
                    Click to upload images or drag and drop
                  </div>
                  <div className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each (max 5 images)
                  </div>
                </label>
              </div>
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Existing Images from formData */}
              {formData.images && formData.images.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-600">Existing Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {formData.images.map((image: string, index: number) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Existing ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = formData.images.filter((_: any, i: number) => i !== index);
                            setFormData({ ...formData, images: newImages });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* URL Input as fallback */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600">Or add image by URL</Label>
                <Input
                  type="url"
                  placeholder="Enter image URL"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        setFormData({
                          ...formData,
                          images: [...(formData.images || []), input.value.trim()]
                        });
                        input.value = '';
                      }
                    }
                  }}
                />
                <p className="text-xs text-gray-500">Press Enter to add image URL</p>
              </div>
            </div>
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

          {/* Form Actions */}
          <div className="col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => handleOpenChange(false)}
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
              disabled={uploadingImages}
            >
              {uploadingImages ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  Uploading Images...
                </>
              ) : (
                editingProduct ? "Update Product" : "Add Product"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
