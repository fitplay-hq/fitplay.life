"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Shield, Users, CheckCircle, Mail, Clock } from "lucide-react";
import Logo from "@/components/logo";
import PasswordInput from "@/components/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Countdown timer effect
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, countdown]);

  const handleResendVerification = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (res.ok) {
        setResendSuccess(true);
        setCountdown(60); // Reset countdown
        setTimeout(() => setResendSuccess(false), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to resend verification email");
      }
    } catch (err) {
      setError("Failed to resend verification email");
    } finally {
      setResendLoading(false);
    }
  };

  const handleSignup = async (formData: FormData) => {
    if (!token) {
      setError(
        "No invitation token found. Please use the invitation link provided by your administrator or HR."
      );
      return;
    }

    setLoading(true);
    setError("");

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const phone = formData.get("phone") as string;
    const gender = formData.get("gender") as string;
    const birthDate = formData.get("birthDate") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!gender || !birthDate) {
      setError("Gender and birth date are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup/complete-signup", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          name,
          email,
          password,
          phone,
          gender,
          birthDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setUserEmail(email); // Save email for resend functionality
        setSuccess(true);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="FitPlay Logo"
              width={120}
              height={120}
              className="rounded-lg object-contain"
              priority
            />
          </div>
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                Invitation Required
              </CardTitle>
              <CardDescription>
                FitPlay is an invite-only corporate wellness platform. Please use the invitation link provided by your company administrator or HR manager to create your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full">
                <Link href="/login">Go to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-green-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-teal-500 rounded-full blur-xl"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header with FitPlay Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="FitPlay Logo"
              width={120}
              height={120}
              className="rounded-lg object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Registration
          </h1>
          <p className="text-gray-600">
            Fill in your details to activate your FitPlay account
          </p>
        </div>

        {/* Signup Card */}
        <Card className="bg-white/95 backdrop-blur-sm border-emerald-100 shadow-xl max-h-[85vh] flex flex-col">
          {!success ? (
            <>
              <CardHeader className="space-y-1 pb-4 flex-shrink-0">
                <CardTitle className="text-xl text-center text-gray-900">
                  Complete Your Account Setup
                </CardTitle>
                <CardDescription className="text-center text-gray-600 text-sm">
                  You've been invited to join FitPlay. Fill in your details to create your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto px-6 pb-8 scrollbar-hide">
                <form action={handleSignup} className="space-y-4 pb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your 10-digit phone number"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setPhone(value);
                      }}
                      pattern="[0-9]{10}"
                      title="Phone number must be exactly 10 digits"
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-gray-700">
                      Gender
                    </Label>
                    <Select name="gender" required>
                      <SelectTrigger className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-gray-700">
                      Birth Date
                    </Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700">
                      Password
                    </Label>
                    <PasswordInput
                      name="password"
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 pr-10"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">
                      Confirm Password
                    </Label>
                    <PasswordInput
                      name="confirmPassword"
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 pr-10"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium py-2.5"
                  >
                    {loading ? "Completing Signup..." : "Complete Signup"}
                  </Button>
                </form>

                <div className="mt-8 pb-4 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-700 mb-2">
                  Registration Complete!
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Your FitPlay account has been created successfully! We&apos;ve sent a verification email to{" "}
                  <span className="font-semibold text-emerald-600">{userEmail}</span>.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Check Your Email</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Please check your inbox and click the verification link to activate your account.
                  </p>
                  {resendSuccess && (
                    <div className="bg-green-100 border border-green-200 rounded p-2 mb-3">
                      <p className="text-sm text-green-800">✅ Verification email resent successfully!</p>
                    </div>
                  )}
                </div>

                {/* Countdown Timer */}
                {countdown > 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Didn't receive the email?</span>
                    </div>
                    <p className="text-sm text-yellow-700 mb-3">
                      You can request a new verification email in <span className="font-bold">{countdown}</span> seconds
                    </p>
                    <Button
                      disabled={true}
                      variant="outline"
                      className="w-full opacity-50"
                    >
                      Resend Verification Email ({countdown}s)
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-800">Still no email?</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Check your spam folder or request a new verification email
                    </p>
                    <Button
                      onClick={handleResendVerification}
                      disabled={resendLoading}
                      variant="outline"
                      className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    >
                      {resendLoading ? "Sending..." : "Resend Verification Email"}
                    </Button>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                  >
                    Go to Login
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Having trouble?{" "}
                    <a href="mailto:support@fitplay.life" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Contact Support
                    </a>
                  </p>
                </div>
              </CardContent>
            </>
          )}
        </Card>


      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
