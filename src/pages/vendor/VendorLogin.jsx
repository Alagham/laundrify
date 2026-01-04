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
import { Package, Mail, Lock } from 'lucide-react';

const BLUE = '#0505F7';

export default function VendorLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/vendor/dashboard');
  };

  return (
    <div className="min-h-screen bg-white text-[#0505F7]">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-white border-r border-[#0505F7]/20">
          <div className="flex items-center space-x-2">
            {/* Rotating Logo */}
            <Package className="w-8 h-8 animate-spin-slow" />

            <span className="text-2xl font-semibold">Laundrify</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold">
              Manage Your Laundry Business with Ease
            </h1>
            <ul className="space-y-4 text-lg text-[#0505F7]/80">
              <li>✓ Track orders in real-time</li>
              <li>✓ Manage staff and operations</li>
              <li>✓ Generate detailed reports</li>
              <li>✓ Automated SMS notifications</li>
            </ul>
          </div>

          <p className="text-sm text-[#0505F7]/70">
            © {new Date().getFullYear()} Laundrify. All rights reserved.
          </p>
        </div>

        {/* Right Panel */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <div className="lg:hidden flex justify-center mb-6">
                <Package className="w-12 h-12 animate-spin-slow" />
              </div>
              <h2 className="text-3xl font-semibold">Welcome Back</h2>
              <p className="text-[#0505F7]/70">
                Sign in to your vendor account
              </p>
            </div>

            {/* 🔵 BLUE LOGIN BOX */}
            <Card className="bg-[#0505F7] border border-[#0505F7] shadow-[0_10px_28px_rgba(5,5,247,0.25)] text-white">
              <CardHeader>
                <CardTitle className="text-white">Vendor Login</CardTitle>
                <CardDescription className="text-white/80">
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2 relative group">
                    <Label className="text-white">Email or Phone</Label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-3 w-5 h-5 text-[#0505F7] group-focus-within:animate-bounce"
                      />
                      <Input
                        type="text"
                        placeholder="vendor@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="pl-10 bg-white text-[#0505F7] placeholder-[#0505F7] border border-white/40 focus:border-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2 relative group">
                    <Label className="text-white">Password</Label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-3 w-5 h-5 text-[#0505F7] group-focus-within:animate-bounce"
                      />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="pl-10 bg-white text-[#0505F7] placeholder-[#0505F7] border border-white/40 focus:border-white"
                        required
                      />
                    </div>
                  </div>

                  {/* ⚪ WHITE BUTTON */}
                  <Button
                    type="submit"
                    className="w-full bg-white text-[#0505F7] hover:bg-white/90"
                  >
                    Sign In
                  </Button>
                </form>

                {/* Links */}
                <div className="mt-6 space-y-4 text-center text-sm">
                  <button className="text-white/80 hover:underline">
                    Forgot password?
                  </button>

                  <div className="text-white/80">
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => navigate('/vendor/register')}
                      className="font-medium text-white hover:underline"
                    >
                      Sign up
                    </button>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    onClick={() => navigate('/')}
                  >
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
