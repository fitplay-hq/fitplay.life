import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { MapPin, Phone, Package, Calendar, Hash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { is } from "date-fns/locale";

interface Order {
  id: string;
  date: string;
  item: string;
  amount: number;
  isCashPayment?: boolean | null;
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

interface HistoryProps {
  orderHistory: Order[];
}

export default function History({ orderHistory }: HistoryProps) {
  const router = useRouter();

  console.log("Order History:", orderHistory);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "dispatched":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-emerald-100 text-emerald-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Order #{order.id}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <Badge className="bg-blue-100 text-gray-800 border-0 font-bold text-sm">
                        {order.isCashPayment ? 'Cash' : 'Credits'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-600">
                        {order.credits } {order.isCashPayment ? 'INR' : 'Credits'} 
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.items?.length || 1} items
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/orders/${order.id}`)}
                        className="text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Badge
                        className={`${getStatusColor(order.status)} border-0`}
                      >
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Product Images and Items */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Order Items
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {order.items?.map((item, index) => (
                      <div
                        key={item.id || index}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={
                              item.product.images &&
                              item.product.images.length > 0
                                ? item.product.images[0]
                                : "/placeholder.png"
                            }
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-900 line-clamp-2">
                            {item.product.name}
                          </p>
                          {item.variant && (
                            <p className="text-xs text-gray-500">
                              {item.variant.variantValue}
                            </p>
                          )}
                          <p className="text-xs text-gray-600">
                            Qty: {item.quantity} × {item.price}cr
                          </p>
                        </div>
                      </div>
                    )) || (
                      <div className="col-span-full text-center text-gray-500">
                        No items available
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Information */}
                {(order.address ||
                  order.phNumber ||
                  order.deliveryInstructions) && (
                  <div className="border-t pt-4">
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Delivery Information
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      {order.address && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-600">Address:</p>
                            <p className="text-gray-900">{order.address}</p>
                          </div>
                        </div>
                      )}
                      {order.phNumber && (
                        <div className="flex items-start space-x-2">
                          <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-600">Phone:</p>
                            <p className="text-gray-900">{order.phNumber}</p>
                          </div>
                        </div>
                      )}
                      {order.deliveryInstructions && (
                        <div className="md:col-span-2 flex items-start space-x-2">
                          <Package className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-600">Instructions:</p>
                            <p className="text-gray-900">
                              {order.deliveryInstructions}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Transaction Information */}
                {order.transactionId && (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Hash className="w-4 h-4" />
                      <span>Transaction ID: {order.transactionId}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
