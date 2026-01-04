import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorLayout from "../../components/VendorLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
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
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default function OrdersList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /** ✅ EMPTY — orders appear only after creation */
  const orders = [];

  const getStatusColor = (status) => {
    const colors = {
      Received: "bg-blue-100 text-blue-700",
      Washing: "bg-blue-100 text-blue-700",
      Drying: "bg-blue-100 text-blue-700",
      Ironing: "bg-blue-100 text-blue-700",
      Packaging: "bg-blue-100 text-blue-700",
      Ready: "bg-blue-100 text-blue-700",
    };
    return colors[status] || "bg-blue-50 text-blue-600";
  };

  const getPaymentColor = (payment) =>
    payment === "Paid"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <VendorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-blue-900">Orders</h1>
          <p className="text-blue-600 mt-1">
            Manage and track all your orders
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-white border border-blue-100 shadow-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <Input
                  placeholder="Search by order ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    pl-10
                    bg-white
                    border border-blue-200
                    text-blue-900
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20
                  "
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className="
                    bg-white
                    border border-blue-200
                    text-blue-900
                    hover:border-blue-400
                    focus:ring-2 focus:ring-blue-500/20
                  "
                >
                  <Filter className="w-4 h-4 mr-2 text-blue-500" />
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>

                <SelectContent
                  className="
                    bg-white
                    border border-blue-100
                    shadow-lg shadow-blue-500/10
                    rounded-xl
                  "
                >
                  <SelectItem value="all" className="focus:bg-blue-50">
                    All Statuses
                  </SelectItem>
                  {[
                    "Received",
                    "Washing",
                    "Drying",
                    "Ironing",
                    "Packaging",
                    "Ready",
                  ].map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="focus:bg-blue-50 focus:text-blue-700"
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="bg-white border border-blue-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900">All Orders</CardTitle>
            <CardDescription className="text-blue-600">
              {filteredOrders.length} order(s) found
            </CardDescription>
          </CardHeader>

          <CardContent>
            {filteredOrders.length === 0 ? (
              /* Empty State */
              <div className="py-20 text-center">
                <p className="text-lg font-medium text-blue-900">
                  No orders yet
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Orders will appear here once a customer creates one.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-100">
                        {[
                          "Order ID",
                          "Customer",
                          "Phone",
                          "Items",
                          "Status",
                          "Payment",
                          "Total",
                          "Date",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left py-3 px-4 text-sm font-medium text-blue-900"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.map((order, index) => (
                        <tr
                          key={order.id}
                          className={`
                            border-b border-blue-50
                            cursor-pointer
                            transition
                            ${index % 2 === 0 ? "bg-blue-50/40" : "bg-white"}
                            hover:bg-blue-50
                          `}
                          onClick={() =>
                            navigate(`/vendor/orders/${order.id}`)
                          }
                        >
                          <td className="py-3 px-4 font-mono text-sm text-blue-900">
                            {order.id}
                          </td>
                          <td className="py-3 px-4 text-blue-900">
                            {order.customer}
                          </td>
                          <td className="py-3 px-4 text-blue-900">
                            {order.phone}
                          </td>
                          <td className="py-3 px-4 text-blue-900">
                            {order.items}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getPaymentColor(order.payment)}>
                              {order.payment}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 font-medium text-blue-900">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-blue-900">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-blue-600">
                      Showing {startIndex + 1}–
                      {Math.min(
                        startIndex + itemsPerPage,
                        filteredOrders.length
                      )}{" "}
                      of {filteredOrders.length}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        className="border-blue-200 text-blue-700"
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm text-blue-900">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        className="border-blue-200 text-blue-700"
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.min(totalPages, p + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
