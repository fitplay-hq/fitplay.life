"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Edit,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Trash2,
  Star,
  Package,
} from "lucide-react";
import { getLowestCredits, getLowestMRP } from "@/lib/utils";
import { ProductWithVariant } from "@/lib/types";

interface ProductTableProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
}

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

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
          Active
        </Badge>
      );
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    case "out_of_stock":
      return <Badge variant="destructive">Out of Stock</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStockBadge = (stock: number) => {
  if (stock === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  } else if (stock <= 10) {
    return (
      <Badge variant="outline" className="border-orange-500 text-orange-600">
        Low Stock
      </Badge>
    );
  } else if (stock <= 50) {
    return (
      <Badge variant="outline" className="border-yellow-500 text-yellow-600">
        Medium
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="border-emerald-500 text-emerald-600">
        In Stock
      </Badge>
    );
  }
};

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Brand/Vendor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Credits</TableHead>
            <TableHead className="text-right">₹ Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Rating</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    SKU: {product.sku}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{product.vendorName}</div>
                  <div className="text-sm text-gray-500">
                    {product.vendorName}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getFriendlyCategoryName(product.category)}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                {getLowestCredits(product as ProductWithVariant)} credits
              </TableCell>
              <TableCell className="text-right">
                ₹{getLowestMRP(product as ProductWithVariant)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-medium">{product.availableStock}</span>
                  {getStockBadge(product.availableStock)}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">4.8</span>
                  <span className="text-xs text-gray-500">(234)</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {getStatusBadge(product.status || "active")}
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(product)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {products.length === 0 && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            No products found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
