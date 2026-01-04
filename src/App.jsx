import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 🧩 Admin
import AdminDashboard from "./pages/admin/AdminDashboard";

// 🧩 Customer
import CustomerHome from "./pages/customer/CustomerHome";
import TrackingResult from "./pages/customer/TrackingResult";
import InvalidTracking from "./pages/customer/InvalidTracking";

// 🧩 Vendor Auth
import VendorRegistration from "./pages/vendor/VendorRegistration";
import VendorLogin from "./pages/vendor/VendorLogin";

// 🧩 Vendor Pages
import VendorDashboard from "./pages/vendor/VendorDashboard";
import CreateOrder from "./pages/vendor/CreateOrder";
import Orders from "./pages/vendor/OrdersList";
import OrderDetail from "./pages/vendor/OrderDetail";
import SMSLogs from "./pages/vendor/SMSLogs";
import StaffManagement from "./pages/vendor/StaffManagement";
import Reports from "./pages/vendor/Reports";
import Settings from "./pages/vendor/Settings";


// 🧩 Utility
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== Default ===== */}
        <Route path="/" element={<Navigate to="/customer/home" replace />} />

        {/* ===== Admin ===== */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* ===== Customer ===== */}
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/track/:trackingId" element={<TrackingResult />} />
        <Route path="/track/invalid" element={<InvalidTracking />} />

        {/* ===== Vendor Auth ===== */}
        <Route path="/vendor/register" element={<VendorRegistration />} />
        <Route path="/vendor/login" element={<VendorLogin />} />

        {/* ===== Vendor App ===== */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/create-order" element={<CreateOrder />} />
        <Route path="/vendor/orders" element={<Orders />} />
        <Route path="/vendor/orders/:orderId" element={<OrderDetail />} />
        <Route path="/vendor/sms-logs" element={<SMSLogs />} />
        <Route path="/vendor/staff" element={<StaffManagement />} />
        <Route path="/vendor/reports" element={<Reports />} />
        <Route path="/vendor/settings" element={<Settings />} />


        {/* ===== 404 ===== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
