import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorLayout from "../../components/VendorLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import { useOrders } from "../../context/OrderContext";

export default function CreateOrder() {
  const navigate = useNavigate();
  const { createOrder } = useOrders();

  const [showSuccess, setShowSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0 },
  ]);

  const subtotal = items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const addItem = () =>
    setItems([...items, { name: "", quantity: 1, price: 0 }]);

  const updateItem = (i, field, value) => {
    const copy = [...items];
    copy[i][field] = value;
    setItems(copy);
  };

  const removeItem = (i) =>
    items.length > 1 &&
    setItems(items.filter((_, index) => index !== i));

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = `ORD-${Date.now()}`;

    createOrder({
      id,
      customer,
      items,
      subtotal,
      tax,
      total,
      status: "Pending",
      createdAt: new Date(),
    });

    setTrackingId(id);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <VendorLayout>
        <Card className="max-w-xl mx-auto">
          <CardContent className="py-12 text-center space-y-6">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600" />

            <h2 className="text-2xl font-semibold">
              Order Created Successfully
            </h2>

            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm">Tracking ID</p>
              <p className="font-mono text-lg">{trackingId}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() =>
                  navigate(`/vendor/orders/${trackingId}`)
                }
              >
                View Order Summary
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccess(false);
                  setCustomer({ name: "", phone: "", email: "" });
                  setItems([{ name: "", quantity: 1, price: 0 }]);
                }}
              >
                Create New Order
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/vendor/dashboard")}
              >
                Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-5xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {["name", "phone", "email"].map((field) => (
              <div key={field}>
                <Label>{field}</Label>
                <Input
                  value={customer[field]}
                  required={field !== "email"}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      [field]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row">
            <CardTitle>Order Items</CardTitle>
            <Button type="button" onClick={addItem}>
              <Plus className="mr-2 w-4 h-4" />
              Add Item
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="grid md:grid-cols-12 gap-3"
              >
                <Input
                  className="md:col-span-5"
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) =>
                    updateItem(i, "name", e.target.value)
                  }
                />
                <Input
                  type="number"
                  min="1"
                  className="md:col-span-3"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(i, "quantity", +e.target.value)
                  }
                />
                <Input
                  type="number"
                  min="0"
                  className="md:col-span-3"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(i, "price", +e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeItem(i)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>₦{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full">Create Order</Button>
      </form>
    </VendorLayout>
  );
}
