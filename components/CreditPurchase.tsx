
"use client";

import React, { useState ,useEffect} from "react";
import { Plus, Minus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreditPurchaseProps {
  currentCredits: number;
  requiredCredits: number;
  onPurchaseComplete: (newCredits: number) => void;
  onClose?: () => void;
 
}

export function CreditPurchase({
  currentCredits,
  requiredCredits,
    onClose, 
   
}: CreditPurchaseProps) {
  const [creditsToPurchase, setCreditsToPurchase] = useState(
    Math.max(0, requiredCredits - currentCredits)
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [profile, setProfile] = useState<any>(null);


  const creditsNeeded = Math.max(0, requiredCredits - currentCredits);
  const costInINR = creditsToPurchase * 0.5;

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      console.log("PROFILE LOADED →", data);

      setProfile(data);
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  };

  fetchProfile();
}, []);


  
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

 
  const handlePurchase = async () => {
    setIsProcessing(true);

    const loaded: any = await loadRazorpay();
    if (!loaded) {
      console.log("not loaded");
      alert("Failed to load Razorpay.");
      setIsProcessing(false);
      return;
    }

    const createOrderRes = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        amount: costInINR, 
      }),
    });

    const order = await createOrderRes.json();
     console.log("Order created:", order);

    if (!order?.key) {
      alert("Failed to create order.");
      setIsProcessing(false);
      return;
    }
    onClose?.();

    const options = {
    key: order.key,
    amount: order.amount,
    currency: order.currency,
    name: "FitPlay Life",
    description: "Credit Purchase",
    order_id: order.razorpayOrderId,
    handler: async function (response: any) {
      // Call verify API
      const verifyRes = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
  razorpay_order_id: response.razorpay_order_id,
  razorpay_signature: response.razorpay_signature,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        alert("Payment Verified Successfully!");
      } else {
        alert("Payment verification failed.");
      }
    },
    prefill: {
      name: profile?.data?.name || "Customer",
  email: profile?.data?.email || "no-email@example.com",
  contact: profile?.data?.phone || "0000000000",
    },
    theme: { color: "#10B981" },
  };

  

  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
  setIsProcessing(false);
};

  // Change quantity buttons
  const handleQuantityChange = (increment: boolean) => {
    const minCredits = creditsNeeded;
    if (increment) {
      setCreditsToPurchase(creditsToPurchase + 50);
    } else {
      setCreditsToPurchase(Math.max(minCredits, creditsToPurchase - 50));
    }
  };

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-orange-700">
          <Wallet className="w-5 h-5" />
          <span>Insufficient Credits</span>
        </CardTitle>
        <p className="text-sm text-orange-600 mt-2">
          Top-up your credits to continue.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Balance */}
        <div className="flex items-center justify-between text-sm">
          <span>Current Balance:</span>
          <Badge className="bg-emerald-100 text-emerald-700">
            {currentCredits} credits
          </Badge>
        </div>

        {/* Required */}
        <div className="flex items-center justify-between text-sm">
          <span>Required Credits:</span>
          <Badge variant="destructive">{requiredCredits} credits</Badge>
        </div>

        {/* Needed */}
        <div className="flex items-center justify-between text-sm font-medium">
          <span>Credits Needed:</span>
          <Badge className="bg-orange-500 text-white">
            {creditsNeeded} credits
          </Badge>
        </div>

        {/* Select Credits */}
        <div className="border-t pt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Credits to Purchase (minimum {creditsNeeded})
            </label>

            <div className="flex items-center space-x-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuantityChange(false)}
                disabled={creditsToPurchase <= creditsNeeded}
                className="h-8 w-8 p-0"
              >
                <Minus className="w-4 h-4" />
              </Button>

              <div className="flex-1 text-center">
                <span className="text-lg font-bold text-emerald-600">
                  {creditsToPurchase}
                </span>
                <span className="text-sm text-gray-500 ml-1">credits</span>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuantityChange(true)}
                className="h-8 w-8 p-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Cost:</span>
              <span className="text-lg font-bold text-primary">
                ₹{costInINR.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              1 credit = ₹0.50
            </div>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full bg-emerald-500 hover:bg-emerald-600"
          >
            {isProcessing ? "Processing..." : "Proceed to Payment (Test)"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
