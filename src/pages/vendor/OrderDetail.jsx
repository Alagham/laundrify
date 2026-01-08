import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VendorLayout from "../../components/VendorLayout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ArrowLeft, Phone, Mail, Clock } from "lucide-react";
import OrderTimeline from "../../components/OrderTimeline";

// Mock fetch function - replace with real API call or backend
async function fetchOrder(orderId) {
  // Example: fetch(`/api/orders/${orderId}`)
  // return await response.json();

  // Temporary fallback for demonstration (empty object if not found)
  if (orderId === "dummy") return null;
  return {
    trackingId: orderId,
    customer: { name: "John Doe", phone: "08012345678", email: "john@example.com" },
    subtotal: 60,
    tax: 6,
    total: 66,
    paymentStatus: "Paid",
    currentStage: 2,
    stages: ["Received", "Washing", "Drying", "Ironing", "Packaging", "Ready"],
    createdDate: "2025-01-15 10:30",
    lastUpdated: "2025-01-15 14:30",
    activities: [
      { timestamp: "2025-01-15 10:30", description: "Order created" },
      { timestamp: "2025-01-15 11:00", description: "Payment received" },
      { timestamp: "2025-01-15 12:00", description: "Washing started" },
    ],
  };
}

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    async function loadOrder() {
      const data = await fetchOrder(orderId);
      if (data) {
        setOrder(data);
        setCurrentStage(data.currentStage);
        setPaymentStatus(data.paymentStatus);
      }
      setLoading(false);
    }
    loadOrder();
  }, [orderId]);

  if (loading)
    return (
      <VendorLayout>
        <div className="py-20 text-center text-blue-700">Loading order...</div>
      </VendorLayout>
    );

  if (!order)
    return (
      <VendorLayout>
        <div className="py-20 text-center text-blue-700">
          Order not found
        </div>
      </VendorLayout>
    );

  return (
    <VendorLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/vendor/orders")}
            className="text-blue-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
          <div>
            <h1 className="text-3xl font-semibold text-blue-700">
              Order {order.trackingId}
            </h1>
            <p className="text-gray-500 text-sm">
              Created on {order.createdDate || "Not provided"}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-blue-700">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax ?? "—"}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-blue-700">
                  <span>Total</span>
                  <span>${order.total ?? "—"}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-blue-700">Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select
                  value={paymentStatus}
                  onValueChange={(v) => setPaymentStatus(v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-blue-100 shadow-lg shadow-blue-500/10 rounded-xl">
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Badge className="bg-blue-100 text-blue-700">
                  {paymentStatus || "Not provided"}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-blue-700">Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>{order.customer?.phone || "Not provided"}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>{order.customer?.email || "Not provided"}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white">
              <CardHeader className="flex flex-row justify-between">
                <div>
                  <CardTitle className="text-blue-700">Order Status</CardTitle>
                  <p className="text-sm text-gray-500">
                    Last updated {order.lastUpdated || "—"}
                  </p>
                </div>
                <Select
                  value={order.stages[currentStage]}
                  onValueChange={(v) =>
                    setCurrentStage(order.stages.indexOf(v))
                  }
                >
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-blue-100 shadow-lg shadow-blue-500/10 rounded-xl">
                    {order.stages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <OrderTimeline
                  currentStage={currentStage}
                  stages={order.stages}
                />
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-blue-700">Activity</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm">
                {order.activities?.length > 0 ? (
                  order.activities.map((act, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-blue-700"
                    >
                      <Clock className="w-4 h-4" />
                      <span>
                        {act.timestamp}: {act.description}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-blue-600">No activities yet</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}

