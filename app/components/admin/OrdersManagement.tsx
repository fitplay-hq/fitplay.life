import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Check, 
  X, 
  Truck, 
  Eye,
  Download,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  AlertCircle,
  Calendar,
  User,
  Building2
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';

// Mock orders data
const ordersData = [
  {
    id: 'ORD-2024-001',
    employee: {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@techcorp.com',
      company: 'TechCorp India'
    },
    products: [
      { name: 'Professional Yoga Mat', quantity: 2, credits: 1200 },
      { name: 'Resistance Band Set', quantity: 1, credits: 600 }
    ],
    totalCredits: 3000,
    inrAmount: 1500,
    paymentMode: 'credits',
    status: 'pending',
    orderDate: '2024-03-15T10:30:00Z',
    approvedDate: null,
    dispatchedDate: null,
    deliveredDate: null,
    trackingId: null,
    notes: 'Employee wellness program purchase'
  },
  {
    id: 'ORD-2024-002',
    employee: {
      name: 'Priya Sharma',
      email: 'priya.sharma@innovatetech.com',
      company: 'InnovateTech Solutions'
    },
    products: [
      { name: 'Whey Protein Powder (2kg)', quantity: 1, credits: 3200 }
    ],
    totalCredits: 3200,
    inrAmount: 1600,
    paymentMode: 'mixed',
    status: 'approved',
    orderDate: '2024-03-14T14:20:00Z',
    approvedDate: '2024-03-14T15:00:00Z',
    dispatchedDate: null,
    deliveredDate: null,
    trackingId: null,
    notes: 'Approved for fitness program participant'
  },
  {
    id: 'ORD-2024-003',
    employee: {
      name: 'Amit Patel',
      email: 'amit.patel@healthfirst.com',
      company: 'HealthFirst Ltd'
    },
    products: [
      { name: 'Meditation Cushion Set', quantity: 1, credits: 800 },
      { name: 'Foam Roller - Deep Tissue', quantity: 1, credits: 1000 }
    ],
    totalCredits: 1800,
    inrAmount: 900,
    paymentMode: 'credits',
    status: 'dispatched',
    orderDate: '2024-03-13T09:15:00Z',
    approvedDate: '2024-03-13T11:00:00Z',
    dispatchedDate: '2024-03-14T16:30:00Z',
    deliveredDate: null,
    trackingId: 'TRK123456789',
    notes: 'Mental wellness initiative order'
  },
  {
    id: 'ORD-2024-004',
    employee: {
      name: 'Sneha Reddy',
      email: 'sneha.reddy@globaltech.com',
      company: 'GlobalTech Enterprise'
    },
    products: [
      { name: 'Professional Yoga Mat', quantity: 1, credits: 1200 }
    ],
    totalCredits: 1200,
    inrAmount: 600,
    paymentMode: 'inr',
    status: 'delivered',
    orderDate: '2024-03-10T11:45:00Z',
    approvedDate: '2024-03-10T12:00:00Z',
    dispatchedDate: '2024-03-11T10:00:00Z',
    deliveredDate: '2024-03-13T14:30:00Z',
    trackingId: 'TRK987654321',
    notes: 'Delivered successfully'
  },
  {
    id: 'ORD-2024-005',
    employee: {
      name: 'Vikram Singh',
      email: 'vikram.singh@datasoft.com',
      company: 'DataSoft Solutions'
    },
    products: [
      { name: 'Resistance Band Set', quantity: 3, credits: 600 }
    ],
    totalCredits: 1800,
    inrAmount: 900,
    paymentMode: 'credits',
    status: 'cancelled',
    orderDate: '2024-03-12T16:20:00Z',
    approvedDate: null,
    dispatchedDate: null,
    deliveredDate: null,
    trackingId: null,
    notes: 'Cancelled due to product unavailability'
  }
];

export function OrdersManagement() {
  const [orders, setOrders] = useState(ordersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Approved</Badge>;
      case 'dispatched':
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Dispatched</Badge>;
      case 'delivered':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (paymentMode: string) => {
    switch (paymentMode) {
      case 'credits':
        return <Badge variant="outline" className="border-emerald-500 text-emerald-600">Credits Only</Badge>;
      case 'inr':
        return <Badge variant="outline" className="border-blue-500 text-blue-600">INR Only</Badge>;
      case 'mixed':
        return <Badge variant="outline" className="border-purple-500 text-purple-600">Mixed Payment</Badge>;
      default:
        return <Badge variant="outline">{paymentMode}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.employee.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentMode === paymentFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.orderDate);
      const now = new Date();
      switch (dateFilter) {
        case 'today':
          matchesDate = orderDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const handleOrderAction = (orderId: string, action: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const now = new Date().toISOString();
        switch (action) {
          case 'approve':
            return { ...order, status: 'approved', approvedDate: now };
          case 'reject':
            return { ...order, status: 'cancelled', notes: 'Rejected by admin' };
          case 'dispatch':
            return { 
              ...order, 
              status: 'dispatched', 
              dispatchedDate: now,
              trackingId: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            };
          default:
            return order;
        }
      }
      return order;
    }));
  };

  const handleBulkAction = (action: string) => {
    if (selectedOrders.length === 0) return;
    
    setOrders(prev => prev.map(order => {
      if (selectedOrders.includes(order.id)) {
        const now = new Date().toISOString();
        switch (action) {
          case 'approve':
            return order.status === 'pending' ? { ...order, status: 'approved', approvedDate: now } : order;
          case 'dispatch':
            return order.status === 'approved' ? { 
              ...order, 
              status: 'dispatched', 
              dispatchedDate: now,
              trackingId: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            } : order;
          default:
            return order;
        }
      }
      return order;
    }));
    setSelectedOrders([]);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-2">Manage employee redemptions and order lifecycle</p>
        </div>
        <div className="flex gap-3">
          {selectedOrders.length > 0 && (
            <>
              <Button 
                variant="outline" 
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                onClick={() => handleBulkAction('approve')}
              >
                <Check className="h-4 w-4 mr-2" />
                Approve Selected ({selectedOrders.length})
              </Button>
              <Button 
                variant="outline" 
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
                onClick={() => handleBulkAction('dispatch')}
              >
                <Truck className="h-4 w-4 mr-2" />
                Dispatch Selected ({selectedOrders.length})
              </Button>
            </>
          )}
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-semibold">{statusCounts.pending || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-xl font-semibold">{statusCounts.approved || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Truck className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Dispatched</p>
                <p className="text-xl font-semibold">{statusCounts.dispatched || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Package className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-xl font-semibold">{statusCounts.delivered || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-xl font-semibold">{statusCounts.cancelled || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Orders</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders, employees, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="dispatched">Dispatched</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="credits">Credits Only</SelectItem>
                  <SelectItem value="inr">INR Only</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedOrders(filteredOrders.map(o => o.id));
                        } else {
                          setSelectedOrders([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedOrders(prev => [...prev, order.id]);
                          } else {
                            setSelectedOrders(prev => prev.filter(id => id !== order.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-emerald-600">{order.id}</div>
                      {order.trackingId && (
                        <div className="text-xs text-gray-500">Track: {order.trackingId}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.employee.name}</div>
                        <div className="text-sm text-gray-500">{order.employee.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{order.employee.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{product.name}</span>
                            <span className="text-gray-500">×{product.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm">
                        <div className="font-medium">{order.totalCredits.toLocaleString()} credits</div>
                        {order.paymentMode !== 'credits' && (
                          <div className="text-gray-500">₹{order.inrAmount.toLocaleString()}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getPaymentBadge(order.paymentMode)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(order.orderDate)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Employee Information</h4>
                                    <div className="space-y-1 text-sm">
                                      <p><span className="text-gray-600">Name:</span> {selectedOrder.employee.name}</p>
                                      <p><span className="text-gray-600">Email:</span> {selectedOrder.employee.email}</p>
                                      <p><span className="text-gray-600">Company:</span> {selectedOrder.employee.company}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Order Timeline</h4>
                                    <div className="space-y-1 text-sm">
                                      <p><span className="text-gray-600">Ordered:</span> {formatDate(selectedOrder.orderDate)}</p>
                                      <p><span className="text-gray-600">Approved:</span> {formatDate(selectedOrder.approvedDate)}</p>
                                      <p><span className="text-gray-600">Dispatched:</span> {formatDate(selectedOrder.dispatchedDate)}</p>
                                      <p><span className="text-gray-600">Delivered:</span> {formatDate(selectedOrder.deliveredDate)}</p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Products</h4>
                                  <div className="border rounded-lg p-3 space-y-2">
                                    {selectedOrder.products.map((product, index) => (
                                      <div key={index} className="flex justify-between items-center">
                                        <span>{product.name}</span>
                                        <span className="text-sm text-gray-600">
                                          {product.quantity} × {product.credits} credits
                                        </span>
                                      </div>
                                    ))}
                                    <div className="border-t pt-2 flex justify-between font-medium">
                                      <span>Total:</span>
                                      <span>{selectedOrder.totalCredits.toLocaleString()} credits</span>
                                    </div>
                                  </div>
                                </div>
                                {selectedOrder.notes && (
                                  <div>
                                    <h4 className="font-medium mb-2">Notes</h4>
                                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                      {selectedOrder.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {order.status === 'pending' && (
                              <>
                                <DropdownMenuItem 
                                  onClick={() => handleOrderAction(order.id, 'approve')}
                                  className="text-emerald-600"
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Approve Order
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleOrderAction(order.id, 'reject')}
                                  className="text-red-600"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Reject Order
                                </DropdownMenuItem>
                              </>
                            )}
                            {order.status === 'approved' && (
                              <DropdownMenuItem 
                                onClick={() => handleOrderAction(order.id, 'dispatch')}
                                className="text-purple-600"
                              >
                                <Truck className="h-4 w-4 mr-2" />
                                Mark as Dispatched
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}