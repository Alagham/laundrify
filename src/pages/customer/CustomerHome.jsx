import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Package,
  Search,
  Bell,
  CheckCircle,
  Menu,
  X,
} from 'lucide-react';

const BLUE = '#0505F7';

export default function CustomerHome() {
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleTrack = () => {
    setError('');

    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    const validPattern = /^CLP-\d{4}-\d{4}$/;

    if (!validPattern.test(trackingId.trim())) {
      navigate('/track/invalid');
      return;
    }

    navigate(`/track/${trackingId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-white text-[#0505F7]">
      {/* Header */}
      <header className="bg-white border-b border-[#0505F7]/20 shadow-[0_4px_12px_rgba(5,5,247,0.08)]">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-7 h-7" />
              <span className="text-xl font-semibold">Laundrify</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="hover:underline">
                How it works
              </a>
              <a href="#for-vendors" className="hover:underline">
                For Vendors
              </a>
              <Button
                variant="outline"
                className="border-[#0505F7] text-[#0505F7] hover:bg-[#0505F7]/5"
                onClick={() => navigate('/vendor/login')}
              >
                Login
              </Button>
            </div>

            {/* Mobile */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>

          {menuOpen && (
            <div className="md:hidden mt-6 space-y-4 border-t border-[#0505F7]/20 pt-4">
              <a href="#how-it-works" className="block">
                How it works
              </a>
              <a href="#for-vendors" className="block">
                For Vendors
              </a>
              <Button
                className="w-full border border-[#0505F7] text-[#0505F7]"
                variant="outline"
                onClick={() => navigate('/vendor/login')}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold">
              Track Your Laundry Order
            </h1>
            <p className="text-[#0505F7]/80 text-lg">
              Enter your tracking ID to see real-time order progress
            </p>
          </div>

          {/* Tracking Card */}
          <Card className="bg-white border border-[#0505F7]/25 shadow-[0_8px_24px_rgba(5,5,247,0.12)]">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2 text-left">
                <Label>Tracking ID</Label>
                <Input
                  placeholder="CLP-2025-0098"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    setError('');
                  }}
                  className="border-[#0505F7]/40 focus:border-[#0505F7]"
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                />

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <p className="text-sm text-[#0505F7]/70">
                  Tracking ID is on your receipt or SMS
                </p>
              </div>

              <Button
                onClick={handleTrack}
                className="w-full bg-[#0505F7] text-white hover:bg-[#0505F7]/90"
              >
                <Search className="w-5 h-5 mr-2" />
                Track Order
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <section id="how-it-works" className="mt-24 md:mt-32">
          <h2 className="text-3xl font-semibold text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Package, title: 'Drop Off', text: 'Drop clothes at vendor' },
              { icon: Search, title: 'Order Created', text: 'Vendor logs order' },
              { icon: Bell, title: 'Track Progress', text: 'Real-time updates' },
              { icon: CheckCircle, title: 'Pick Up', text: 'Collect clean laundry' },
            ].map(({ icon: Icon, title, text }) => (
              <Card
                key={title}
                className="bg-[#0505F7] text-white shadow-[0_10px_28px_rgba(5,5,247,0.25)]"
              >
                <CardHeader>
                  <Icon className="w-6 h-6 mb-4" />
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/80">
                    {text}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Vendor CTA */}
        <section id="for-vendors" className="mt-24 md:mt-32">
          <Card className="border border-[#0505F7]/25 shadow-[0_8px_24px_rgba(5,5,247,0.12)] text-center">
            <CardContent className="py-16 space-y-6">
              <h2 className="text-3xl font-semibold">
                Are You a Dry Cleaning Vendor?
              </h2>
              <p className="text-lg text-[#0505F7]/80 max-w-2xl mx-auto">
                Manage orders, track progress, and delight customers.
              </p>
              <Button
                size="lg"
                className="bg-[#0505F7] text-white hover:bg-[#0505F7]/90"
                onClick={() => navigate('/vendor/register')}
              >
                Vendor Sign Up
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#0505F7]/20 mt-24">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-semibold">Laundrify</span>
          <p className="text-sm text-[#0505F7]/70">
            © {new Date().getFullYear()} Laundrify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
