import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
  Calendar,
  Building2,
  User,
  CreditCard,
  TrendingUp,
  TrendingDown
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DatePickerWithRange } from '../ui/date-picker-with-range';

// Mock transactions data
const transactionsData = [
  {
    id: 'TXN-2024-001',
    employee: {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@techcorp.com',
      company: 'TechCorp India'
    },
    amount: 3000,
    type: 'credit_redemption',
    description: 'Redeemed credits for yoga mat and resistance bands',
    date: '2024-03-15T10:30:00Z',
    status: 'completed',
    orderId: 'ORD-2024-001',
    method: 'credits'
  },
  {
    id: 'TXN-2024-002',
    employee: {
      name: 'Priya Sharma',
      email: 'priya.sharma@innovatetech.com',
      company: 'InnovateTech Solutions'
    },
    amount: 1600,
    type: 'inr_payment',
    description: 'INR payment for whey protein powder',
    date: '2024-03-14T14:20:00Z',
    status: 'completed',
    orderId: 'ORD-2024-002',
    method: 'credit_card'
  },
  {
    id: 'TXN-2024-003',
    employee: {
      name: 'Amit Patel',
      email: 'amit.patel@healthfirst.com',
      company: 'HealthFirst Ltd'
    },
    amount: 1800,
    type: 'credit_redemption',
    description: 'Redeemed credits for meditation cushion and foam roller',
    date: '2024-03-13T09:15:00Z',
    status: 'completed',
    orderId: 'ORD-2024-003',
    method: 'credits'
  },
  {
    id: 'TXN-2024-004',
    employee: {
      name: 'Sneha Reddy',
      email: 'sneha.reddy@globaltech.com',
      company: 'GlobalTech Enterprise'
    },
    amount: 600,
    type: 'inr_payment',
    description: 'INR payment for professional yoga mat',
    date: '2024-03-10T11:45:00Z',
    status: 'completed',
    orderId: 'ORD-2024-004',
    method: 'upi'
  },
  {
    id: 'TXN-2024-005',
    employee: {
      name: 'Corporate Account',
      email: 'admin@techcorp.com',
      company: 'TechCorp India'
    },
    amount: 50000,
    type: 'credit_allocation',
    description: 'Monthly credit allocation for employees',
    date: '2024-03-01T00:00:00Z',
    status: 'completed',
    orderId: null,
    method: 'bulk_allocation'
  },
  {
    id: 'TXN-2024-006',
    employee: {
      name: 'Vikram Singh',
      email: 'vikram.singh@datasoft.com',
      company: 'DataSoft Solutions'
    },
    amount: 1800,
    type: 'refund',
    description: 'Refund for cancelled order - resistance band set',
    date: '2024-03-12T18:45:00Z',
    status: 'processed',
    orderId: 'ORD-2024-005',
    method: 'credit_return'
  },
  {
    id: 'TXN-2024-007',
    employee: {
      name: 'Anita Desai',
      email: 'anita.desai@innovatetech.com',
      company: 'InnovateTech Solutions'
    },
    amount: 2500,
    type: 'credit_purchase',
    description: 'Purchased additional credits (5000 credits for ₹2500)',
    date: '2024-03-11T15:30:00Z',
    status: 'completed',
    orderId: null,
    method: 'credit_card'
  },
  {
    id: 'TXN-2024-008',
    employee: {
      name: 'Rohit Gupta',
      email: 'rohit.gupta@healthfirst.com',
      company: 'HealthFirst Ltd'
    },
    amount: 2400,
    type: 'mixed_payment',
    description: 'Mixed payment: 1600 credits + ₹400 for fitness equipment',
    date: '2024-03-09T12:20:00Z',
    status: 'completed',
    orderId: 'ORD-2024-008',
    method: 'mixed'
  }
];

export function TransactionsManagement() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [dateRange, setDateRange] = useState<any>(null);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'credit_redemption':
        return (
          <Badge variant="outline" className="border-emerald-500 text-emerald-600">
            <ArrowDownLeft className="h-3 w-3 mr-1" />
            Credit Redemption
          </Badge>
        );
      case 'inr_payment':
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-600">
            <CreditCard className="h-3 w-3 mr-1" />
            INR Payment
          </Badge>
        );
      case 'credit_allocation':
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-600">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            Credit Allocation
          </Badge>
        );
      case 'refund':
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-600">
            <RefreshCcw className="h-3 w-3 mr-1" />
            Refund
          </Badge>
        );
      case 'credit_purchase':
        return (
          <Badge variant="outline" className="border-indigo-500 text-indigo-600">
            <Coins className="h-3 w-3 mr-1" />
            Credit Purchase
          </Badge>
        );
      case 'mixed_payment':
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            Mixed Payment
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Completed</Badge>;
      case 'processed':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Processed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAmountDisplay = (transaction: any) => {
    if (transaction.type === 'credit_redemption' || transaction.type === 'credit_allocation') {
      return `${transaction.amount.toLocaleString()} credits`;
    } else if (transaction.type === 'credit_purchase') {
      return `₹${transaction.amount.toLocaleString()}`;
    } else {
      return `₹${transaction.amount.toLocaleString()}`;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.employee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesCompany = companyFilter === 'all' || transaction.employee.company === companyFilter;
    
    let matchesDate = true;
    if (dateRange?.from && dateRange?.to) {
      const transactionDate = new Date(transaction.date);
      matchesDate = transactionDate >= dateRange.from && transactionDate <= dateRange.to;
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesCompany && matchesDate;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const companies = [...new Set(transactions.map(t => t.employee.company))];

  // Calculate totals
  const totalCreditsRedeemed = transactions
    .filter(t => t.type === 'credit_redemption' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalINRTransactions = transactions
    .filter(t => (t.type === 'inr_payment' || t.type === 'credit_purchase') && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = transactions
    .filter(t => t.type === 'refund' && t.status === 'processed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCreditsAllocated = transactions
    .filter(t => t.type === 'credit_allocation' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions Management</h1>
          <p className="text-gray-600 mt-2">Track credits, payments, and refunds across the platform</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Sync Transactions
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <ArrowDownLeft className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Credits Redeemed</p>
                <p className="text-xl font-semibold">{totalCreditsRedeemed.toLocaleString()}</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">INR Transactions</p>
                <p className="text-xl font-semibold">₹{totalINRTransactions.toLocaleString()}</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Credits Allocated</p>
                <p className="text-xl font-semibold">{totalCreditsAllocated.toLocaleString()}</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <RefreshCcw className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Refunds Processed</p>
                <p className="text-xl font-semibold">{totalRefunds.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Credits returned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Transactions</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit_redemption">Credit Redemption</SelectItem>
                  <SelectItem value="inr_payment">INR Payment</SelectItem>
                  <SelectItem value="credit_allocation">Credit Allocation</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                  <SelectItem value="credit_purchase">Credit Purchase</SelectItem>
                  <SelectItem value="mixed_payment">Mixed Payment</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <Building2 className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map(company => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
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
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="font-medium text-emerald-600">{transaction.id}</div>
                      {transaction.orderId && (
                        <div className="text-xs text-gray-500">Order: {transaction.orderId}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {transaction.employee.name}
                        </div>
                        <div className="text-sm text-gray-500">{transaction.employee.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{transaction.employee.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 truncate" title={transaction.description}>
                          {transaction.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium">
                        {getAmountDisplay(transaction)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {transaction.method.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(transaction.date)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <Coins className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}