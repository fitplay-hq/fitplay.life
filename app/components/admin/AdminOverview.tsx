import React from 'react';
import { 
  Building2, 
  Package, 
  ShoppingCart, 
  Coins,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for charts
const ordersData = [
  { month: 'Jan', orders: 65, credits: 250000, revenue: 125000 },
  { month: 'Feb', orders: 78, credits: 284000, revenue: 142000 },
  { month: 'Mar', orders: 90, credits: 330000, revenue: 165000 },
  { month: 'Apr', orders: 81, credits: 316000, revenue: 158000 },
  { month: 'May', orders: 95, credits: 378000, revenue: 189000 },
  { month: 'Jun', orders: 112, credits: 410000, revenue: 205000 },
];

const categoryData = [
  { name: 'Fitness Equipment', value: 35, color: '#10b981' },
  { name: 'Nutrition', value: 25, color: '#34d399' },
  { name: 'Wellness Programs', value: 20, color: '#6ee7b7' },
  { name: 'Mental Health', value: 15, color: '#a7f3d0' },
  { name: 'Others', value: 5, color: '#d1fae5' },
];

const recentActivities = [
  { id: 1, type: 'vendor', message: 'New vendor "WellFit Co." onboarded', time: '2 hours ago', status: 'success' },
  { id: 2, type: 'order', message: 'Large order (90,000 credits) placed by TechCorp', time: '4 hours ago', status: 'info' },
  { id: 3, type: 'product', message: 'Low stock alert: Yoga Mats (5 left)', time: '6 hours ago', status: 'warning' },
  { id: 4, type: 'approval', message: '12 orders pending approval', time: '8 hours ago', status: 'pending' },
  { id: 5, type: 'integration', message: 'API sync completed for NutriLife Solutions', time: '1 day ago', status: 'success' },
  { id: 6, type: 'product', message: 'New product category "Recovery Tools" added', time: '1 day ago', status: 'info' },
  { id: 7, type: 'vendor', message: 'FlexYoga Studio integration updated', time: '2 days ago', status: 'success' },
  { id: 8, type: 'system', message: 'Weekly backup completed successfully', time: '3 days ago', status: 'success' },
];

export function AdminOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with FitPlay.life today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Vendors</CardTitle>
            <Building2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">47</div>
            <div className="flex items-center text-sm text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3 this month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Products</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <div className="flex items-center text-sm text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +89 this week
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Orders Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2 vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Orders This Month</CardTitle>
            <ShoppingCart className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">342</div>
            <div className="flex items-center text-sm text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +28% vs last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Credits Redeemed</CardTitle>
            <Coins className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">410,000</div>
            <div className="flex items-center text-sm text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.3% vs last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
            <Star className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹2,05,000</div>
            <div className="flex items-center text-sm text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18.2% vs last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Orders & Credits Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'Credits Redeemed' ? `${value.toLocaleString()} credits` : 
                    name === 'Revenue (₹)' ? `₹${value.toLocaleString()}` : value,
                    name
                  ]}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="orders" fill="#10b981" name="Orders" />
                <Line yAxisId="right" type="monotone" dataKey="credits" stroke="#059669" strokeWidth={2} name="Credits Redeemed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 mt-0.5">
                    {activity.type === 'vendor' && <Building2 className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-purple-600" />}
                    {activity.type === 'product' && <Package className="h-4 w-4 text-orange-600" />}
                    {activity.type === 'approval' && <Clock className="h-4 w-4 text-yellow-600" />}
                    {activity.type === 'integration' && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                    {activity.type === 'system' && <Star className="h-4 w-4 text-indigo-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.status === 'success' ? 'default' : 
                            activity.status === 'warning' ? 'destructive' : 
                            activity.status === 'info' ? 'secondary' : 'outline'}
                    className={activity.status === 'success' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : ''}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                <div>
                  <p className="font-medium text-red-900">Orders Awaiting Approval</p>
                  <p className="text-sm text-red-700">12 orders need immediate attention</p>
                </div>
                <Badge variant="destructive">12</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div>
                  <p className="font-medium text-yellow-900">Low Stock Products</p>
                  <p className="text-sm text-yellow-700">5 products running low on inventory</p>
                </div>
                <Badge variant="outline" className="border-yellow-600 text-yellow-600">5</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div>
                  <p className="font-medium text-blue-900">Vendor Applications</p>
                  <p className="text-sm text-blue-700">3 new vendors awaiting review</p>
                </div>
                <Badge variant="outline" className="border-blue-600 text-blue-600">3</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div>
                  <p className="font-medium text-emerald-900">System Updates</p>
                  <p className="text-sm text-emerald-700">All systems running smoothly</p>
                </div>
                <Badge variant="outline" className="border-emerald-600 text-emerald-600">✓</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}