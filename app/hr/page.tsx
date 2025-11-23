"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  Package,
  FileText,
  Building2,
  CreditCard,
} from "lucide-react";

interface DashboardStats {
  totalEmployees: number;
  activeProducts: number;
  monthlyOrders: number;
  companyCredits: number;
}

export default function HRDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeProducts: 0,
    monthlyOrders: 0,
    companyCredits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch employees
      const usersRes = await fetch("/api/users");
      const usersData = await usersRes.json();
      
      // Fetch orders analytics
      const ordersRes = await fetch("/api/analytics/export-csv?type=overview&period=30d");
      
      // For now, set mock data - you can implement actual API calls
      setStats({
        totalEmployees: usersData?.users?.length || 0,
        activeProducts: 15, // Mock data
        monthlyOrders: 24,  // Mock data
        companyCredits: 12500, // Mock data
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Active company members",
    },
    {
      title: "Active Products",
      value: stats.activeProducts,
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Available for purchase",
    },
    {
      title: "Monthly Orders",
      value: stats.monthlyOrders,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "This month's activity",
    },
    {
      title: "Company Credits",
      value: stats.companyCredits,
      icon: CreditCard,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Available balance",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-6 bg-gray-200 rounded w-12 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            HR Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {session?.user?.name}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Building2 className="w-4 h-4" />
          <span>Company Portal</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Manage Employees</span>
            </CardTitle>
            <CardDescription>
              View and manage company employees
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-green-600" />
              <span>Product Visibility</span>
            </CardTitle>
            <CardDescription>
              Control which products employees can see
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>Generate Reports</span>
            </CardTitle>
            <CardDescription>
              Export analytics and transaction reports
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}