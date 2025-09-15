import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Power, 
  Eye,
  EyeOff,
  Upload,
  Download,
  Package,
  Star,
  AlertTriangle,
  Tags,
  Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Mock product data
const productsData = [
  {
    id: 1,
    name: 'Professional Yoga Mat',
    brand: 'WellFit Equipment Co.',
    vendor: 'WellFit Equipment Co.',
    credits: 1200,
    inrPrice: 600,
    stock: 45,
    category: 'Fitness Equipment',
    subcategory: 'Yoga & Pilates',
    status: 'active',
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop',
    sku: 'WF-YM-001',
    description: 'Premium non-slip yoga mat with superior grip and comfort',
    dateAdded: '2024-01-15',
    totalSold: 1450
  },
  {
    id: 2,
    name: 'Whey Protein Powder (2kg)',
    brand: 'NutriLife Solutions',
    vendor: 'NutriLife Solutions',
    credits: 3200,
    inrPrice: 1600,
    stock: 89,
    category: 'Nutrition',
    subcategory: 'Protein Supplements',
    status: 'active',
    rating: 4.6,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100&h=100&fit=crop',
    sku: 'NL-WP-002',
    description: 'High-quality whey protein for muscle building and recovery',
    dateAdded: '2024-02-01',
    totalSold: 890
  },
  {
    id: 3,
    name: 'Meditation Cushion Set',
    brand: 'MindWell Therapy',
    vendor: 'MindWell Therapy',
    credits: 800,
    inrPrice: 400,
    stock: 12,
    category: 'Mental Health',
    subcategory: 'Meditation',
    status: 'active',
    rating: 4.9,
    reviews: 123,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
    sku: 'MW-MC-003',
    description: 'Comfortable meditation cushion for mindfulness practice',
    dateAdded: '2024-02-15',
    totalSold: 234
  },
  {
    id: 4,
    name: 'Resistance Band Set',
    brand: 'FlexYoga Studio',
    vendor: 'FlexYoga Studio',
    credits: 600,
    inrPrice: 300,
    stock: 156,
    category: 'Fitness Equipment',
    subcategory: 'Resistance Training',
    status: 'active',
    rating: 4.5,
    reviews: 345,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
    sku: 'FY-RB-004',
    description: 'Complete set of resistance bands for strength training',
    dateAdded: '2024-03-01',
    totalSold: 678
  },
  {
    id: 5,
    name: 'Foam Roller - Deep Tissue',
    brand: 'RecoverWell',
    vendor: 'RecoverWell',
    credits: 1000,
    inrPrice: 500,
    stock: 5,
    category: 'Recovery',
    subcategory: 'Massage Tools',
    status: 'active',
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
    sku: 'RW-FR-005',
    description: 'High-density foam roller for muscle recovery and pain relief',
    dateAdded: '2024-03-10',
    totalSold: 345
  }
];

const categories = [
  'Fitness Equipment',
  'Nutrition',
  'Mental Health',
  'Recovery',
  'Wellness Programs'
];

const subcategories = {
  'Fitness Equipment': ['Yoga & Pilates', 'Resistance Training', 'Cardio Equipment', 'Free Weights'],
  'Nutrition': ['Protein Supplements', 'Vitamins', 'Energy Bars', 'Healthy Snacks'],
  'Mental Health': ['Meditation', 'Sleep Aids', 'Stress Relief', 'Books & Guides'],
  'Recovery': ['Massage Tools', 'Heat Therapy', 'Cold Therapy', 'Compression Wear'],
  'Wellness Programs': ['Online Classes', 'Coaching Sessions', 'Health Assessments', 'Workshops']
};

export function ProductsManagement() {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (stock <= 10) {
      return <Badge variant="outline" className="border-orange-500 text-orange-600">Low Stock</Badge>;
    } else if (stock <= 50) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Medium</Badge>;
    } else {
      return <Badge variant="outline" className="border-emerald-500 text-emerald-600">In Stock</Badge>;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesStock = stockFilter === 'all' || 
                        (stockFilter === 'low' && product.stock <= 10) ||
                        (stockFilter === 'out' && product.stock === 0) ||
                        (stockFilter === 'in_stock' && product.stock > 10);
    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'credits':
        return b.credits - a.credits;
      case 'stock':
        return b.stock - a.stock;
      case 'rating':
        return b.rating - a.rating;
      case 'sold':
        return b.totalSold - a.totalSold;
      default:
        return 0;
    }
  });

  const toggleProductStatus = (productId: number) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' }
        : product
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600 mt-2">Manage your product catalog across all vendors</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-sku">SKU</Label>
                  <Input id="product-sku" placeholder="Product SKU" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-brand">Brand</Label>
                  <Input id="product-brand" placeholder="Brand name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-vendor">Vendor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wellfit">WellFit Equipment Co.</SelectItem>
                      <SelectItem value="nutrilife">NutriLife Solutions</SelectItem>
                      <SelectItem value="mindwell">MindWell Therapy</SelectItem>
                      <SelectItem value="flexyoga">FlexYoga Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-subcategory">Subcategory</Label>
                  <Select disabled={!selectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory && subcategories[selectedCategory]?.map(subcategory => (
                        <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-credits">Credits Price</Label>
                  <Input id="product-credits" type="number" placeholder="Price in credits" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-inr">INR Price</Label>
                  <Input id="product-inr" type="number" placeholder="Price in ₹" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-stock">Stock Quantity</Label>
                  <Input id="product-stock" type="number" placeholder="Available quantity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-image">Product Image URL</Label>
                  <Input id="product-image" placeholder="Image URL" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea id="product-description" placeholder="Product description" rows={3} />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="product-active" />
                  <Label htmlFor="product-active">Set as Active</Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-xl font-semibold">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Eye className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-xl font-semibold">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-xl font-semibold">
                  {products.filter(p => p.stock <= 10).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Tags className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-xl font-semibold">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-xl font-semibold">
                  {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Product Catalog</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products, brands, SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock</SelectItem>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="credits">Credits</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="sold">Total Sold</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.brand}</div>
                        <div className="text-sm text-gray-500">{product.vendor}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {product.credits.toLocaleString()} credits
                    </TableCell>
                    <TableCell className="text-right">₹{product.inrPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-medium">{product.stock}</span>
                        {getStockBadge(product.stock)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(product.status)}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ImageIcon className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toggleProductStatus(product.id)}>
                            {product.status === 'active' ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
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
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No products found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}