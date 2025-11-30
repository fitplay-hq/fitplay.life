"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserPlus, 
  Edit3, 
  Download, 
  Search, 
  Filter,
  Wallet,
  Building2,
  Mail,
  Calendar,
  Plus,
  Minus
} from "lucide-react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  company: {
    name: string;
  };
  wallet: {
    balance: number;
    expiryDate: string | null;
  };
  verified: boolean;
  claimed: boolean;
  createdAt: string;
}

interface CreditTransaction {
  type: 'ADD' | 'REMOVE';
  amount: number;
  reason: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UserManagementPage() {
  const { mutate: globalMutate } = useSWRConfig();
  const {
    data: userData,
    error: swrError,
    isLoading,
  } = useSWR("/api/admin/users", fetcher);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreditOpen, setIsCreditOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Credit transaction state
  const [creditTransaction, setCreditTransaction] = useState<CreditTransaction>({
    type: 'ADD',
    amount: 0,
    reason: ''
  });

  const users = userData?.users || [];
  const stats = userData?.stats || { total: 0, hr: 0, employees: 0, verified: 0 };

  // Filter and sort users
  const filteredUsers = users
    .filter((user: User) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesVerification = verificationFilter === "all" || 
                                  (verificationFilter === "verified" && user.verified) ||
                                  (verificationFilter === "unverified" && !user.verified);
      return matchesSearch && matchesRole && matchesVerification;
    })
    .sort((a: User, b: User) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "email":
          return a.email.localeCompare(b.email);
        case "company":
          return a.company.name.localeCompare(b.company.name);
        case "credits":
          return b.wallet.balance - a.wallet.balance;
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      await globalMutate("/api/admin/users");
      toast.success("User updated successfully");
      setIsEditOpen(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleCreditTransaction = async () => {
    if (!selectedUser || creditTransaction.amount <= 0 || !creditTransaction.reason.trim()) {
      toast.error("Please fill all fields with valid values");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}/credits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: creditTransaction.type,
          amount: creditTransaction.amount,
          reason: creditTransaction.reason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update credits");
      }

      await globalMutate("/api/admin/users");
      toast.success(`Credits ${creditTransaction.type === 'ADD' ? 'added' : 'removed'} successfully`);
      setIsCreditOpen(false);
      setSelectedUser(null);
      setCreditTransaction({ type: 'ADD', amount: 0, reason: '' });
    } catch (error) {
      toast.error("Failed to update credits");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleExportUsers = async () => {
    try {
      const response = await fetch("/api/admin/users/export");
      if (!response.ok) throw new Error("Export failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `users-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Users exported successfully");
    } catch (error) {
      toast.error("Failed to export users");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage user accounts, credits, and permissions</p>
        </div>
        <Button 
          onClick={handleExportUsers}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export Users
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HR Managers</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hr}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.employees}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verified}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Label htmlFor="search">Search Users</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-48">
              <Label>Role</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="HR">HR Managers</SelectItem>
                  <SelectItem value="EMPLOYEE">Employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-48">
              <Label>Verification Status</Label>
              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-48">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="credits">Credits</SelectItem>
                  <SelectItem value="created">Date Created</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.role === 'HR' ? 'default' : 'secondary'}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.company.name}</TableCell>
                    <TableCell className="font-semibold">
                      {user.wallet.balance} credits
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge 
                          variant={user.verified ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {user.verified ? 'Verified' : 'Unverified'}
                        </Badge>
                        <Badge 
                          variant={user.claimed ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {user.claimed ? 'Claimed' : 'Pending'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={isEditOpen && selectedUser?.id === user.id} onOpenChange={setIsEditOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogDescription>
                                Update user information. Changes will be logged for audit purposes.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">Name</Label>
                                <Input
                                  id="edit-name"
                                  defaultValue={selectedUser?.name}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">Email</Label>
                                <Input
                                  id="edit-email"
                                  defaultValue={selectedUser?.email}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                                Cancel
                              </Button>
                              <Button 
                                onClick={() => {
                                  const name = (document.getElementById('edit-name') as HTMLInputElement)?.value;
                                  const email = (document.getElementById('edit-email') as HTMLInputElement)?.value;
                                  if (selectedUser && name && email) {
                                    handleUpdateUser(selectedUser.id, { name, email } as Partial<User>);
                                  }
                                }}
                                disabled={updating}
                              >
                                {updating ? "Updating..." : "Update User"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={isCreditOpen && selectedUser?.id === user.id} onOpenChange={setIsCreditOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                              className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                            >
                              <Wallet className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>Manage Credits</DialogTitle>
                              <DialogDescription>
                                Add or remove credits for {selectedUser?.name}. Current balance: {selectedUser?.wallet.balance} credits
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Action</Label>
                                <Select 
                                  value={creditTransaction.type} 
                                  onValueChange={(value: 'ADD' | 'REMOVE') => 
                                    setCreditTransaction({...creditTransaction, type: value})
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="ADD">
                                      <div className="flex items-center gap-2">
                                        <Plus className="h-4 w-4 text-green-600" />
                                        Add Credits
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="REMOVE">
                                      <div className="flex items-center gap-2">
                                        <Minus className="h-4 w-4 text-red-600" />
                                        Remove Credits
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Amount</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  placeholder="Enter amount"
                                  value={creditTransaction.amount}
                                  onChange={(e) => setCreditTransaction({
                                    ...creditTransaction, 
                                    amount: parseInt(e.target.value) || 0
                                  })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Reason</Label>
                                <Input
                                  placeholder="Reason for credit adjustment"
                                  value={creditTransaction.reason}
                                  onChange={(e) => setCreditTransaction({
                                    ...creditTransaction, 
                                    reason: e.target.value
                                  })}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setIsCreditOpen(false);
                                  setCreditTransaction({ type: 'ADD', amount: 0, reason: '' });
                                }}
                              >
                                Cancel
                              </Button>
                              <Button 
                                onClick={handleCreditTransaction}
                                disabled={updating || creditTransaction.amount <= 0 || !creditTransaction.reason.trim()}
                                className={creditTransaction.type === 'ADD' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                              >
                                {updating ? "Processing..." : `${creditTransaction.type === 'ADD' ? 'Add' : 'Remove'} Credits`}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}