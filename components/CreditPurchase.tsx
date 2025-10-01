"use client";

import React, { useState } from "react";
import { CreditCard, Plus, Minus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreditPurchaseProps {
  currentCredits: number;
  requiredCredits: number;
  onPurchaseComplete: (newCredits: number) => void;
}

export function CreditPurchase({
  currentCredits,
  requiredCredits,
  onPurchaseComplete,
}: CreditPurchaseProps) {
  const [creditsToPurchase, setCreditsToPurchase] = useState(
    Math.max(0, requiredCredits - currentCredits)
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const creditsNeeded = Math.max(0, requiredCredits - currentCredits);
  const costInINR = creditsToPurchase * 0.5;

  const handleQuantityChange = (increment: boolean) => {
    const minCredits = creditsNeeded;
    if (increment) {
      setCreditsToPurchase(creditsToPurchase + 50);
    } else {
      setCreditsToPurchase(Math.max(minCredits, creditsToPurchase - 50));
    }
  };

  const handlePurchase = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add purchased credits to current balance
    const newCredits = currentCredits + creditsToPurchase;
    onPurchaseComplete(newCredits);

    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-orange-700">
          <Wallet className="w-5 h-5" />
          <span>Insufficient Credits</span>
        </CardTitle>
        <p className="text-sm text-orange-600 mt-2">
          Demo Mode: Credit purchases are simulated. Contact your HR admin for
          actual credit allocation.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span>Current Balance:</span>
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-700"
          >
            {currentCredits} credits
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Required Credits:</span>
          <Badge variant="destructive">{requiredCredits} credits</Badge>
        </div>
        <div className="flex items-center justify-between text-sm font-medium">
          <span>Credits Needed:</span>
          <Badge className="bg-orange-500 text-white">
            {creditsNeeded} credits
          </Badge>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-4">
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

            <div className="bg-white p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Cost:</span>
                <span className="text-lg font-bold text-primary">
                  ₹{costInINR.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">1 credit = ₹0.50</div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Purchase Credits
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Purchase Credits</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span>Credits to Purchase:</span>
                      <span className="font-bold">{creditsToPurchase}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Amount:</span>
                      <span className="text-lg font-bold text-emerald-600">
                        ₹{costInINR.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Payment Method
                    </label>
                    <Select
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Card Number
                        </label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              number: formatCardNumber(e.target.value),
                            })
                          }
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium mb-1 block">
                            Expiry Date
                          </label>
                          <Input
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({
                                ...cardDetails,
                                expiry: formatExpiry(e.target.value),
                              })
                            }
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">
                            CVV
                          </label>
                          <Input
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({
                                ...cardDetails,
                                cvv: e.target.value
                                  .replace(/[^0-9]/g, "")
                                  .slice(0, 3),
                              })
                            }
                            maxLength={3}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Cardholder Name
                        </label>
                        <Input
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        UPI ID
                      </label>
                      <Input placeholder="yourname@upi" />
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Select Bank
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sbi">
                            State Bank of India
                          </SelectItem>
                          <SelectItem value="hdfc">HDFC Bank</SelectItem>
                          <SelectItem value="icici">ICICI Bank</SelectItem>
                          <SelectItem value="axis">Axis Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="w-full bg-emerald-500 hover:bg-emerald-600"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Demo Payment...
                      </div>
                    ) : (
                      `Demo Purchase - ₹${costInINR.toFixed(2)}`
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
