import { useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Search, MessageSquare } from "lucide-react";

export default function SMSLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Empty state — real data will come from API later
  const smsLogs = [];

  const filteredLogs = smsLogs.filter((log) => {
    const matchesSearch =
      log.trackingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.phone?.includes(searchQuery);
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <VendorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-[#0505F7]">SMS Logs</h1>
          <p className="text-[#0505F7]/70 mt-1">
            View all SMS notifications sent to customers
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-white border border-[#0505F7]/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-[#0505F7]/50" />
                <Input
                  placeholder="Search by tracking ID or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>

              {/* Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-white border border-[#0505F7]/30">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Order Created">Order Created</SelectItem>
                  <SelectItem value="Status Update">Status Update</SelectItem>
                  <SelectItem value="Ready for Pickup">
                    Ready for Pickup
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <Card className="border border-dashed border-[#0505F7]/30 bg-[#0505F7]/5">
            <CardContent className="py-20 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-[#0505F7]/10 flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-[#0505F7]" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[#0505F7]">
                  No SMS History Yet
                </h2>
                <p className="text-[#0505F7]/70 max-w-md mx-auto">
                  SMS notifications will appear here once you create orders
                  and enable customer notifications.
                </p>
              </div>

              {/* Informational Badge — NO hover */}
              <Badge className="bg-[#0505F7]/10 text-[#0505F7] pointer-events-none select-none">
                Awaiting first order
              </Badge>
            </CardContent>
          </Card>
        )}
      </div>
    </VendorLayout>
  );
}
