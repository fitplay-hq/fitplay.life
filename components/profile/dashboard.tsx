import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Wallet, History } from "lucide-react";

interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  creditsUsed: number;
  creditsRemaining: number;
  wellnessScore: number;
}

interface Order {
  id: string;
  date: string;
  item: string;
  amount: number;
  credits: number;
  status: string;
  vendor: string;
}

interface DashboardProps {
  dashboardStats: DashboardStats;
  orderHistory: Order[];
}

export default function Dashboard({
  dashboardStats,
  orderHistory,
}: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <History className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {dashboardStats.totalOrders}
            </div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {dashboardStats.creditsRemaining}
            </div>
            <div className="text-sm text-gray-600">Credits Remaining</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {dashboardStats.wellnessScore}%
            </div>
            <div className="text-sm text-gray-600">Wellness Score</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Settings className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {dashboardStats.creditsUsed}
            </div>
            <div className="text-sm text-gray-600">Credits Used</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderHistory.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{order.item}</p>
                    <p className="text-xs text-gray-500">
                      {order.date} • {order.vendor}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "Delivered" ? "default" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellness Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Fitness Activities
                </span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Nutrition Planning
                </span>
                <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Health Screenings</span>
                <Badge className="bg-purple-100 text-purple-800">
                  Completed
                </Badge>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-sm text-blue-800 font-medium">
                  Next Recommendation
                </p>
                <p className="text-sm text-blue-600">
                  Consider booking a stress management consultation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
