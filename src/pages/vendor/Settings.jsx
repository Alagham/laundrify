import { useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";

const BLUE = "#0505F7";

export default function Settings() {
  const [profileData, setProfileData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [notifications, setNotifications] = useState({
    emailNewOrder: true,
    emailStatusUpdate: true,
    smsNewOrder: true,
    smsStatusUpdate: true,
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // API integration later
  };

  return (
    <VendorLayout>
      <div className="space-y-8 max-w-5xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-[#0505F7]">Settings</h1>
          <p className="text-[#0505F7]/70 mt-1">
            Manage your business profile and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white border border-[#0505F7]/20">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* PROFILE */}
          <TabsContent value="profile">
            <Card className="bg-white border border-[#0505F7]/20">
              <CardHeader>
                <CardTitle className="text-[#0505F7]">
                  Business Profile
                </CardTitle>
                <CardDescription>
                  Your public business information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleProfileSubmit}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {[
                    ["businessName", "Business Name"],
                    ["ownerName", "Owner Name"],
                    ["email", "Email"],
                    ["phone", "Phone"],
                    ["address", "Address"],
                  ].map(([key, label]) => (
                    <div key={key} className="space-y-1">
                      <Label className="text-[#0505F7]">{label}</Label>
                      <Input
                        value={profileData[key]}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            [key]: e.target.value,
                          })
                        }
                        className="bg-white"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <Button className="bg-[#0505F7] hover:bg-[#0505F7]/90">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SUBSCRIPTION */}
          <TabsContent value="subscription">
            <Card className="bg-white border border-[#0505F7]/20">
              <CardHeader>
                <CardTitle className="text-[#0505F7]">
                  Subscription
                </CardTitle>
                <CardDescription>
                  Billing & plan information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Free Plan</p>
                    <p className="text-sm text-gray-500">
                      Limited features • No billing yet
                    </p>
                  </div>
                  <Badge className="bg-[#0505F7]/10 text-[#0505F7]">
                    Active
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  className="border-[#0505F7] text-[#0505F7]"
                  disabled
                >
                  Upgrade Plan (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NOTIFICATIONS */}
          <TabsContent value="notifications">
            <Card className="bg-white border border-[#0505F7]/20">
              <CardHeader>
                <CardTitle className="text-[#0505F7]">
                  Notifications
                </CardTitle>
                <CardDescription>
                  Control how customers are notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  ["emailNewOrder", "Email for new orders"],
                  ["emailStatusUpdate", "Email for status updates"],
                  ["smsNewOrder", "SMS for new orders"],
                  ["smsStatusUpdate", "SMS for status updates"],
                ].map(([key, label]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between"
                  >
                    <span>{label}</span>
                    <Switch
                      checked={notifications[key]}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          [key]: checked,
                        })
                      }
                    />
                  </div>
                ))}
                <Button className="bg-[#0505F7]">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACCOUNT */}
          <TabsContent value="account">
            <Card className="bg-white border border-[#0505F7]/20">
              <CardHeader>
                <CardTitle className="text-[#0505F7]">
                  Account
                </CardTitle>
                <CardDescription>
                  Security & account actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button variant="outline" disabled>
                  Change Password (Coming Soon)
                </Button>

                <div className="border-t pt-6">
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                    disabled
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
}
