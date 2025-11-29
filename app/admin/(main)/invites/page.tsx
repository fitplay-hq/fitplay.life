"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, Users, UserPlus, Building, Link as LinkIcon } from "lucide-react";
import { useSession } from "next-auth/react";

interface InviteLink {
  signupLink: string;
  role: string;
  companyName: string;
  employeeCount?: number;
  createdAt: Date;
}

export default function CreateInvitePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    companyName: "",
    companyAddress: "",
    employeeCount: ""
  });
  const [generatedLinks, setGeneratedLinks] = useState<InviteLink[]>([]);

  // Load saved links from localStorage on mount
  React.useEffect(() => {
    const savedLinks = localStorage.getItem('fitplay-admin-invites');
    if (savedLinks) {
      try {
        const parsed = JSON.parse(savedLinks);
        setGeneratedLinks(parsed);
      } catch (error) {
        console.error('Error loading saved invites:', error);
      }
    }
  }, []);

  // Save links to localStorage whenever generatedLinks changes
  React.useEffect(() => {
    if (generatedLinks.length > 0) {
      localStorage.setItem('fitplay-admin-invites', JSON.stringify(generatedLinks));
    }
  }, [generatedLinks]);

  const isAdmin = session?.user?.role === "ADMIN";
  const isHR = session?.user?.role === "HR";

  const handleCreateInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        role: formData.role,
        companyName: formData.companyName,
        ...(formData.role === "HR" && { companyAddress: formData.companyAddress }),
        ...(formData.role === "EMPLOYEE" && { employeeCount: parseInt(formData.employeeCount) })
      };

      const response = await fetch("/api/auth/signup/create-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create invite");
      }

      const newInvite: InviteLink = {
        signupLink: data.signupLink,
        role: formData.role,
        companyName: formData.companyName,
        employeeCount: formData.role === "EMPLOYEE" ? parseInt(formData.employeeCount) : undefined,
        createdAt: new Date()
      };

      setGeneratedLinks([newInvite, ...generatedLinks]);
      
      if (formData.role === "HR") {
        toast.success("HR invitation created! Share the link with your HR manager to complete their registration.");
      } else {
        toast.success(`Employee invitations created! Share the link with up to ${formData.employeeCount} employees.`);
      }
      
      // Reset form
      setFormData({
        role: "",
        companyName: "",
        companyAddress: "",
        employeeCount: ""
      });

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create invite");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Invite link copied to clipboard!");
  };

  const clearHistory = () => {
    setGeneratedLinks([]);
    localStorage.removeItem('fitplay-admin-invites');
    toast.success("Invite history cleared!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Invitations</h1>
          <p className="text-gray-600">Create invitation links for HR managers (with new companies) and employees to join the FitPlay platform</p>
        </div>
      </div>

      {/* Create Invite Form */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="bg-white">
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            Generate New Invitation
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <form onSubmit={handleCreateInvite} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">User Role *</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({...formData, role: value})}
                  required
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    {isAdmin && (
                      <SelectItem value="HR">HR Manager</SelectItem>
                    )}
                    {(isAdmin || isHR) && (
                      <SelectItem value="EMPLOYEE">Employee</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Enter company name"
                  className="bg-white border-gray-300"
                  required
                />
              </div>

              {/* Company Address (HR Only) */}
              {formData.role === "HR" && (
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="companyAddress">Company Address *</Label>
                  <Input
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
                    placeholder="Enter company address"
                    className="bg-white border-gray-300"
                    required
                  />
                </div>
              )}

              {/* Employee Count (Employee Only) */}
              {formData.role === "EMPLOYEE" && (
                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Number of Employees *</Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({...formData, employeeCount: e.target.value})}
                    placeholder="Enter number of employees"
                    className="bg-white border-gray-300"
                    required
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? "Creating..." : "Create Invitation Link"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Generated Links */}
      {generatedLinks.length > 0 && (
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-600" />
                Generated Invitation Links ({generatedLinks.length})
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearHistory}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear History
              </Button>
            </div>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="space-y-4">
              {generatedLinks.map((invite, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={invite.role === "HR" ? "default" : "secondary"}>
                          {invite.role}
                        </Badge>
                        <span className="font-medium">{invite.companyName}</span>
                        {invite.employeeCount && (
                          <span className="text-sm text-gray-600">
                            ({invite.employeeCount} employees)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        Created: {new Date(invite.createdAt).toLocaleDateString()} at {new Date(invite.createdAt).toLocaleTimeString()}
                      </div>
                      <div className="bg-white p-3 rounded border font-mono text-sm break-all">
                        {invite.signupLink}
                      </div>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(invite.signupLink)}
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Invitation Flow</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Step 1:</strong> Admin creates HR invite (with new company) and employee slots</li>
                <li>• <strong>Step 2:</strong> Send HR link to HR manager to complete their registration</li>
                <li>• <strong>Step 3:</strong> HR shares employee links with their team members</li>
                <li>• <strong>Step 4:</strong> All users complete registration and verify their email</li>
                <li>• <strong>Note:</strong> All invitation links are valid for 7 days from creation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}