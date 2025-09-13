"use client";

import { User, Settings, Wallet, History, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationPreferences from "@/components/profile/notification-preferences";
import { signOut } from "next-auth/react";
import PersonalInformation from "@/components/profile/personal-information";
import { useUser } from "@/app/hooks/useUser";

export default function ProfilePage() {
  const { user } = useUser();

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

  const walletHistory = [
    {
      date: "2024-02-01",
      type: "Credit Allocation",
      amount: 500,
      balance: 500,
      description: "Q1 2024 Company Wellness Credits",
    },
    {
      date: "2024-02-15",
      type: "Purchase",
      amount: -60,
      balance: 440,
      description: "Premium Protein Powder",
    },
    {
      date: "2024-02-08",
      type: "Purchase",
      amount: -45,
      balance: 395,
      description: "Resistance Bands Set",
    },
    {
      date: "2024-02-20",
      type: "Bonus",
      amount: 25,
      balance: 420,
      description: "Wellness Challenge Completion",
    },
  ];

  const dashboardStats = {
    totalOrders: 12,
    totalSpent: 450,
    creditsUsed: 290,
    creditsRemaining: 210,
    wellnessScore: 85,
  };

  const handleLogout = () => {
    signOut();
  };

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <History className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-primary">
                  {dashboardStats.totalOrders}
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-primary">
                  {dashboardStats.creditsRemaining}
                </div>
                <div className="text-sm text-gray-600">Credits Remaining</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-primary">
                  {dashboardStats.wellnessScore}%
                </div>
                <div className="text-sm text-gray-600">Wellness Score</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-primary">
                  {dashboardStats.creditsUsed}
                </div>
                <div className="text-sm text-gray-600">Credits Used</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderHistory.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{order.item}</p>
                        <p className="text-xs text-gray-500">
                          {order.date} • {order.vendor}
                        </p>
                      </div>
                      <Badge
                        variant={
                          order.status === "Delivered" ? "default" : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wellness Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Fitness Activities
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Nutrition Planning
                    </span>
                    <Badge className="bg-blue-100 text-blue-800">
                      In Progress
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Health Screenings
                    </span>
                    <Badge className="bg-purple-100 text-purple-800">
                      Completed
                    </Badge>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-blue-800 font-medium">
                      Next Recommendation
                    </p>
                    <p className="text-sm text-blue-600">
                      Consider booking a stress management consultation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <Wallet className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-2xl font-bold text-blue-800">
                  {dashboardStats.creditsRemaining}
                </div>
                <div className="text-sm text-blue-600">Available Credits</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <History className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <div className="text-2xl font-bold text-green-800">
                  {dashboardStats.creditsUsed}
                </div>
                <div className="text-sm text-green-600">Credits Used</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6 text-center">
                <Settings className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <div className="text-2xl font-bold text-purple-800">500</div>
                <div className="text-sm text-purple-600">Total Allocated</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Wallet History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletHistory.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "Purchase"
                            ? "bg-red-100 text-red-600"
                            : transaction.type === "Bonus"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {transaction.type === "Purchase" ? "-" : "+"}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          transaction.amount < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {Math.abs(transaction.amount)} credits
                      </p>
                      <p className="text-sm text-gray-500">
                        Balance: {transaction.balance} credits
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                      <div>
                        <h4 className="font-medium">{order.item}</h4>
                        <p className="text-sm text-gray-600">
                          Order #{order.id} • {order.vendor}
                        </p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">{order.credits} credits</p>
                          <p className="text-sm text-gray-600">Order value</p>
                        </div>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Completed"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
