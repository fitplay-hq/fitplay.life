import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Settings, 
  Bell,
  Menu,
  X,
  Building2,
  Shield,
  FileText,
  Eye
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DashboardLayoutProps {
  userRole: 'admin' | 'hr' | 'vendor';
  currentPage: string;
  onPageChange: (page: string) => void;
  children: React.ReactNode;
}

export function DashboardLayoutWithNavigation({ userRole, currentPage, onPageChange, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNavItems = [
    { icon: BarChart3, label: 'Overview', page: 'admin-overview' },
    { icon: Building2, label: 'Vendors', page: 'admin-vendors' },
    { icon: Package, label: 'Products', page: 'admin-products' },
    { icon: ShoppingCart, label: 'Orders', page: 'admin-orders' },
    { icon: CreditCard, label: 'Transactions', page: 'admin-transactions' },
    { icon: Settings, label: 'Settings', page: 'admin-settings' },
  ];

  const hrNavItems = [
    { icon: BarChart3, label: 'Overview', page: 'hr-overview' },
    { icon: Users, label: 'Employees', page: 'hr-employees' },
    { icon: Eye, label: 'Catalog Settings', page: 'hr-catalog' },
    { icon: FileText, label: 'Reports', page: 'hr-reports' },
    { icon: Settings, label: 'Settings', page: 'hr-settings' },
  ];

  const vendorNavItems = [
    { icon: BarChart3, label: 'Overview', page: 'vendor-overview' },
    { icon: ShoppingCart, label: 'Orders', page: 'vendor-orders' },
    { icon: Package, label: 'Products', page: 'vendor-products' },
    { icon: FileText, label: 'Reports', page: 'vendor-reports' },
    { icon: Settings, label: 'Settings', page: 'vendor-settings' },
  ];

  const getNavItems = () => {
    switch (userRole) {
      case 'admin': return adminNavItems;
      case 'hr': return hrNavItems;
      case 'vendor': return vendorNavItems;
      default: return [];
    }
  };

  const getRoleTitle = () => {
    switch (userRole) {
      case 'admin': return 'Admin Dashboard';
      case 'hr': return 'HR Dashboard';
      case 'vendor': return 'Vendor Dashboard';
      default: return 'Dashboard';
    }
  };

  const getRoleBadge = () => {
    switch (userRole) {
      case 'admin': return <Badge variant="destructive" className="bg-emerald-600 hover:bg-emerald-700">Admin</Badge>;
      case 'hr': return <Badge variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white">HR Manager</Badge>;
      case 'vendor': return <Badge variant="outline" className="border-emerald-600 text-emerald-600">Vendor</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          {/* Dashboard Header */}
          <div className="p-6 border-b border-gray-200 bg-emerald-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{getRoleTitle()}</h2>
                <div className="mt-1">
                  {getRoleBadge()}
                </div>
              </div>
              {userRole === 'admin' && (
                <div className="relative">
                  <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors" />
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {getNavItems().map((item) => (
              <button
                key={item.page}
                onClick={() => onPageChange(item.page)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${currentPage === item.page
                    ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600' 
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              FitPlay.life v2.0.1
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">{getRoleTitle()}</h1>
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Keep original export for backwards compatibility
export const DashboardLayout = DashboardLayoutWithNavigation;