import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./../components/ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Package,
  LayoutDashboard,
  ShoppingCart,
  Plus,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function VendorLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/vendor/dashboard" },
    { icon: ShoppingCart, label: "Orders", path: "/vendor/orders" },
    { icon: Plus, label: "Create Order", path: "/vendor/create-order" },
    { icon: Users, label: "Staff", path: "/vendor/staff" },
    { icon: BarChart3, label: "Reports", path: "/vendor/reports" },
    { icon: MessageSquare, label: "SMS Logs", path: "/vendor/sms-logs" },
    { icon: Settings, label: "Settings", path: "/vendor/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              className="lg:hidden bg-transparent text-gray-800 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2} />
              )}
            </Button>

            {/* Brand */}
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-blue-600" strokeWidth={2} />
              <span className="text-xl font-medium text-gray-900">
                Laundrify
              </span>
            </div>
          </div>

          {/* Right side - profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">
                Fresh Clean Laundry
              </p>
              <p className="text-xs text-gray-500">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <Avatar className="w-10 h-10 bg-gray-200">
              <AvatarFallback className="text-gray-700">JS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full justify-start ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-transparent text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="w-5 h-5 mr-3" strokeWidth={2} />
                {item.label}
              </Button>
            ))}

            {/* Logout */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start bg-transparent text-red-600 hover:bg-red-50"
                onClick={() => navigate("/vendor/login")}
              >
                <LogOut className="w-5 h-5 mr-3" strokeWidth={2} />
                Logout
              </Button>
            </div>
          </nav>
        </aside>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Package className="w-8 h-8 text-blue-600" strokeWidth={2} />
                <span className="text-xl font-medium text-gray-900">
                  Laundrify
                </span>
              </div>
              <Button
                variant="ghost"
                className="bg-transparent text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" strokeWidth={2} />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-transparent text-gray-800 hover:bg-gray-100"
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="w-5 h-5 mr-3" strokeWidth={2} />
                  {item.label}
                </Button>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="w-full justify-start bg-transparent text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/vendor/login");
                  }}
                >
                  <LogOut className="w-5 h-5 mr-3" strokeWidth={2} />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
