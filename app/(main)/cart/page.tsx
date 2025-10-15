"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MapPin,
  Check,
  AlertCircle,
  Package,
  CreditCard,
  Calendar,
  Hash,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { CreditPurchase } from "@/components/CreditPurchase";
import { toast } from "sonner";
import useSWR from "swr";
import {
  cartItemsAtom,
  clearCartAtom,
  purchaseCreditsAtom,
  removeFromCartAtom,
  updateCartQuantityAtom,
  userCreditsAtom,
} from "@/lib/store";
import { useAtomValue, useSetAtom } from "jotai";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function CartPage() {
  const {
    data: walletData,
    error: walletError,
    isLoading: walletLoading,
  } = useSWR("/api/wallets?personal=true", fetcher);

  const walletBalance = walletData?.wallet?.balance || 0;

  const userCredits = walletBalance;
  const purchaseCredits = useSetAtom(purchaseCreditsAtom);

  const cartItems = useAtomValue(cartItemsAtom);
  const clearCart = useSetAtom(clearCartAtom);
  const removeFromCart = useSetAtom(removeFromCartAtom);
  const updateCartQuantity = useSetAtom(updateCartQuantityAtom);

  const handleCreditPurchase = (credits: number) => {
    const newCredits = purchaseCredits(credits);
    toast.success("Demo: Credits added to balance!", {
      description: `Your demo balance is now ${newCredits} credits. Contact HR for actual credits.`,
      duration: 5000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully!");
  };

  const handleRemoveFromCart = (variantKey: string) => {
    const removedItem = removeFromCart(variantKey);

    if (removedItem) {
      toast.info(`${removedItem.title} removed from cart`);
    }
  };

  const [currentStep, setCurrentStep] = useState<
    "cart" | "address" | "confirmation"
  >("cart");

  // Address form state
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    instructions: "",
  });

  const [addressErrors, setAddressErrors] = useState({
    pincode: "",
    phone: "",
  });

  const [orderDetails, setOrderDetails] = useState<{
    order: any;
    wallet: any;
  } | null>(null);

  // Calculate totals
  const totalCredits = cartItems.reduce(
    (sum, item) => sum + item.credits * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const creditsShortfall = Math.max(0, totalCredits - userCredits);
  const hasEnoughCredits = creditsShortfall === 0;

  const validateAddress = () => {
    return (
      address.addressLine1 &&
      address.city &&
      address.state &&
      address.pincode &&
      address.phone
    );
  };

  const handleCheckout = async () => {
    if (currentStep === "cart") {
      if (!hasEnoughCredits) {
        return; // Don't proceed if not enough credits
      }
      setCurrentStep("address");
    } else if (currentStep === "address" && validateAddress()) {
      try {
        // Prepare order items - filter out items with null variantId
        const items = cartItems
          .filter((item) => item.variantId && item.variantId.trim() !== "")
          .map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          }));

        if (items.length === 0) {
          toast.error("No valid items to order", {
            description: "Please ensure all cart items have valid variants.",
            duration: 5000,
          });
          return;
        }

        // Prepare address string
        const fullAddress = `${address.addressLine1}${
          address.addressLine2 ? ", " + address.addressLine2 : ""
        }, ${address.city}, ${address.state} ${address.pincode}`;

        const response = await fetch("/api/orders/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            phNumber: address.phone,
            address: fullAddress,
            deliveryInstructions: address.instructions || null,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to create order");
        }

        toast.success("Order created successfully!", {
          description: "Your order has been placed and will be processed soon.",
          duration: 3000,
        });

        // Store complete order details for confirmation page
        setOrderDetails({
          order: result.order,
          wallet: result.wallet,
        });

        setCurrentStep("confirmation");
        // Clear cart after successful order
        setTimeout(() => {
          clearCart();
        }, 3000);
      } catch (error) {
        toast.error("Failed to create order", {
          description:
            error instanceof Error ? error.message : "An error occurred",
          duration: 5000,
        });
      }
    }
  };

  const steps = [
    { id: "cart", label: "Cart", completed: true },
    {
      id: "address",
      label: "Address",
      completed: currentStep === "confirmation",
    },
    { id: "confirmation", label: "Confirmation", completed: false },
  ];

  if (cartItems.length === 0 && currentStep === "cart") {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <h2 className="text-2xl text-primary mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Discover wellness products curated for your health journey
            </p>
            <Link href="/store">
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
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

      {/* Cart Step */}
      {currentStep === "cart" && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Your Cart ({totalItems} items)
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleClearCart}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.variantKey}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="text-sm text-gray-500">
                          {item.brand}
                        </div>
                        <h3 className="text-primary">{item.title}</h3>
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold text-emerald-600">
                            {item.credits} credits
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveFromCart(item.variantKey!)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() =>
                              updateCartQuantity({
                                variantKey: item.variantKey!,
                                quantity: item.quantity - 1,
                              })
                            }
                            className="px-2 py-1 hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity({
                                variantKey: item.variantKey!,
                                quantity: item.quantity + 1,
                              })
                            }
                            className="px-2 py-1 hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Credit Purchase Section - Show when credits are insufficient */}
            {!hasEnoughCredits && (
              <CreditPurchase
                currentCredits={userCredits}
                requiredCredits={totalCredits}
                onPurchaseComplete={handleCreditPurchase}
              />
            )}
          </div>

          {/* Order Summary */}
          <div>
            {walletLoading ? (
              <Card>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      </div>
                    ))}
                  </div>

                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>

                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ) : (
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
                        {walletError ? "Error" : userCredits}
                      </span>
                    </div>
                    {!hasEnoughCredits && (
                      <>
                        <Separator />
                        <div className="flex justify-between text-orange-600">
                          <span>Credits Needed:</span>
                          <span className="font-bold">{creditsShortfall}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {!hasEnoughCredits && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        You need {creditsShortfall} additional credits to
                        complete this order. You can purchase more credits
                        below.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handleCheckout}
                    disabled={!hasEnoughCredits}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {hasEnoughCredits
                      ? "Proceed to Checkout"
                      : "Purchase Credits to Continue"}
                  </Button>

                  <Link href="/store">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Address Step */}
      {currentStep === "address" && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label
                      htmlFor="addressLine1"
                      className="text-sm font-medium"
                    >
                      Address Line 1 *
                    </Label>
                    <Input
                      id="addressLine1"
                      value={address.addressLine1}
                      onChange={(e) =>
                        setAddress({ ...address, addressLine1: e.target.value })
                      }
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label
                      htmlFor="addressLine2"
                      className="text-sm font-medium"
                    >
                      Address Line 2
                    </Label>
                    <Input
                      id="addressLine2"
                      value={address.addressLine2}
                      onChange={(e) =>
                        setAddress({ ...address, addressLine2: e.target.value })
                      }
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      City *
                    </Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">
                      State *
                    </Label>
                    <Input
                      id="state"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm font-medium">
                      Pincode *
                    </Label>
                    <Input
                      id="pincode"
                      value={address.pincode}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        setAddress({ ...address, pincode: value });
                        setAddressErrors({
                          ...addressErrors,
                          pincode:
                            value.length === 6
                              ? ""
                              : value.length > 0
                              ? "Pincode must be exactly 6 digits"
                              : "",
                        });
                      }}
                      pattern="[0-9]{6}"
                      title="Pincode must be exactly 6 digits"
                      maxLength={6}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone-number"
                      className="text-sm font-medium"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phone-number"
                      value={address.phone}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setAddress({ ...address, phone: value });
                        setAddressErrors({
                          ...addressErrors,
                          phone:
                            value.length === 10
                              ? ""
                              : value.length > 0
                              ? "Phone number must be exactly 10 digits"
                              : "",
                        });
                      }}
                      pattern="[0-9]{10}"
                      title="Phone number must be exactly 10 digits"
                      maxLength={10}
                      required
                      className="h-11"
                    />
                    {addressErrors.phone && (
                      <p className="text-sm text-red-600">
                        {addressErrors.phone}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label
                      htmlFor="instructions"
                      className="text-sm font-medium"
                    >
                      Delivery Instructions
                    </Label>
                    <Textarea
                      id="instructions"
                      value={address.instructions}
                      onChange={(e) =>
                        setAddress({ ...address, instructions: e.target.value })
                      }
                      placeholder="Any special instructions for delivery..."
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("cart")}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Cart
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    disabled={!validateAddress()}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                  >
                    Complete Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            {walletLoading ? (
              <Card>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
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
                      <span>Using Credits:</span>
                      <span className="text-emerald-600">{totalCredits}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Step */}
      {currentStep === "confirmation" && orderDetails && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl text-primary mb-4">Order Confirmed!</h2>
              <p className="text-gray-600">
                Your wellness products have been ordered successfully using your
                company wellness credits.
              </p>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Order Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Order Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Order ID:</span>
                    <div className="font-mono text-primary flex items-center space-x-1">
                      <Hash className="w-3 h-3" />
                      <span>{orderDetails.order.id}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="capitalize">
                        {orderDetails.order.status.toLowerCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Order Date:</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(
                          orderDetails.order.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Amount:</span>
                    <div className="font-bold text-emerald-600">
                      {orderDetails.order.amount} credits
                    </div>
                  </div>
                </div>

                {/* Transaction ID */}
                <div className="pt-2 border-t">
                  <span className="text-gray-600 text-sm">Transaction ID:</span>
                  <div className="font-mono text-sm text-gray-800">
                    {orderDetails.order.transactionId}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5" />
                  <span>Wallet Update</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Previous Balance:</span>
                    <div className="font-bold">
                      {orderDetails.wallet.balance + orderDetails.order.amount}{" "}
                      credits
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Amount Deducted:</span>
                    <div className="font-bold text-red-600">
                      -{orderDetails.order.amount} credits
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">New Balance:</span>
                    <div className="font-bold text-emerald-600 text-lg">
                      {orderDetails.wallet.balance} credits
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <span className="text-gray-600 text-sm">Wallet Expiry:</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span className="text-sm">
                      {new Date(
                        orderDetails.wallet.expiryDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Order Items ({orderDetails.order.items.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails.order.items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.product?.images?.[0] || "/placeholder.png"}
                          alt={item.product?.name || "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">
                          {item.product?.name || "Product"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Variant: {item.variant?.variantValue || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Product ID: {item.productId}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Quantity</p>
                          <p className="font-bold">{item.quantity}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Unit Price</p>
                          <p className="font-bold text-emerald-600">
                            {item.price} credits
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="font-bold text-primary">
                            {item.price * item.quantity} credits
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Order Total:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {orderDetails.order.amount} credits
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">What's Next?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  • Your order is being processed and will be approved by HR
                </li>
                <li>• You'll receive email updates on order status</li>
                <li>• Products will be delivered once order is approved</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile">
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  View Order History
                </Button>
              </Link>
              <Link href="/benefits">
                <Button variant="outline">View My Benefits</Button>
              </Link>
              <Link href="/store">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
