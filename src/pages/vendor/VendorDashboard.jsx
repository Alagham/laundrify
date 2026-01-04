import VendorLayout from '../../components/VendorLayout'; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Package, Plus, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VendorDashboard() {
  const navigate = useNavigate();

  return (
    <VendorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-blue-600">
              Dashboard
            </h1>
            <p className="text-blue-600/70 mt-1">
              Welcome back! Your analytics will appear here once you start receiving orders.
            </p>
          </div>

          <Button
            className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={() => navigate('/vendor/create-order')}
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Order
          </Button>
        </div>

        {/* Empty KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Orders Today', 'In Progress', 'Ready for Pickup', 'Pending Payments'].map((title, index) => (
            <Card key={index} className="bg-white border shadow-md rounded-lg">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600/50">{title}</p>
                  <p className="text-2xl font-semibold text-blue-600/40">—</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty Recent Orders */}
        <Card className="bg-blue-50 border border-blue-100 rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-600">Recent Orders</CardTitle>
            <CardDescription className="text-blue-600/70">
              You have no orders yet. Once orders are created, they will appear here.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Package className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-blue-600 font-medium">No orders yet</p>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={() => navigate('/vendor/create-order')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
