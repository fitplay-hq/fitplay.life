"use client";

import { useState, useEffect } from "react";
import { User, LogOut, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Dashboard from "@/components/profile/dashboard";
import WalletComponent from "@/components/profile/wallet";
import { WalletTransaction } from "@/components/profile/wallet";
import HistoryComponent from "@/components/profile/history";
import Wishlist from "@/components/profile/wishlist";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import PersonalInformation from "@/components/profile/personal-information";
import { useUser } from "@/app/hooks/useUser";
import { $Enums } from "@/lib/generated/prisma";
import { useAtomValue, useSetAtom } from "jotai";
import {
  wishlistItemsAtom,
  removeFromWishlistAtom,
  addToCartAtom,
  cartAnimationAtom,
} from "@/lib/store";
import useSWR from "swr";
import { useOrders } from "@/app/hooks/useOrders";

// Define the Order type to match the API response
interface Order {
  id: string;
  userId: string;
  amount: number;
  status: string;
  phNumber?: string | null;
  address?: string | null;
  deliveryInstructions?: string | null;
  transactionId?: string | null;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    orderId: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    variant?: {
      id: string;
      variantCategory: string;
      variantValue: string;
      mrp: number;
      credits?: string | null;
      availableStock?: number | null;
      productId: string;
      createdAt: string;
      updatedAt: string;
      product: {
        id: string;
        name: string;
        images: string[];
        description: string;
        discount?: number | null;
        sku: string;
        availableStock: number;
        category: string;
        avgRating?: number | null;
        noOfReviews?: number | null;
        createdAt: string;
        updatedAt: string;
        specifications?: any;
        subCategory?: string | null;
        vendorId?: string | null;
      };
    } | null;
  }>;
  user: {
    id: string;
    name: string;
    email: string;
    company: {
      name: string;
    };
  };
}

// Define the transformed order type for History component
interface TransformedOrder {
  id: string;
  date: string;
  item: string;
  amount: number;
  credits: number;
  status: string;
  phNumber?: string | null;
  address?: string | null;
  deliveryInstructions?: string | null;
  transactionId?: string | null;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      images: string[];
    };
    variant: {
      id: string;
      variantValue: string;
    } | null;
  }>;
}

interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  creditsUsed: number;
  creditsRemaining: number;
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useUser();
  const { orders, isLoading: ordersLoading } = useOrders();
  const wishlistItems = useAtomValue(wishlistItemsAtom);
  const removeFromWishlist = useSetAtom(removeFromWishlistAtom);
  const addToCart = useSetAtom(addToCartAtom);
  const setCartAnimation = useSetAtom(cartAnimationAtom);

  const fetcher = (url: string) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());
  const {
    data: walletData,
    error: walletError,
    isLoading: walletLoading,
  } = useSWR(
    isAuthenticated && user ? "/api/wallets?personal=true" : null,
    fetcher
  );

  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalSpent: 0,
    creditsUsed: 0,
    creditsRemaining: 0,
  });

  const walletHistory = walletData?.walletHistory || [];

  useEffect(() => {
    if (walletData?.dashboardStats) {
      setDashboardStats((prev: DashboardStats) => ({
        ...prev,
        creditsUsed: walletData.dashboardStats.creditsUsed,
        creditsRemaining: walletData.dashboardStats.creditsRemaining,
      }));
    }
  }, [walletData]);

  useEffect(() => {
    if (orders.length > 0) {
      const totalOrders = orders.length;
      const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0);
      setDashboardStats((prev: DashboardStats) => ({
        ...prev,
        totalOrders,
        totalSpent,
      }));
    }
  }, [orders]);

  // Transform orders data to match History component interface
  const orderHistory: TransformedOrder[] = orders.map((order) => {
    const firstItem = order.items[0];
    const itemName = firstItem?.variant?.product?.name
      ? order.items.length === 1
        ? firstItem.variant.product.name
        : `${firstItem.variant.product.name} + ${order.items.length - 1} more`
      : "Unknown Product";

    return {
      id: order.id,
      date: new Date(order.createdAt).toISOString().split("T")[0],
      item: itemName,
      amount: order.amount,
      credits: order.amount, // Since credits are used as currency
      status: order.status,
      phNumber: order.phNumber,
      address: order.address,
      deliveryInstructions: order.deliveryInstructions,
      transactionId: order.transactionId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        product: {
          id: item.variant?.product?.id || "unknown",
          name: item.variant?.product?.name || "Unknown Product",
          images: item.variant?.product?.images || [],
        },
        variant: item.variant
          ? {
              id: item.variant.id,
              variantValue: item.variant.variantValue,
            }
          : null,
      })),
    };
  });

  const handleLogout = () => {
    signOut();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Profile
            </h2>
            <p className="text-gray-600">
              Please wait while we load your profile information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated state
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">
              You need to be logged in to view your profile.
            </p>
            <Button onClick={() => (window.location.href = "/login")}>
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=fff`}
            />
            <AvatarFallback className="bg-blue-600 text-white text-xl">
              {/* TODO: */}
              {(user.name || "")
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl text-primary">{user.name}</h1>
            <p className="text-gray-600">
              {/* TODO:  */}
              {/* {user.department} • {user.employeeId} */}
              {user.role}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList
          className={`grid w-full ${
            user.role === $Enums.Role.EMPLOYEE ? "grid-cols-5" : "grid-cols-4"
          }`}
        >
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          {user.role === $Enums.Role.EMPLOYEE && (
            <TabsTrigger value="wishlist">
              <Heart className="w-4 h-4 mr-1 inline" /> Wishlist
            </TabsTrigger>
          )}
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {ordersLoading || walletLoading ? (
            <div className="space-y-6">
              {/* Stats Skeleton */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Orders Skeleton */}
              <Card>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                      >
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Dashboard
              dashboardStats={dashboardStats}
              orderHistory={orderHistory}
            />
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <PersonalInformation user={user} />
        </TabsContent>

        {/* Wallet Tab */}
        <TabsContent value="wallet" className="space-y-6">
          {walletLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading wallet data...</p>
              </div>
            </div>
          ) : walletError ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-red-600 mb-4">
                  Error loading wallet: {walletError}
                </p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </CardContent>
            </Card>
          ) : (
            <WalletComponent
              dashboardStats={dashboardStats}
              walletHistory={walletHistory}
            />
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          {ordersLoading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                      </div>
                      <div className="h-7 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <HistoryComponent orderHistory={orderHistory} />
          )}
        </TabsContent>

        {/* Wishlist Tab - Only for user role */}
        {user.role === $Enums.Role.EMPLOYEE && (
          <TabsContent value="wishlist" className="space-y-6">
            <Wishlist
              wishlistItems={wishlistItems}
              onAddToCart={(product, selectedVariant) =>
                addToCart({ product, selectedVariant })
              }
              onAddAllToCart={() => {
                wishlistItems.forEach((wish) => {
                  const mockProduct = {
                    id: wish.productId,
                    name: wish.title,
                    images: [wish.image],
                    vendorName: wish.brand,
                    variants: wish.variantValue
                      ? [
                          {
                            variantValue: wish.variantValue,
                            mrp: wish.mrp || wish.credits / 2,
                          },
                        ]
                      : [],
                  };
                  addToCart({
                    product: mockProduct,
                    selectedVariant: wish.variantValue,
                  });
                });
                setCartAnimation(true);
                setTimeout(() => setCartAnimation(false), 600);
                toast.success(`Added ${wishlistItems.length} items to cart!`, {
                  description: `All wishlist items have been added to your cart.`,
                  duration: 3000,
                });
              }}
              onRemoveFromWishlist={removeFromWishlist}
              onSetCartAnimation={setCartAnimation}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
