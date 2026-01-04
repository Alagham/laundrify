import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Mail, Phone } from "lucide-react";

// Mock fetch function to simulate API (replace with real backend)
async function fetchStaffList() {
  // return await fetch("/api/staff").then(res => res.json());
  return [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", phone: "555-0101", role: "Manager", status: "Active" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", phone: "555-0102", role: "Staff", status: "Active" },
  ];
}

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "Staff" });

  // Load staff from backend
  useEffect(() => {
    async function loadStaff() {
      const data = await fetchStaffList();
      setStaff(data || []);
    }
    loadStaff();
  }, []);

  const handleAddStaff = () => {
    setEditingStaff(null);
    setFormData({ name: "", email: "", phone: "", role: "Staff" });
    setIsDialogOpen(true);
  };

  const handleEditStaff = (member) => {
    setEditingStaff(member);
    setFormData({ ...member });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStaff) {
      setStaff(staff.map((s) => (s.id === editingStaff.id ? { ...s, ...formData } : s)));
    } else {
      const newStaff = { id: String(staff.length + 1), ...formData, status: "Active" };
      setStaff([...staff, newStaff]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteStaff = (id) => setStaff(staff.filter((s) => s.id !== id));

  return (
    <VendorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-blue-900">Staff Management</h1>
            <p className="text-blue-600 mt-1">Manage your team members and their roles</p>
          </div>

          {/* Add Staff Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleAddStaff}>
                <Plus className="w-5 h-5 mr-2" /> Add Staff
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-white border border-blue-200 rounded-lg shadow-lg p-6">
              <DialogHeader>
                <DialogTitle className="text-blue-900">
                  {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
                </DialogTitle>
                <DialogDescription className="text-blue-600">
                  {editingStaff ? "Update staff member information" : "Enter the details of the new staff member"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {["name", "email", "phone", "role"].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="text-blue-900 capitalize">
                      {field === "role" ? "Role" : field.replace(/^\w/, (c) => c.toUpperCase())} *
                    </Label>
                    <Input
                      id={field}
                      type={field === "email" ? "email" : "text"}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="bg-white border border-blue-200 text-blue-900 focus:border-blue-500"
                      required
                    />
                  </div>
                ))}

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                    {editingStaff ? "Update" : "Add"} Staff
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Staff List */}
        <Card className="bg-white border border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900">Team Members</CardTitle>
            <CardDescription className="text-blue-600">{staff.length} staff member(s)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {staff.length === 0 ? (
              <p className="text-blue-600 text-center py-4">No staff members yet.</p>
            ) : (
              staff.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-4 mb-3 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-700 font-medium">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">{member.name}</p>
                      <div className="flex items-center space-x-4 mt-1 text-blue-600 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" /> {member.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" /> {member.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge className="bg-blue-100 text-blue-700 border border-blue-200">{member.role}</Badge>
                    <Badge className={member.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {member.status}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:bg-blue-50"
                        onClick={() => handleEditStaff(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteStaff(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
