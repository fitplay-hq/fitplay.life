import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Wallet, History, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import VoucherRedemptionCard from "@/app/components/profile/VoucherRedemptionCard";

interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  creditsUsed: number;
  creditsRemaining: number;
}

interface Order {
  id: string;
  date: string;
  item: string;
  amount: number;
  credits: number;
  status: string;
  phNumber?: string | null;
  address?: string | null;
  deliveryInstructions?: string | null;
  transactionId?: string | null;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      images: string[];
    };
    variant: {
      id: string;
      variantValue: string;
    } | null;
  }>;
}



interface DashboardProps {
  dashboardStats: DashboardStats;
  orderHistory: Order[];
  user: any;
}
interface ProfileData {
  id: string;
  address: string | null;
  company: any;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  wallet?: any;
  orders?: any[];
  password:string | null;
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function Dashboard({
  dashboardStats,
  orderHistory,
  user,
}: DashboardProps) {
  const router = useRouter();

  const {
    data: profileData,
    error: profileError,
    isLoading: profileLoading,
    mutate,
  } = useSWR("/api/profile", fetcher);
  const profile = profileData?.data;

  return (
    <div className="space-y-6">



{/* PROFILE CARD */}
<Card className="overflow-hidden border border-emerald-200/60 shadow-[0_20px_50px_rgba(16,185,129,0.18)]">
  <CardContent className="p-6 sm:p-8">

    <div className="flex flex-col sm:flex-row items-center gap-6">

      {/* Avatar */}
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : user?.email?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* User Info */}
      <div className="flex-1 text-center sm:text-left space-y-1">

        <h2 className="text-xl font-bold text-gray-900">
          {user?.name || "Unnamed User"}
        </h2>

        <p className="text-sm font-bold text-gray-800">
          {user?.email}
        </p>

        <p className="text-sm font-bold text-gray-800">
          <span className="font-bold text-gray-900">{profile?.company?.name}</span>
        </p>

      </div>

      {/* Role Badge */}
      <div className="flex-shrink-0">
        <span
          className={`
            px-4 py-1.5 rounded-full text-sm font-semibold
            ${
              user?.role === "ADMIN"
                ? "bg-purple-100 text-purple-700"
                : user?.role === "HR"
                ? "bg-blue-100 text-blue-700"
                : "bg-emerald-100 text-emerald-700"
            }
          `}
        >
          {user?.role}
        </span>
      </div>

    </div>

  </CardContent>
</Card>

    
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="flex-1">
                  <p className="font-medium text-sm">{order.item}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/orders/${order.id}`)}
                    className="h-6 w-6 p-0"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Badge
                    variant={
                      order.status === "Delivered" ? "default" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
