
'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, History, Settings, Plus } from "lucide-react";
import { CreditPurchase } from "@/components/CreditPurchase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Script from "next/script";


interface DashboardStats {
  creditsRemaining: number;
  creditsUsed: number;
}

export interface WalletTransaction {
  date: string;
  type: string;
  amount: number;
  balance: number;
  description: string;
}

interface WalletProps {
  dashboardStats: DashboardStats;
  walletHistory: WalletTransaction[];
  
}

export default function WalletComponent({
  dashboardStats,
  walletHistory,
}: WalletProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-6">
      <Script  src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="flex justify-end">
       {/* <Dialog>
    <DialogTrigger asChild>
      <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        Add Credits
      </button>
    </DialogTrigger>

    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Top Up Wallet</span>
        </DialogTitle>
      </DialogHeader>

      <CreditPurchase
        currentCredits={dashboardStats.creditsRemaining}
        requiredCredits={0}
        onPurchaseComplete={() => window.location.reload()}
     

        
      />
    </DialogContent>
  </Dialog> */}
  

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <button
      onClick={() => setOpen(true)}
      className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 mt-4"
    >
      <Plus className="w-4 h-4 mr-2" />
      Add Credits
    </button>
  </DialogTrigger>

  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle className="flex items-center space-x-2">
        <Plus className="w-5 h-5" />
        <span>Top Up Wallet</span>
      </DialogTitle>
    </DialogHeader>

    <CreditPurchase
      currentCredits={dashboardStats.creditsRemaining}
      requiredCredits={0}
      onPurchaseComplete={() => window.location.reload()}
      onClose={() => setOpen(false)}       // ✅ CLOSE DIALOG
    />
  </DialogContent>
</Dialog>

  </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
      
 

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <Wallet className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <div className="text-2xl font-bold text-blue-800">
              {dashboardStats.creditsRemaining}
            </div>
            <div className="text-sm text-blue-600">Available Credits</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <History className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <div className="text-2xl font-bold text-green-800">
              {dashboardStats.creditsUsed}
            </div>
            <div className="text-sm text-green-600">Credits Used</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <Settings className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <div className="text-2xl font-bold text-purple-800">
              {dashboardStats.creditsRemaining + dashboardStats.creditsUsed}
            </div>
            <div className="text-sm text-purple-600">Total Allocated</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wallet History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {walletHistory.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "Purchase"
                        ? "bg-red-100 text-red-600"
                        : transaction.type === "Bonus"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {transaction.type === "Purchase" ? "-" : "+"}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-gray-600">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.amount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {Math.abs(transaction.amount)} credits
                  </p>
                  <p className="text-sm text-gray-500">
                    Balance: {transaction.balance} credits
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

     
    </div>
  );
}
