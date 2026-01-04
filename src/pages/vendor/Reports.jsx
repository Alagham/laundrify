import VendorLayout from "../../components/VendorLayout";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BarChart3, TrendingUp, Package, Users } from "lucide-react";

const BLUE = "#0505F7";

export default function Reports() {
  const navigate = useNavigate();

  // Later this will come from API
  const hasData = false;

  return (
    <VendorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-[#0505F7]">Reports</h1>
          <p className="text-[#0505F7]/70 mt-1">
            Business analytics and performance insights
          </p>
        </div>

        {/* KPI Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Revenue", icon: TrendingUp },
            { label: "Total Orders", icon: Package },
            { label: "Active Customers", icon: Users },
            { label: "Avg Order Value", icon: BarChart3 },
          ].map((item, i) => (
            <Card
              key={i}
              className="border border-[#0505F7]/20 bg-white"
            >
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#0505F7]/60">{item.label}</p>
                  <p className="text-xl font-semibold text-[#0505F7]/40">
                    —
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#0505F7]/10 flex items-center justify-center">
                  <item.icon className="text-[#0505F7]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {!hasData && (
          <Card className="border border-dashed border-[#0505F7]/30 bg-[#0505F7]/5">
            <CardContent className="py-20 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-[#0505F7]/10 flex items-center justify-center">
                  <BarChart3 className="w-10 h-10 text-[#0505F7]" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[#0505F7]">
                  No Reports Yet
                </h2>
                <p className="text-[#0505F7]/70 max-w-md mx-auto">
                  Your analytics will appear here once you start receiving
                  orders and processing customer activity.
                </p>
              </div>

              <Button
                className="bg-[#0505F7] text-white hover:bg-[#0505F7]/90"
                onClick={() => navigate("/vendor/create-order")}
              >
                Create Your First Order
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </VendorLayout>
  );
}
