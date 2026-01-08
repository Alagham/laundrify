import VendorLayout from "../../components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useOrders } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const revenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <VendorLayout>
      <div className="space-y-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <Button onClick={() => navigate("/vendor/create-order")}>
            Create Order
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["Orders", orders.length],
            ["Revenue", `₦${revenue.toLocaleString()}`],
          ].map(([label, value]) => (
            <Card key={label}>
              <CardContent className="pt-6">
                <p className="text-sm">{label}</p>
                <p className="text-2xl font-semibold">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((o) => (
                <div
                  key={o.id}
                  className="flex justify-between py-3 border-b cursor-pointer"
                  onClick={() =>
                    navigate(`/vendor/orders/${o.id}`)
                  }
                >
                  <span>{o.id}</span>
                  <span>₦{o.total.toLocaleString()}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
