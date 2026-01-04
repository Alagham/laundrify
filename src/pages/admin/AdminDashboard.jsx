import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Package, Store, Users, DollarSign, Search, LogOut } from 'lucide-react';

/* ------------------- KPI Card Component ------------------- */
function KPICard({ title, value, Icon }) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-medium text-foreground">{value}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-tertiary flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------- Vendors Table Component ------------------- */
function VendorsTable({ vendors }) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Vendors</CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage all registered vendors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Vendor Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Owner</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Orders</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr
                  key={vendor.id}
                  className={`border-b border-border hover:bg-accent/50 cursor-pointer transition-colors ${
                    index % 2 === 0 ? 'bg-neutral-100' : 'bg-background'
                  }`}
                >
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{vendor.name}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{vendor.owner}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{vendor.location}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{vendor.orders}</td>
                  <td className="py-3 px-4 text-sm font-medium text-foreground">${vendor.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <Badge className={
                      vendor.status === 'Active'
                        ? 'bg-success text-success-foreground'
                        : 'bg-warning text-warning-foreground'
                    }>
                      {vendor.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------- Header Component ------------------- */
function AdminHeader({ onLogout }) {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-primary" strokeWidth={2} />
            <span className="text-xl font-medium text-foreground">Laundrify Admin</span>
          </div>
          <Button
            variant="ghost"
            className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5 mr-2" strokeWidth={2} />
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}

/* ------------------- Main Admin Dashboard ------------------- */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const kpiData = [
    { title: 'Total Vendors', value: '48', icon: Store },
    { title: 'Active Orders', value: '1,234', icon: Package },
    { title: 'Total Users', value: '5,678', icon: Users },
    { title: 'Monthly Revenue', value: '$45,890', icon: DollarSign },
  ];

  const vendors = [
    { id: '1', name: 'Fresh Clean Laundry', owner: 'John Smith', location: 'New York, NY', orders: 248, status: 'Active', revenue: 12450 },
    { id: '2', name: 'Sparkle Dry Cleaners', owner: 'Jane Doe', location: 'Los Angeles, CA', orders: 189, status: 'Active', revenue: 9870 },
    { id: '3', name: 'Quick Wash Services', owner: 'Bob Johnson', location: 'Chicago, IL', orders: 156, status: 'Active', revenue: 8230 },
    { id: '4', name: 'Premium Laundry Co', owner: 'Alice Brown', location: 'Houston, TX', orders: 134, status: 'Pending', revenue: 7120 },
  ];

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminHeader onLogout={() => navigate('/')} />

      <main className="container mx-auto px-6 py-8 md:py-12 space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-medium text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">System overview and vendor management</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map(kpi => <KPICard key={kpi.title} title={kpi.title} value={kpi.value} Icon={kpi.icon} />)}
        </div>

        {/* Vendors Section */}
        <div className="space-y-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" strokeWidth={2} />
            <Input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 text-foreground bg-background border-border focus:border-primary"
            />
          </div>

          <VendorsTable vendors={filteredVendors} />
        </div>
      </main>
    </div>
  );
}
