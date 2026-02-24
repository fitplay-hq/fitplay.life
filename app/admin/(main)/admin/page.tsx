"use client";

import useSWR from "swr";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminTab() {
  const { data, mutate } = useSWR("/api/admin/manage", fetcher);
  const admins = data?.admins || [];
  const total = data?.total || 0;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleAdd = async () => {
    await fetch("/api/admin/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", email: "", password: "" });
    mutate();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/manage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    mutate();
  };

  return (
    <div className="space-y-6">

      {/* Total Admin Card */}
      <Card className="border-l-4 border-l-indigo-500">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Total Admins</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </CardContent>
      </Card>

      {/* Add Admin */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <Button onClick={handleAdd} className="flex gap-2">
            <Plus className="w-4 h-4" />
            Add Admin
          </Button>
        </CardContent>
      </Card>

      {/* Admin Table */}
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin: any) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(admin.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}