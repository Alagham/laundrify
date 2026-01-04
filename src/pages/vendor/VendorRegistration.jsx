import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Package, CheckCircle } from 'lucide-react';

const BLUE = '#0505F7';

export default function VendorRegistration() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-[#0505F7] border border-[#0505F7] shadow-[0_10px_28px_rgba(5,5,247,0.25)] text-white">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-medium text-white">Registration Successful!</h2>
              <p className="text-white/80">
                Your vendor account has been created. Our team will review your application and contact you within 24-48 hours.
              </p>
            </div>
            <Button 
              className="bg-white text-[#0505F7] hover:bg-white/90"
              onClick={() => navigate('/vendor/login')}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0505F7]">
      {/* Header */}
      <header className="bg-white border-b border-[#0505F7]/20">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 animate-spin-slow" />
              <span className="text-xl font-medium">Laundrify</span>
            </div>
            <Button 
              variant="ghost" 
              className="bg-transparent text-[#0505F7] hover:bg-[#0505F7]/10"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-medium text-[#0505F7]">Vendor Registration</h1>
            <p className="text-[#0505F7]/70">
              Join Laundrify and start managing your laundry business efficiently
            </p>
          </div>

          <Card className="bg-[#0505F7] border border-[#0505F7] shadow-[0_10px_28px_rgba(5,5,247,0.25)] text-white">
            <CardHeader>
              <CardTitle className="text-white">Business Information</CardTitle>
              <CardDescription className="text-white/80">
                Please provide accurate information about your business
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/** Input fields **/}
                  {Object.entries({
                    "Business Name": "businessName",
                    "Owner Name": "ownerName",
                    "Email": "email",
                    "Phone": "phone",
                    "Address": "address",
                    "City": "city",
                    "State": "state",
                    "ZIP Code": "zipCode",
                    "Password": "password",
                    "Confirm Password": "confirmPassword"
                  }).map(([label, key]) => (
                    <div className="space-y-2" key={key}>
                      <Label htmlFor={key} className="text-white">{label} *</Label>
                      <Input
                        id={key}
                        type={key.toLowerCase().includes("password") ? "password" : "text"}
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="text-[#0505F7] placeholder-[#0505F7] bg-white border border-white/40 focus:border-white"
                        placeholder={label}
                        required
                      />
                    </div>
                  ))}

                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-white text-[#0505F7] hover:bg-white/90"
                  >
                    Register
                  </Button>

                  <Button 
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent text-white border-white hover:bg-white/10"
                    onClick={() => navigate('/vendor/login')}
                  >
                    Already have an account?
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
