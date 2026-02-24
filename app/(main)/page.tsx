"use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  BookOpen,
  Video,
  ShoppingBag,
  ArrowRight,
  Check,
  Clock,
  Star,
  Activity,
} from "lucide-react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/app/hooks/useUser";
import ConnectShopifyPage from "../components/vendor/vendor";
import { useProducts } from "@/app/hooks/useProducts";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import { HomeCarousel } from "../../components/home/HomeCarousel";
import { Testimonials } from "../../components/home/testimonials/Testimonials";

const TAB_STORAGE_KEY = "sova-active-tab";

function SimpleAnimatedHeading() {
  const texts = ["Learn About Gut Health", "Take Gut Test Today"];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className={`text-3xl sm:text-4xl md:text-5xl mt-4 font-bold text-emerald-800
        transition-opacity duration-1000
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {texts[index]}
    </h1>
  );
}
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200" />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 rounded" />

        {/* Description */}
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />

        {/* Rating */}
        <div className="h-4 w-24 bg-gray-200 rounded" />

        {/* Button */}
        <div className="pt-4 border-t border-gray-100">
          <div className="h-10 w-24 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function SovaHealthPage() {
  const [activeTab, setActiveTab] = useState("quiz");
  const { user, isAuthenticated, refreshSession } = useUser();
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTab = localStorage.getItem(TAB_STORAGE_KEY);
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  const changeTab = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem(TAB_STORAGE_KEY, tab);
  };

  useEffect(() => {
    const load = async () => {
      setIsLoadingProgress(true);
      const res = await fetch("/api/course/progress");
      const data = await res.json();

      if (!data) return;

      const totalModules = 9;
      const completedCount = data.completedModules?.length || 0;

      setCourseProgress({
        isEnrolled: data.isEnrolled,
        progressPercentage: Math.round((completedCount / totalModules) * 100),
        completedModules: completedCount,
        totalModules,
      });
      setIsLoadingProgress(false);
    };

    load();
  }, []);

  const { products, isLoading, error } = useProducts();
  const router = useRouter();
  const [courseProgress, setCourseProgress] = useState({
    isEnrolled: false,
    progressPercentage: 0,
    completedModules: 0,
    totalModules: 0,
  });

  // Load enrollment and progress on mount

  const handleEnrollClick = async () => {
    if (!isAuthenticated) {
      // show paid/signup modal instead of direct login
      setShowPaidModal(true);
      return;
    } else {
      await fetch("/api/course/enroll", { method: "POST" });
      router.push("/coursepage");
      router.push("/coursepage");
    }
  };

  const handleResumeClick = () => {
    if (!isAuthenticated) {
      setShowPaidModal(true);
      return;
    } else {
      router.push("/coursepage");
    }
  };

  const [open, setOpen] = useState(false);
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [paywallType, setPaywallType] = useState<
    "quiz" | "course" | "consultation" | "start" | null
  >(null); // 'quiz' | 'course' | 'consultation'

  // Helper: is user a company user
  // Extend user type to include hasPaidBundle and phone
  // User type for paywall logic
  type UserType = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    company?: any;
    companyId?: string;
    hasPaidBundle?: boolean;
    hasWellnessStarterBundle?: boolean;
    phone?: string | null;
    role?: string;
  };
  const typedUser = user as UserType | undefined;

  const isCompanyUser = !!typedUser?.companyId;
  const isNonCompanyUser = !!typedUser && !typedUser?.companyId;

  // Show paywall for non-company, non-paid users only
  const requirePaywallOrAction = (type, action) => {
    if (!isAuthenticated) {
      setPaywallType(type);
      setShowPaidModal(true);
      return false;
    }

    if (typedUser?.hasWellnessStarterBundle || typedUser?.hasPaidBundle) {
      action();
      return true;
    }

    if (!typedUser?.hasWellnessStarterBundle && !typedUser?.hasPaidBundle) {
      setPaywallType(type);
      setShowPaidModal(true);
      return false;
    }

    action();
    return true;
  };

  const loadQuiz = () => {
    const oldScript = document.getElementById("quizell-script");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.src = "https://api.quizell.com/js/qzembed.js?v=24999";
    script.async = true;
    script.id = "quizell-script";
    script.setAttribute("data-qz-key", "oQ8cX8");

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      loadQuiz();
    }, 100);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const quizzes = [
    {
      title: "Gut Health Assessment",
      description: "Discover your digestive health score",
      duration: "5 min",
      icon: Activity,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const courses = [
    {
      title: "Complete Gut Health Masterclass",
      rating: 4.9,
      price: "",
      image: "🌿",
    },
  ];

  const getButtonContent = () => {
    if (!courseProgress.isEnrolled) {
      return {
        text: "Enroll Now",
        onClick: handleEnrollClick,
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      };
    } else if (courseProgress.progressPercentage === 100) {
      return {
        text: "Completed",
        onClick: handleResumeClick,
        className: "bg-green-100 text-green-700 cursor-default",
        icon: <Check className="w-4 h-4" />,
      };
    } else {
      return {
        text: "Resume",
        onClick: handleResumeClick,
        className: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      };
    }
  };

  if (user?.role === "VENDOR") {
    return <ConnectShopifyPage></ConnectShopifyPage>;
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full h-[92vh] md:h-auto md:max-w-3xl bg-slate-950 rounded-t-2xl md:rounded-2xl shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-white font-semibold text-sm md:text-base">
                Gut Health Quiz FITPLAY x SOVA
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="h-full overflow-y-auto p-3 md:p-4">
              <div
                id="oQ8cX8"
                data-quizlang="en"
                className="min-h-[400px] rounded-xl border border-emerald-500/30"
              />
            </div>
          </div>
        </div>
      )}

      {showPaidModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-white max-w-md w-full mx-4 rounded-2xl shadow-2xl overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />

            <button
              onClick={() => setShowPaidModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors z-10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {!isAuthenticated ? (
              <div className="relative p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.25)] overflow-hidden">
                {/* Soft Gradient Glow */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-emerald-300/30 to-teal-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gradient-to-tr from-teal-200/40 to-emerald-200/20 rounded-full blur-3xl" />

                {/* Floating Icon */}
                <div className="relative w-18 h-18 mb-8 animate-[float_4s_ease-in-out_infinite]">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-300/40" />
                  <div className="relative w-18 h-18 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.7}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Badge */}
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Start Your Health Journey Today
                </span>

                {/* Heading */}
                <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                  Sign in to continue
                </h3>

                {/* Subtext */}
                <p className="text-sm  text-green-600 mb-10 leading-relaxed max-w-md">
                  Part of a company or an individual user with an existing
                  account? Sign in to continue
                </p>
                <p className="text-lg font-semibold text-green-900 mb-10 leading-relaxed max-w-md">
                  Create your free account to get started.
                </p>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  <span className="text-xs text-gray-400 font-medium tracking-wide">
                    Choose an option
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4">
                  {/* Sign In */}
                  <button
                    className="group relative w-full py-4 rounded-2xl border border-emerald-200 bg-white text-emerald-600 font-semibold text-sm transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-300/40 active:scale-[0.97] overflow-hidden"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path
                          strokeLinecap="round"
                          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                        />
                      </svg>
                      Sign in
                    </span>
                  </button>

                  {/* Sign Up */}
                  <button
                    className="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/40 hover:-translate-y-1 active:scale-[0.97]"
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="10" cy="8" r="4" />
                        <path
                          strokeLinecap="round"
                          d="M2 20c0-4 3.6-7 8-7s8 3 8 7"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 8v6M16 11h6"
                        />
                      </svg>
                      Create free account
                    </span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="relative mt-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6 shadow-[0_10px_30px_rgba(16,185,129,0.08)]">
                  {/* Trust Indicators */}
                  <div className="flex justify-center gap-8 text-xs font-medium text-gray-600">
                    {/* Secure */}
                    <div className="flex items-center gap-2 group transition-all duration-300 hover:-translate-y-0.5 hover:text-emerald-600">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                        <svg
                          className="w-3.5 h-3.5 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <span>Secure</span>
                    </div>

                    {/* Instant Access */}
                    <div className="flex items-center gap-2 group transition-all duration-300 hover:-translate-y-0.5 hover:text-emerald-600">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                        <svg
                          className="w-3.5 h-3.5 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <span>Instant Access</span>
                    </div>

                    {/* Free Signup */}
                    <div className="flex items-center gap-2 group transition-all duration-300 hover:-translate-y-0.5 hover:text-emerald-600">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                        <svg
                          className="w-3.5 h-3.5 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>Free Signup</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

                  {/* Footer */}
                  <p className="text-center text-xs text-gray-500 leading-relaxed">
                    By continuing, you agree to our{" "}
                    <span className="text-emerald-600 font-medium hover:underline cursor-pointer">
                      Terms
                    </span>{" "}
                    &{" "}
                    <span className="text-emerald-600 font-medium hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <span className="inline-block text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-2">
                    Exclusive Bundle
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    Wellness Starter Bundle
                  </h3>
                </div>

                {/* What's included */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: "🧬", label: "Gut Health Assessment" },
                    { icon: "🎓", label: "Gut Health Masterclass" },
                    { icon: "👨‍⚕️", label: "1:1 Expert Consultation" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-base shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {item.label}
                      </span>
                      <div className="ml-auto">
                        <svg
                          className="w-4 h-4 text-emerald-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price block */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-4 mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">
                      One-time access fee
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹299{" "}
                      <span className="text-sm font-normal text-gray-400 line-through">
                        ₹999
                      </span>
                    </p>
                  </div>
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    70% OFF
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={async () => {
                    const script = document.createElement("script");
                    script.src = "https://checkout.razorpay.com/v1/checkout.js";
                    script.async = true;
                    document.body.appendChild(script);
                    await new Promise((resolve) => {
                      script.onload = resolve;
                    });

                    const orderRes = await fetch("/api/payments/create-order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ amount: 299, isCash: true }),
                    });
                    const orderData = await orderRes.json();
                    console.log(orderData);
                    if (!orderData?.key) {
                      toast.error("failed to create payment order");
                      return;
                    }
                    console.log("typed user:", typedUser);

                    console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
                    const options = {
                      key: orderData.key,
                      amount: 29900,
                      currency: "INR",
                      name: "FitPlay Life",
                      description: "Wellness Starter Bundle",
                      order_id: orderData.razorpayOrderId,
                      handler: async function (response: any) {
                        console.log("RAZORPAY FULL RESPONSE:", response);
                        const verifyRes = await fetch(
                          "/api/payments/verify-guest",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              razorpay_payment_id: response.razorpay_payment_id,
                              razorpay_order_id: response.razorpay_order_id,
                              razorpay_signature: response.razorpay_signature,
                              bundle: true,
                            }),
                          }
                        );

                        if (verifyRes.ok) {
                          toast.success("Payment successful! Access unlocked.");
                          setShowPaidModal(false);
                          await refreshSession();
                        } else {
                          const data = await verifyRes.json();
                          toast.error(
                            data.error || "Payment verification failed"
                          );
                        }
                      },
                      prefill: {
                        name: typedUser?.name || "",
                        email: typedUser?.email || "",
                        contact: typedUser?.phone || "",
                      },
                      theme: { color: "#10B981" },
                    };
                    const rzp = new window.Razorpay(options);
                    rzp.open();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-base hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200 mb-3"
                >
                  Unlock Now — ₹299 only
                </button>
                <button
                  onClick={async () => {
                    const res = await fetch("/api/bundle-purchase", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                    });
                    const data = await res.json();
                    if (data.error) {
                      toast.error(data.error);
                    } else {
                      toast.success("Bundle purchased successfully!");
                      setShowPaidModal(false);
                      await refreshSession();
                    }
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-base hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200 mb-3"
                >
                  Buy Through Credits
                </button>

                <button
                  onClick={() => setShowPaidModal(false)}
                  className="w-full py-2.5 rounded-xl text-gray-400 text-sm hover:text-gray-600 transition-colors"
                >
                  Maybe later
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="h-24 " />

      <div className="mx-auto min-h-screen px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl w-full mx-auto mb-12">
          {/* Custom Carousel Section */}
          <HomeCarousel
            onGetStarted={() => {
              requirePaywallOrAction("start", () => {
                document.getElementById("module")?.scrollIntoView({
                  behavior: "smooth",
                });
              });
            }}
            onLearnMore={() => {
              document.getElementById("module")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          />
        </div>

        <Testimonials />

        <div className="max-w-7xl mx-auto mb-16" id="module">
          <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-3 border border-gray-100">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
              <button
                onClick={() => changeTab("quiz")}
                className={`tab-trigger ${activeTab === "quiz" ? "data-[state=active]" : ""}`}
                data-state={activeTab === "quiz" ? "active" : "inactive"}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Quiz</span>
              </button>
              <button
                onClick={() => changeTab("course")}
                className={`tab-trigger ${activeTab === "course" ? "data-[state=active]" : ""}`}
                data-state={activeTab === "course" ? "active" : "inactive"}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Courses</span>
              </button>
              <button
                onClick={() => changeTab("consultation")}
                className={`tab-trigger ${activeTab === "consultation" ? "data-[state=active]" : ""}`}
                data-state={
                  activeTab === "consultation" ? "active" : "inactive"
                }
              >
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Consult</span>
              </button>
            </div>

            <div className="px-2 sm:px-4 lg:px-6">
              {activeTab === "quiz" && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      Health Assessments
                    </h2>
                    <p className="text-gray-600">
                      Take our expert-designed quizzes to understand your health
                      better
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz, index) => {
                      const Icon = quiz.icon;
                      return (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          <div
                            className={`w-14 h-14 bg-gradient-to-r ${quiz.color} rounded-xl flex items-center justify-center mb-4`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {quiz.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {quiz.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {quiz.duration}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              requirePaywallOrAction("quiz", () => {
                                setOpen(true);
                                loadQuiz();
                              });
                            }}
                            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            Start Quiz
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "course" && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      Expert Courses
                    </h2>
                    <p className="text-gray-600">
                      Learn from certified health professionals and transform
                      your wellness
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => {
                      const buttonConfig = getButtonContent();
                      return (
                        <div
                          key={index}
                          className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                          onClick={() =>
                            requirePaywallOrAction(
                              "course",
                              buttonConfig.onClick
                            )
                          }
                        >
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 h-40 flex items-center justify-center text-8xl">
                            {course.image}
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                                <Star className="w-3 h-3 fill-current" />
                                {course.rating}
                              </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {course.title}
                            </h3>

                            {/* Progress Section */}
                            {courseProgress.isEnrolled && (
                              <div className="mb-4 p-3 bg-emerald-50 rounded-lg">
                                <div className="flex items-center justify-between text-xs text-emerald-700 mb-2">
                                  <span className="font-semibold">
                                    Your Progress
                                  </span>
                                  <span className="font-bold">
                                    {courseProgress.progressPercentage}%
                                  </span>
                                </div>
                                <Progress
                                  value={courseProgress.progressPercentage}
                                  className="h-2 bg-emerald-100"
                                />
                                <p className="text-xs text-emerald-600 mt-2">
                                  {courseProgress.completedModules} of{" "}
                                  {courseProgress.totalModules} modules
                                  completed
                                </p>
                              </div>
                            )}

                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100"></div>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-emerald-600">
                                {course.price}
                              </span>
                              {isLoadingProgress ? (
                                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg" />
                              ) : (
                                <button
                                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${buttonConfig.className}`}
                                  onClick={() =>
                                    requirePaywallOrAction(
                                      "course",
                                      buttonConfig.onClick
                                    )
                                  }
                                >
                                  {buttonConfig.icon}
                                  {buttonConfig.text}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "consultation" && (
                <div className="max-w-7xl mx-auto">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                          Consultation
                        </h2>
                        <p className="text-gray-600">
                          Consultation By Health Experts
                        </p>
                      </div>
                      <ShoppingBag className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <ProductCardSkeleton key={i} />
                        ))
                      : products
                          .filter(
                            (product) => product.name === "Expert Consultation"
                          )
                          .slice(0, 4)
                          .map((product) => (
                            <div
                              key={product.id}
                              className="bg-white rounded-2xl overflow-hidden border border-gray-200
                     hover:shadow-xl transition-all duration-300 hover:scale-105"
                              onClick={() =>
                                requirePaywallOrAction("consultation", () =>
                                  window.open(
                                    "https://app.cowlendar.com/cal/6997d577da5ca6374f480b5f/45751491854509",
                                    "_blank"
                                  )
                                )
                              }
                            >
                              {/* Image */}
                              <div className="relative h-auto bg-gradient-to-br from-emerald-100 to-teal-100">
                                <img
                                  src={
                                    product.images?.[0] || "/placeholder.png"
                                  }
                                  alt={product.name}
                                  className="w-full h-full aspect-square object-cover"
                                />
                              </div>

                              {/* Content */}
                              <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                  {product.name}
                                </h3>

                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                  {product.description}
                                </p>

                                {product.avgRating && (
                                  <div className="flex items-center gap-1 mb-4">
                                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                                    <span className="text-sm font-medium text-gray-700">
                                      {product.avgRating}
                                    </span>
                                    {product.noOfReviews && (
                                      <span className="text-xs text-gray-500">
                                        ({product.noOfReviews})
                                      </span>
                                    )}
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                  <button
                                    onClick={() =>
                                      requirePaywallOrAction(
                                        "consultation",
                                        () =>
                                          window.open(
                                            "https://app.cowlendar.com/cal/6997d577da5ca6374f480b5f/45751491854509",
                                            "_blank"
                                          )
                                      )
                                    }
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg
                           font-semibold hover:bg-emerald-700 transition-all
                           flex items-center gap-2"
                                  >
                                    Take Consultation
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Recommended Products
                </h2>
                <p className="text-gray-600">
                  Premium supplements curated by health experts
                </p>
              </div>
              <ShoppingBag className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : products
                  .filter((product) => product.name != "Expert Consultation")
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
          </div>
        </div>
      </div>
    </>
  );
}
