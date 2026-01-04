import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import { Package, AlertCircle, ArrowLeft } from 'lucide-react';

const BLUE = '#0505F7';

export default function InvalidTracking() {
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRetry = () => {
    setError('');

    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    const validPattern = /^CLP-\d{4}-\d{4}$/;

    if (!validPattern.test(trackingId.trim())) {
      setError('Invalid tracking ID format');
      return;
    }

    navigate(`/track/${trackingId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-[#0505F7]">
      {/* Header */}
      <header className="bg-white border-b border-[#0505F7]/20 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-7 h-7 text-[#0505F7]" />
              <span className="text-xl font-semibold">Laundrify</span>
            </div>

            <Button
              variant="ghost"
              className="text-[#0505F7] hover:bg-[#0505F7]/5"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Error Icon */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-[#0505F7]">
              Tracking ID Not Found
            </h1>

            <p className="text-[#0505F7]/70">
              We couldn’t find an order with that tracking ID. Please check and try again.
            </p>
          </div>

          {/* Retry Card */}
          <Card className="border border-[#0505F7]/25 shadow-[0_8px_24px_rgba(5,5,247,0.12)]">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-[#0505F7]">Try Another Tracking ID</Label>
                <Input
                  placeholder="CLP-2025-0098"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    setError('');
                  }}
                  className="border-[#0505F7]/40 focus:border-[#0505F7]"
                  onKeyDown={(e) => e.key === 'Enter' && handleRetry()}
                />

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <p className="text-sm text-[#0505F7]/70">
                  Format: CLP-YYYY-XXXX
                </p>
              </div>

              <Button
                onClick={handleRetry}
                className="w-full bg-[#0505F7] text-white hover:bg-[#0505F7]/90"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>

          {/* Help */}
          <div className="text-center space-y-4">
            <p className="text-sm text-[#0505F7]/70">
              Need help? Check your receipt or contact your vendor.
            </p>

            <Button
              variant="outline"
              className="border-[#0505F7] text-[#0505F7] hover:bg-[#0505F7]/5"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>

          {/* Tips */}
          <div className="bg-[#0505F7]/5 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-[#0505F7]">
              Common Issues
            </h3>
            <ul className="space-y-2 text-sm text-[#0505F7]/80">
              <li>• Tracking ID format is incorrect</li>
              <li>• Extra spaces before or after the ID</li>
              <li>• Order not yet created by vendor</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#0505F7]/20">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm text-[#0505F7]/70">
            © {new Date().getFullYear()} Laundrify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
