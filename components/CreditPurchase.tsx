
// "use client";

// import React, { useState ,useEffect} from "react";
// import { Plus, Minus, Wallet } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface CreditPurchaseProps {
//   currentCredits: number;
//   requiredCredits: number;
//   onPurchaseComplete: (newCredits: number) => void;
//   onClose?: () => void;
 
// }

// export function CreditPurchase({
//   currentCredits,
//   requiredCredits,
//     onClose, 
   
// }: CreditPurchaseProps) {
//   const [creditsToPurchase, setCreditsToPurchase] = useState(
//     Math.max(0, requiredCredits - currentCredits)
//   );
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [profile, setProfile] = useState<any>(null);


//   const creditsNeeded = Math.max(0, requiredCredits - currentCredits);
//   const costInINR = creditsToPurchase * 0.5;

//   useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const res = await fetch("/api/profile");
//       const data = await res.json();
//       console.log("PROFILE LOADED →", data);

//       setProfile(data);
//     } catch (err) {
//       console.error("Failed to load profile:", err);
//     }
//   };

//   fetchProfile();
// }, []);


  
//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

 
//   const handlePurchase = async () => {
//     setIsProcessing(true);

//     const loaded: any = await loadRazorpay();
//     if (!loaded) {
//       console.log("not loaded");
//       alert("Failed to load Razorpay.");
//       setIsProcessing(false);
//       return;
//     }

//     const createOrderRes = await fetch("/api/payments/create-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
        
//         amount: costInINR, 
//       }),
//     });

//     const order = await createOrderRes.json();
//      console.log("Order created:", order);

//     if (!order?.key) {
//       alert("Failed to create order.");
//       setIsProcessing(false);
//       return;
//     }
//     onClose?.();

//     const options = {
//     key: order.key,
//     amount: order.amount,
//     currency: order.currency,
//     name: "FitPlay Life",
//     description: "Credit Purchase",
//     order_id: order.razorpayOrderId,
//     handler: async function (response: any) {
//       // Call verify API
//       const verifyRes = await fetch("/api/payments/verify", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           razorpay_payment_id: response.razorpay_payment_id,
//   razorpay_order_id: response.razorpay_order_id,
//   razorpay_signature: response.razorpay_signature,
//         }),
//       });

//       const verifyData = await verifyRes.json();
//       if (verifyData.success) {
//         alert("Payment Verified Successfully!");
//       } else {
//         alert("Payment verification failed.");
//       }
//     },
//     prefill: {
//       name: profile?.data?.name || "Customer",
//   email: profile?.data?.email || "no-email@example.com",
//   contact: profile?.data?.phone || "0000000000",
//     },
//     theme: { color: "#10B981" },
//   };

  

//   const razorpay = new (window as any).Razorpay(options);
//   razorpay.open();
//   setIsProcessing(false);
// };

//   // Change quantity buttons
//   const handleQuantityChange = (increment: boolean) => {
//     const minCredits = creditsNeeded;
//     if (increment) {
//       setCreditsToPurchase(creditsToPurchase + 50);
//     } else {
//       setCreditsToPurchase(Math.max(minCredits, creditsToPurchase - 50));
//     }
//   };

//   return (
//     <Card className="border-orange-200 bg-orange-50">
//       <CardHeader>
//         <CardTitle className="flex items-center space-x-2 text-orange-700">
//           <Wallet className="w-5 h-5" />
//           <span>Insufficient Credits</span>
//         </CardTitle>
//         <p className="text-sm text-orange-600 mt-2">
//           Top-up your credits to continue.
//         </p>
//       </CardHeader>

//       <CardContent className="space-y-4">

//         {/* Balance */}
//         <div className="flex items-center justify-between text-sm">
//           <span>Current Balance:</span>
//           <Badge className="bg-emerald-100 text-emerald-700">
//             {currentCredits} credits
//           </Badge>
//         </div>

//         {/* Required */}
//         {/* <div className="flex items-center justify-between text-sm">
//           <span>Required Credits:</span>
//           <Badge variant="destructive">{requiredCredits} credits</Badge>
//         </div> */}

//         {/* Needed */}
//         {/* <div className="flex items-center justify-between text-sm font-medium">
//           <span>Credits Needed:</span>
//           <Badge className="bg-orange-500 text-white">
//             {creditsNeeded} credits
//           </Badge>
//         </div> */}

//         {/* Select Credits */}
//         <div className="border-t pt-4 space-y-4">
//           <div>
//             <label className="text-sm font-medium text-gray-700 mb-2 block">
//               Credits to Purchase 
//             </label>

//             <div className="flex items-center space-x-3">
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => handleQuantityChange(false)}
//                 disabled={creditsToPurchase <= creditsNeeded}
//                 className="h-8 w-8 p-0"
//               >
//                 <Minus className="w-4 h-4" />
//               </Button>

//               <div className="flex-1 text-center">
//                 <span className="text-lg font-bold text-emerald-600">
//                   {creditsToPurchase}
//                 </span>
//                 <span className="text-sm text-gray-500 ml-1">credits</span>
//               </div>

//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => handleQuantityChange(true)}
//                 className="h-8 w-8 p-0"
//               >
//                 <Plus className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>

//           {/* Total Price */}
//           <div className="bg-white p-3 rounded-lg border">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Total Cost:</span>
//               <span className="text-lg font-bold text-primary">
//                 ₹{costInINR.toFixed(2)}
//               </span>
//             </div>
//             <div className="text-xs text-gray-500 mt-1">
//               1 credit = ₹0.50
//             </div>
//           </div>

//           {/* Payment Button */}
//           <Button
//             onClick={handlePurchase}
//             disabled={isProcessing}
//             className="w-full bg-emerald-500 hover:bg-emerald-600"
//           >
//             {isProcessing ? "Processing..." : "Proceed to Payment (Test)"}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import { Wallet, CheckCircle, XCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";

// interface CreditPurchaseProps {
//   currentCredits: number;
//   requiredCredits: number;
//   onClose?: () => void;
// }

// const PACKS = [500, 1000, 2000];
// const CREDIT_RATE = 2; // ₹1 = 2 credits
// const MIN_AMOUNT = 100;

// export function CreditPurchase({
//   currentCredits,
//   requiredCredits,
//   onClose,
// }: CreditPurchaseProps) {
//   const [amount, setAmount] = useState<number>(500);
//   const [selectedPack, setSelectedPack] = useState<number>(500);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [status, setStatus] = useState<"idle" | "success" | "failure">("idle");
//   const [profile, setProfile] = useState<any>(null);

//   const credits = amount * CREDIT_RATE;

//   useEffect(() => {
//     fetch("/api/profile")
//       .then((res) => res.json())
//       .then(setProfile)
//       .catch(console.error);
//   }, []);

//   const loadRazorpay = () =>
//     new Promise<boolean>((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   const handlePay = async () => {
//     if (amount < MIN_AMOUNT) return;

//     setIsProcessing(true);
//     setStatus("idle");

//     const loaded = await loadRazorpay();
//     if (!loaded) {
//       setIsProcessing(false);
//       return alert("Razorpay failed to load");
//     }

//     const res = await fetch("/api/payments/create-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount }),
//     });

//     const order = await res.json();
//     if (!order?.key) {
//       setIsProcessing(false);
//       return alert("Order creation failed");
//     }

//     onClose?.();

//     const razorpay = new (window as any).Razorpay({
//       key: order.key,
//       amount: order.amount,
//       currency: order.currency,
//       name: "FitPlay Life",
//       description: "Credit Top-up",
//       order_id: order.razorpayOrderId,
//       handler: async (response: any) => {
//         const verify = await fetch("/api/payments/verify", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(response),
//         });

//         const result = await verify.json();
//         setStatus(result.success ? "success" : "failure");
//       },
//       modal: {
//         ondismiss: () => setStatus("failure"),
//       },
//       prefill: {
//         name: profile?.data?.name || "User",
//         email: profile?.data?.email || "user@email.com",
//         contact: profile?.data?.phone || "9999999999",
//       },
//       theme: { color: "#10B981" },
//     });

//     razorpay.open();
//     setIsProcessing(false);
//   };

//   return (
//    <div className="space-y-5">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-emerald-700">
//           <Wallet className="w-5 h-5" />
//           Buy Credits
//         </CardTitle>

//         <p className="text-sm text-gray-600">
//           Balance:{" "}
//           <Badge className="bg-emerald-100 text-emerald-700">
//             {currentCredits} credits
//           </Badge>
//         </p>
//       </CardHeader>

//       <CardContent className="space-y-5">
//         {/* Conversion Info */}
//         <div className="rounded-lg bg-emerald-100 text-emerald-800 text-sm px-3 py-2">
//           💡 Conversion: <strong>₹1 = 2 credits</strong>
//         </div>

//         {/* Preset Packs */}
//         <div>
//           <p className="text-sm font-medium mb-2">Popular Packs</p>
//           <div className="grid grid-cols-3 gap-3">
//             {PACKS.map((pack) => (
//               <Button
//                 key={pack}
//                 variant={selectedPack === pack ? "default" : "outline"}
//                 className="rounded-xl"
//                 onClick={() => {
//                   setSelectedPack(pack);
//                   setAmount(pack);
//                 }}
//               >
//                 ₹{pack}
//               </Button>
//             ))}
//           </div>
//         </div>

//         {/* Custom Amount */}
//         <div>
//           <p className="text-sm font-medium mb-1">Custom Amount (₹)</p>
//           <Input
//             type="number"
//             min={MIN_AMOUNT}
//             value={amount}
//             onChange={(e) => {
//               const val = Number(e.target.value);
//               setAmount(val);
//               setSelectedPack(null);
//             }}
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Minimum ₹{MIN_AMOUNT}
//           </p>
//         </div>

//         {/* Calculation */}
//         <div className="border rounded-xl p-4 bg-white space-y-2 text-sm">
//           <div className="flex justify-between">
//             <span>Amount</span>
//             <span className="font-semibold">₹{amount}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Rate</span>
//             <span>₹1 = 2 credits</span>
//           </div>
//           <div className="flex justify-between font-semibold text-emerald-700">
//             <span>You get</span>
//             <span>{credits} credits</span>
//           </div>
//         </div>

//         {/* Status */}
//         {status === "success" && (
//           <div className="flex items-center gap-2 text-green-600 text-sm">
//             <CheckCircle className="w-4 h-4" /> Payment successful
//           </div>
//         )}

//         {status === "failure" && (
//           <div className="flex items-center gap-2 text-red-600 text-sm">
//             <XCircle className="w-4 h-4" /> Payment failed / cancelled
//           </div>
//         )}

//         {/* Pay Button */}
//         <Button
//           className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600"
//           disabled={isProcessing || amount < MIN_AMOUNT}
//           onClick={handlePay}
//         >
//           {isProcessing ? "Processing..." : `Pay ₹${amount}`}
//         </Button>
//       </CardContent>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { Wallet, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";


interface CreditPurchaseProps {
  currentCredits: number;
  requiredCredits: number;
  onClose?: () => void;
}

const PACKS = [500, 1000, 2000];
const CREDIT_RATE = 1; // ₹1 = 2 credits

export function CreditPurchase({
  currentCredits,
  requiredCredits,
  onClose,
}: CreditPurchaseProps) {
  // 🔑 Keep input as string (important)
  const [amountInput, setAmountInput] = useState<string>("500");
  const [selectedPack, setSelectedPack] = useState<number | null>(500);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "failure">("idle");
  const [profile, setProfile] = useState<any>(null);

  const amount = Number(amountInput) || 0;
  const credits = amount * CREDIT_RATE;

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then(setProfile)
      .catch(console.error);
  }, []);

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePay = async () => {
    if (amount <= 0) return;

    // Check if user is demo user
    const session = await fetch("/api/auth/session").then(r => r.json());
    if ((session?.user as any)?.isDemo) {
      toast.error("Demo users cannot top-up wallet", {
        description: "Demo accounts come with 10,000 free credits for testing. Top-ups are not available.",
        duration: 5000,
      });
      return;
    }

    setIsProcessing(true);
    setStatus("idle");

    const loaded = await loadRazorpay();
    if (!loaded) {
      setIsProcessing(false);
      alert("Razorpay failed to load");
      return;
    }

    const res = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();
    if (!order?.key) {
      setIsProcessing(false);
      alert("Order creation failed");
      return;
    }

    onClose?.();

    const razorpay = new (window as any).Razorpay({
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: "FitPlay Life",
      description: "Credit Top-up",
      order_id: order.razorpayOrderId,
      handler: async (response: any) => {
        const verify = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const result = await verify.json();
        setStatus(result.success ? "success" : "failure");
      },
      modal: {
        ondismiss: () => setStatus("failure"),
      },
      prefill: {
        name: profile?.data?.name || "User",
        email: profile?.data?.email || "user@email.com",
        contact: profile?.data?.phone || "9999999999",
      },
      theme: { color: "#10B981" },
    });

    razorpay.open();
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-700">
            <Wallet className="w-5 h-5" />
            Buy Credits
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Balance:{" "}
            <Badge className="bg-emerald-100 text-emerald-700">
              {currentCredits} credits
            </Badge>
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ×
        </button>
      </div>

      {/* Conversion */}
      <div className="rounded-lg bg-emerald-100 text-emerald-800 text-sm px-3 py-2">
        💡 Conversion Rate: <strong>₹1 = 1 credits</strong>
      </div>

      {/* Preset Packs */}
      <div>
        <p className="text-sm font-medium mb-2">Quick Packs</p>
        <div className="grid grid-cols-3 gap-3">
          {PACKS.map((pack) => (
            <Button
              key={pack}
              variant={selectedPack === pack ? "default" : "outline"}
              className="rounded-xl"
              onClick={() => {
                setSelectedPack(pack);
                setAmountInput(String(pack));
              }}
            >
              ₹{pack}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div>
        <p className="text-sm font-medium mb-1">Custom Amount (₹)</p>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="Enter any amount"
          value={amountInput}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "") {
              setAmountInput("");
              setSelectedPack(null);
              return;
            }

            if (!/^\d+$/.test(value)) return;

            setAmountInput(value);
            setSelectedPack(null);
          }}
        />
      </div>

      {/* Calculation */}
      <div className="border rounded-xl p-4 bg-white space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Amount</span>
          <span className="font-semibold">₹{amount}</span>
        </div>
        <div className="flex justify-between">
          <span>Credits</span>
          <span className="font-semibold text-emerald-700">
            {credits} credits
          </span>
        </div>
      </div>

      {/* Status */}
      {status === "success" && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" /> Payment successful
        </div>
      )}

      {status === "failure" && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <XCircle className="w-4 h-4" /> Payment failed or cancelled
        </div>
      )}

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button
          className="bg-emerald-500 hover:bg-emerald-600"
          disabled={isProcessing || amount <= 0}
          onClick={handlePay}
        >
          {isProcessing ? "Processing..." : `Pay ₹${amount}`}
        </Button>
      </div>
    </div>
  );
}
