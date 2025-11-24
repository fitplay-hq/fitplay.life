"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Users,
  Mail,
  Phone,
  Calendar,
  Wallet,
  Plus,
  Minus,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  gender?: string;
  verified: boolean;
  claimed: boolean;
  createdAt: string;
  wallet?: {
    balance: number;
    expiryDate: string;
  };
}

export default function HREmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [creditAmount, setCreditAmount] = useState("");
  const [creditLoading, setCreditLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data.users || []);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreditUpdate = async () => {
    if (!selectedEmployee || !creditAmount) {
      toast.error("Please enter a valid wallet amount");
      return;
    }

    const amount = parseFloat(creditAmount);
    if (isNaN(amount)) {
      toast.error("Please enter a valid number");
      return;
    }

    setCreditLoading(true);
    try {
      const response = await fetch("/api/wallets", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedEmployee.id,
          creditAmount: amount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`Wallet ${amount > 0 ? 'credited' : 'debited'} successfully!`);
        
        // Update local state
        setEmployees(prev => 
          prev.map(emp => 
            emp.id === selectedEmployee.id
              ? {
                  ...emp,
                  wallet: {
                    ...emp.wallet,
                    balance: data.data.newBalance,
                  } as any,
                }
              : emp
          )
        );
        
        setCreditDialogOpen(false);
        setCreditAmount("");
        setSelectedEmployee(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to update wallet");
      }
    } catch (error) {
      toast.error("Failed to update wallet");
    } finally {
      setCreditLoading(false);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.includes(searchTerm)
  );

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.verified && e.claimed).length,
    pending: employees.filter(e => !e.verified || !e.claimed).length,
    totalCredits: employees.reduce((sum, e) => sum + (e.wallet?.balance || 0), 0),
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </CardHeader>
              <CardContent>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Employee Management
        </h1>
        <p className="text-gray-600">
          View and manage all company employees
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Setup</CardTitle>
            <Users className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {stats.totalCredits.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Employee Directory</CardTitle>
          <CardDescription>
            Search and view all company employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {employee.email}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {employee.phone}
                    </div>
                    {employee.gender && (
                      <div className="text-xs text-gray-500">
                        {employee.gender}
                      </div>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={employee.role === "HR" ? "default" : "secondary"}>
                      {employee.role}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <Badge 
                        variant={employee.verified ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {employee.verified ? "Verified" : "Unverified"}
                      </Badge>
                      <Badge 
                        variant={employee.claimed ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {employee.claimed ? "Active" : "Pending"}
                      </Badge>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-medium">
                      {employee.wallet?.balance?.toLocaleString() || 0}
                    </div>
                    {employee.wallet?.expiryDate && (
                      <div className="text-xs text-gray-500">
                        Expires: {new Date(employee.wallet.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setCreditAmount("");
                            setCreditDialogOpen(true);
                          }}
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Manage Wallet
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredEmployees.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No employees found
              </h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search criteria" : "No employees in your company yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Credit Management Dialog */}
      <Dialog open={creditDialogOpen} onOpenChange={setCreditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-gray-200 shadow-xl">
          <DialogHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 -m-6 mb-4 p-6 rounded-t-lg border-b">
            <DialogTitle className="text-xl font-bold text-emerald-800">Manage Employee Wallet</DialogTitle>
            <DialogDescription className="text-emerald-700">
              {selectedEmployee && (
                <div className="space-y-2 mt-2">
                  <div>Update wallet balance for <strong className="text-emerald-800">{selectedEmployee.name}</strong></div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-emerald-200">
                    <span className="text-sm">Current Balance: </span>
                    <strong className="text-lg text-emerald-700">{selectedEmployee.wallet?.balance?.toLocaleString() || 0} credits</strong>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-6 bg-gray-50 -mx-6 px-6">
            <div className="space-y-3">
              <Label htmlFor="creditAmount" className="text-sm font-semibold text-gray-700">
                Wallet Amount (use negative number to deduct)
              </Label>
              <Input
                id="creditAmount"
                type="number"
                placeholder="Enter amount (e.g., 1000 or -500)"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="w-full border-2 border-gray-200 focus:border-emerald-500 bg-white shadow-sm"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Quick Actions</Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700 font-medium"
                  onClick={() => setCreditAmount("1000")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add 1000
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700 font-medium"
                  onClick={() => setCreditAmount("5000")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add 5000
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-red-50 border-red-200 hover:bg-red-100 text-red-700 font-medium"
                  onClick={() => setCreditAmount("-1000")}
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Deduct 1000
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="bg-white -mx-6 -mb-6 px-6 py-4 border-t border-gray-200 rounded-b-lg">
            <div className="flex justify-end gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => {
                  setCreditDialogOpen(false);
                  setCreditAmount("");
                  setSelectedEmployee(null);
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreditUpdate}
                disabled={creditLoading || !creditAmount}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg font-semibold px-6"
              >
                {creditLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    Update Wallet
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}