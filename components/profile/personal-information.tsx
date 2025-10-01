"use client";

import { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { toast } from "sonner";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "next-auth";

interface ProfileData {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  wallet?: any;
  orders?: any[];
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function PersonalInformation({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);

  const {
    data: profileData,
    error: profileError,
    isLoading: profileLoading,
    mutate,
  } = useSWR("/api/profile", fetcher);

  const profile = profileData?.data;

  // Initialize edited profile when data loads
  useEffect(() => {
    if (profile && !editedProfile) {
      setEditedProfile(profile);
    }
  }, [profile, editedProfile]);

  const handleSaveProfile = async () => {
    if (!editedProfile) return;
    setSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedProfile.name,
          email: editedProfile.email,
          phone: editedProfile.phone,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      mutate(); // Refresh the SWR data
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save changes";
      toast.error("Failed to update profile", {
        description: errorMessage,
      });
    } finally {
      setSaving(false);
    }
  };

  if (profileLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  if (profileError) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-red-600 mb-4">
            Error loading profile: {profileError.message || "An error occurred"}
          </p>
          <Button onClick={() => mutate()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  if (!profile || !editedProfile) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-600">No profile data found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Information</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing) {
              setEditedProfile(profile); // Reset to current data when starting edit
            }
          }}
          disabled={saving}
        >
          <Edit2 className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={editedProfile.name || ""}
            disabled={!isEditing || saving}
            onChange={(e) =>
              setEditedProfile({ ...editedProfile, name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            value={editedProfile.email || ""}
            disabled={!isEditing || saving}
            onChange={(e) =>
              setEditedProfile({ ...editedProfile, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            value={editedProfile.phone || ""}
            disabled={!isEditing || saving}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              setEditedProfile({ ...editedProfile, phone: value });
            }}
            pattern="[0-9]{10}"
            title="Phone number must be exactly 10 digits"
            maxLength={10}
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Input value={editedProfile.role} disabled />
        </div>
        {isEditing && (
          <Button
            onClick={handleSaveProfile}
            className="w-full"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
