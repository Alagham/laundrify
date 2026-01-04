import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import {
  Package,
  ArrowLeft,
  Download,
  MapPin,
  Phone,
  Clock,
} from 'lucide-react';
import OrderTimeline from '../../components/OrderTimeline';
import DigitalReceipt from '../../components/DigitalReceipt';

export default function TrackingResult() {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const [showReceipt, setShowReceipt] = useState(false);

  if (!trackingId) {
    navigate('/track/invalid');
    return null;
  }

  const orderData = {
    trackingId,
    vendorName: 'Fresh Clean Laundry',
    customerPhone: '***-***-1234',
    status: 'Drying',
    items: [
      { name: 'Shirt', quantity: 3, price: 15 },
      { name: 'Pants', quantity: 2, price: 20 },
    ],
    total: 65,
    paymentStatus: 'Paid',
    lastUpdated: '2025-01-15 14:30',
    currentStage: 2,
    vendorAddress: '123 Main Street',
    vendorPhone: '(555) 123-4567',
    estimatedReady: 'Tomorrow 6:00 PM',
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between">
        <div className="flex items-center space-x-2">
          <Package className="text-[#0505F7]" />
          <span className="font-semibold">Laundrify</span>
        </div>
        <Button variant="ghost" onClick={() => navigate('/customer/home')}>
          <ArrowLeft className="mr-2" /> Home
        </Button>
      </header>

      <main className="container mx-auto px-6 py-10 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>ID: {orderData.trackingId}</p>
            <p>Total: ${orderData.total}</p>
            <Badge className="bg-green-600 text-white">
              {orderData.paymentStatus}
            </Badge>
            <Separator />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowReceipt(true)}
            >
              <Download className="mr-2" /> Receipt
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>
              Last updated: {orderData.lastUpdated}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrderTimeline currentStage={orderData.currentStage} />
          </CardContent>
        </Card>
      </main>

      {showReceipt && (
        <DigitalReceipt
          orderData={orderData}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
}
