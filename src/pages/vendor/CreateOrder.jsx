import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorLayout from "../../components/VendorLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Plus, Trash2, CheckCircle } from "lucide-react";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedTrackingId, setGeneratedTrackingId] = useState("");
  const [sendSMS, setSendSMS] = useState(true);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);

  const addItem = () =>
    setItems([...items, { name: "", quantity: 1, price: 0 }]);

  const removeItem = (index) =>
    items.length > 1 && setItems(items.filter((_, i) => i !== index));

  const updateItem = (index, field, value) => {
    const copy = [...items];
    copy[index][field] = value;
    setItems(copy);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trackingId = `CLP-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 10000)
    ).padStart(4, "0")}`;
    setGeneratedTrackingId(trackingId);
    setShowSuccess(true);
  };

  /* ================= SUCCESS ================= */
  if (showSuccess) {
    return (
      <VendorLayout>
        <div className="max-w-xl mx-auto">
          <Card className="bg-white border shadow-sm">
            <CardContent className="py-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-blue-600" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-blue-700">
                  Order Created Successfully
                </h2>
                <p className="text-gray-500 mt-1">
                  Customer notification has been prepared.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600">Tracking ID</p>
                <p className="text-xl font-mono text-blue-700">
                  {generatedTrackingId}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() =>
                    navigate(`/vendor/orders/${generatedTrackingId}`)
                  }
                >
                  View Order
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600"
                  onClick={() => {
                    setShowSuccess(false);
                    setCustomerInfo({ name: "", phone: "", email: "" });
                    setItems([{ name: "", quantity: 1, price: 0 }]);
                  }}
                >
                  New Order
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
        </div>
      </VendorLayout>
    );
  }

  /* ================= FORM ================= */
  return (
    <VendorLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-semibold text-blue-700">
            Create New Order
          </h1>
          <p className="text-gray-500 mt-1">
            Fill in the details to create a laundry order
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-blue-700">
                Customer Information
              </CardTitle>
              <CardDescription>
                Customer contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              {["name", "phone", "email"].map((field, i) => (
                <div key={i} className="space-y-1">
                  <Label className="text-blue-700 capitalize">
                    {field === "email" ? "Email (optional)" : field}
                  </Label>
                  <Input
                    value={customerInfo[field]}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        [field]: e.target.value,
                      })
                    }
                    required={field !== "email"}
                    className="bg-white focus:border-blue-600"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Items */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-blue-700">Order Items</CardTitle>
                <CardDescription>Add laundry items</CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                className="border-blue-600 text-blue-600"
                onClick={addItem}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-12 gap-4 items-center"
                >
                  <Input
                    className="md:col-span-5"
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(index, "name", e.target.value)
                    }
                    required
                  />
                  <Input
                    className="md:col-span-3"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", Number(e.target.value))
                    }
                  />
                  <Input
                    className="md:col-span-3"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(index, "price", Number(e.target.value))
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="md:col-span-1 text-red-500"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="bg-white">
            <CardContent className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-700 border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* SMS */}
          <Card className="bg-white">
            <CardContent className="flex items-center gap-2">
              <Checkbox checked={sendSMS} onCheckedChange={setSendSMS} />
              <Label className="text-blue-700">
                Send SMS confirmation
              </Label>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Order
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/vendor/dashboard")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </VendorLayout>
  );
}
