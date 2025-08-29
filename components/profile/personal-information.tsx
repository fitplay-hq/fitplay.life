"use client";

import { useState } from "react";
import { Edit2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "next-auth";

export default function PersonalInformation({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);

  const [userInfo, setUserInfo] = useState(user);

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Information</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit2 className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={userInfo.name}
            disabled={!isEditing}
            onChange={(e) => setUserInfo({ ...user, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            value={userInfo.email}
            disabled={!isEditing}
            onChange={(e) => setUserInfo({ ...user, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label>role</label>
          <input value={userInfo.role} disabled />
        </div>
        {/* TODO: */}
        {/* <div className="space-y-2">
          <Label>Department</Label>
          <Input value={user.department} disabled />
        </div>
        <div classname="space-y-2">
          <label>employee id</label>
          <input value={user.employeeid} disabled />
        </div> */}
        {isEditing && (
          <Button onClick={handleSaveProfile} className="w-full">
            Save Changes
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
