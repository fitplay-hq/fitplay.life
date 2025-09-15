import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, History, Settings } from "lucide-react";

interface DashboardStats {
  creditsRemaining: number;
  creditsUsed: number;
}

interface WalletTransaction {
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
  return (
    <div className="space-y-6">
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
            <div className="text-2xl font-bold text-purple-800">500</div>
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
