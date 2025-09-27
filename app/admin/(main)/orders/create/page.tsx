"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  User,
  Building2,
  CreditCard,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { toast } from "sonner";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

interface User {
  id: string;
  name: string;
  email: string;
  company: { name: string };
  wallet: { balance: number };
}

interface Product {
  id: string;
  name: string;
  images: string[];
  vendorName: string;
  discount: number | null;
  variants: Array<{
    id: string;
    variantCategory: string;
    variantValue: string;
    mrp: number;
    credits: string | null;
  }>;
}

interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variant: string;
  image: string;
  vendor: string;
  mrp: number;
  credits: number;
  quantity: number;
}

export default function AdminCreateOrderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<
    "employee" | "products" | "review"
  >("employee");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch users
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
  } = useSWR("/api/users", fetcher);
  const users = usersData?.users || [];

  // Fetch products
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useSWR("/api/products", fetcher);
  const products = productsData?.data || [];

  const addToCart = (product: Product, variant: any) => {
    const existing = cartItems.find((item) => item.variantId === variant.id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const mrp = variant.mrp;
      const discountPercent = product.discount ?? 0;
      const discountedPrice = Math.max(
        mrp - Math.floor((mrp * discountPercent) / 100),
        0
      );

      setCartItems((prev) => [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          variant: `${variant.variantCategory}: ${variant.variantValue}`,
          image: product.images[0] || "",
          vendor: product.vendorName,
          mrp,
          credits: discountedPrice,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) =>
        prev.filter((item) => item.variantId !== variantId)
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.variantId === variantId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (variantId: string) => {
    setCartItems((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const calculateTotals = () => {
    const totalCredits = cartItems.reduce(
      (sum, item) => sum + item.credits * item.quantity,
      0
    );
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const creditsShortfall = Math.max(
      0,
      totalCredits - (selectedUser?.wallet?.balance || 0)
    );
    return { totalCredits, totalItems, creditsShortfall };
  };

  const { totalCredits, totalItems, creditsShortfall } = calculateTotals();
  const hasEnoughCredits = creditsShortfall === 0;

  const handleCreateOrder = async () => {
    if (!selectedUser || cartItems.length === 0) return;

    try {
      const items = cartItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/orders/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ items, userId: selectedUser.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create order");
      }

      toast.success("Order created successfully!", {
        description: "The order has been created and will be processed soon.",
        duration: 3000,
      });

      router.push("/admin/orders");
    } catch (error) {
      toast.error("Failed to create order", {
        description:
          error instanceof Error ? error.message : "An error occurred",
        duration: 5000,
      });
    }
  };

  const steps = [
    { id: "employee", label: "Select Employee", completed: !!selectedUser },
    { id: "products", label: "Add Products", completed: cartItems.length > 0 },
    { id: "review", label: "Review Order", completed: false },
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/admin/orders">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
        <p className="text-gray-600 mt-2">
          Create an order for an employee using their wellness credits
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.id === currentStep
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : step.completed
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {step.completed ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={`ml-2 text-sm ${
                  step.id === currentStep
                    ? "text-emerald-600 font-medium"
                    : step.completed
                    ? "text-emerald-600"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-4 ${
                    step.completed ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top Navigation */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          {currentStep !== "employee" && (
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep === "products") setCurrentStep("employee");
                else if (currentStep === "review") setCurrentStep("products");
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
        </div>
        <div>
          {((currentStep === "employee" && selectedUser) ||
            (currentStep === "products" && cartItems.length > 0)) && (
            <Button
              onClick={() => {
                if (currentStep === "employee") setCurrentStep("products");
                else if (currentStep === "products") setCurrentStep("review");
              }}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          )}
        </div>
      </div>

      {/* Employee Selection Step */}
      {currentStep === "employee" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Select Employee
            </CardTitle>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="text-center py-8">Loading employees...</div>
            ) : usersError ? (
              <div className="text-center py-8 text-red-600">
                Error loading employees
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user: User) => (
                  <div
                    key={user.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedUser?.id === user.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Building2 className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {user.company.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <CreditCard className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {user.wallet?.balance || 0} credits
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedUser && (
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setCurrentStep("products")}>
                  Next: Add Products
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Products Selection Step */}
      {currentStep === "products" && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Add Products to Order</CardTitle>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : productsError ? (
                  <div className="text-center py-8 text-red-600">
                    Error loading products
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product: Product) => (
                      <div
                        key={product.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <ImageWithFallback
                          src={product.images[0] || ""}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">
                          {product.vendorName}
                        </p>
                        <div className="space-y-2">
                          {product.variants.map((variant) => {
                            const mrp = variant.mrp;
                            const discountPercent = product.discount ?? 0;
                            const discountedPrice = Math.max(
                              mrp - Math.floor((mrp * discountPercent) / 100),
                              0
                            );
                            const inCart = cartItems.find(
                              (item) => item.variantId === variant.id
                            );

                            return (
                              <div
                                key={variant.id}
                                className="flex items-center justify-between"
                              >
                                <div className="text-xs">
                                  <span className="font-medium">
                                    {variant.variantCategory}:{" "}
                                    {variant.variantValue}
                                  </span>
                                  <div className="text-emerald-600 font-bold">
                                    {discountedPrice} credits
                                  </div>
                                </div>
                                {inCart ? (
                                  <div className="flex items-center border border-gray-300 rounded">
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          variant.id,
                                          inCart.quantity - 1
                                        )
                                      }
                                      className="px-2 py-1 hover:bg-gray-50"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-3 py-1 border-x border-gray-300">
                                      {inCart.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          variant.id,
                                          inCart.quantity + 1
                                        )
                                      }
                                      className="px-2 py-1 hover:bg-gray-50"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <Button
                                    size="sm"
                                    onClick={() => addToCart(product, variant)}
                                    className="bg-emerald-600 hover:bg-emerald-700"
                                  >
                                    Add
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Cart Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    No products added yet
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div
                          key={item.variantId}
                          className="flex justify-between items-center"
                        >
                          <div className="text-sm">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-gray-500">{item.variant}</div>
                            <div className="text-xs text-gray-400">
                              {item.vendor}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {item.credits} × {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(item.variantId)}
                              className="text-red-600 hover:text-red-700 mt-1"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Items:</span>
                        <span>{totalItems}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Credits:</span>
                        <span className="font-bold text-emerald-600">
                          {totalCredits}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => setCurrentStep("review")}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      Review Order
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Review Step */}
      {currentStep === "review" && selectedUser && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Employee Info */}
            <Card>
              <CardHeader>
                <CardTitle>Employee Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-sm font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label>Company</Label>
                    <p className="text-sm font-medium">
                      {selectedUser.company.name}
                    </p>
                  </div>
                  <div>
                    <Label>Available Credits</Label>
                    <p className="text-sm font-medium text-emerald-600">
                      {selectedUser.wallet?.balance || 0} credits
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.variantId}
                      className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.variant}</p>
                        <p className="text-xs text-gray-400">{item.vendor}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {item.credits} credits × {item.quantity}
                        </div>
                        <div className="font-bold text-emerald-600">
                          {item.credits * item.quantity} credits
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Final Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Credits:</span>
                    <span className="font-bold text-emerald-600">
                      {totalCredits}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Credits:</span>
                    <span className="text-emerald-600">
                      {selectedUser.wallet?.balance || 0}
                    </span>
                  </div>
                  {!hasEnoughCredits && (
                    <>
                      <Separator />
                      <div className="flex justify-between text-orange-600">
                        <span>Credits Shortfall:</span>
                        <span className="font-bold">{creditsShortfall}</span>
                      </div>
                    </>
                  )}
                </div>

                {!hasEnoughCredits && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      The selected employee doesn't have enough credits for this
                      order. Consider reducing the quantity or selecting
                      different products.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("products")}
                    className="flex-1"
                  >
                    Back to Products
                  </Button>
                  <Button
                    onClick={handleCreateOrder}
                    disabled={!hasEnoughCredits}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                  >
                    Create Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
