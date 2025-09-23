"use client";

import { useState, useEffect } from "react";
import { User, LogOut, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationPreferences from "@/components/profile/notification-preferences";
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

interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  creditsUsed: number;
  creditsRemaining: number;
  wellnessScore: number;
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useUser();
  const wishlistItems = useAtomValue(wishlistItemsAtom);
  const removeFromWishlist = useSetAtom(removeFromWishlistAtom);
  const addToCart = useSetAtom(addToCartAtom);
  const setCartAnimation = useSetAtom(cartAnimationAtom);

  const [walletLoading, setWalletLoading] = useState(true);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalOrders: 12,
    totalSpent: 450,
    creditsUsed: 0,
    creditsRemaining: 0,
    wellnessScore: 85,
  });
  const [walletHistory, setWalletHistory] = useState<WalletTransaction[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchWalletData = async () => {
        try {
          setWalletLoading(true);
          setWalletError(null);
          const response = await fetch("/api/wallets?personal=true", {
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Failed to fetch wallet data");
          }
          const data = await response.json();
          setDashboardStats((prev: DashboardStats) => ({
            ...prev,
            creditsUsed: data.dashboardStats.creditsUsed,
            creditsRemaining: data.dashboardStats.creditsRemaining,
          }));
          setWalletHistory(data.walletHistory);
        } catch (error) {
          setWalletError((error as Error).message);
          toast.error("Failed to load wallet data");
        } finally {
          setWalletLoading(false);
        }
      };

      fetchWalletData();
    }
  }, [isAuthenticated, user]);

  const orderHistory = [
    {
      id: "ORD-001",
      date: "2024-02-15",
      item: "Premium Protein Powder",
      amount: 89,
      credits: 60,
      status: "Delivered",
      vendor: "NutriMax",
    },
    {
      id: "ORD-002",
      date: "2024-02-08",
      item: "Resistance Bands Set",
      amount: 45,
      credits: 45,
      status: "Delivered",
      vendor: "FitZone",
    },
    {
      id: "ORD-003",
      date: "2024-01-28",
      item: "Health Screening",
      amount: 199,
      credits: 150,
      status: "Completed",
      vendor: "WellCare Labs",
    },
    {
      id: "ORD-004",
      date: "2024-01-20",
      item: "Ergonomic Mouse Pad",
      amount: 35,
      credits: 35,
      status: "Delivered",
      vendor: "WorkWell",
    },
  ];

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
          <Dashboard
            dashboardStats={dashboardStats}
            orderHistory={orderHistory}
          />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <PersonalInformation user={user} />
            <NotificationPreferences />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download My Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <HistoryComponent orderHistory={orderHistory} />
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
