"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, ButtonLoading } from "@/components/ui/button";
import HabariSuperAuthService from "@/services/HabariSuperAuthService";
import { useAuthStore } from "@/store/auth";


export default function Register() {
  const { setAuthUser } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = Object.values(formData).every((val) => val.trim() !== "");

  const handleRegister = async () => {
    try {
      setLoading(true);
      // 🔹 Replace with your real API call
      const response = await HabariSuperAuthService.registerUser(formData);

      // 🔹 Save user in Zustand + Cookies
      setAuthUser(response.data);

      console.log("Registered successfully:", response.data);
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter a password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Role */}
        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            type="text"
            placeholder="e.g. Admin / User"
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <Button
          className="w-full mt-4 bg-blue-500 text-white py-2"
          onClick={handleRegister}
          disabled={!isFormValid || loading}
        >
          {loading && <ButtonLoading className="h-4 w-4 animate-spin mr-2" />}
          Register
        </Button>
      </div>
    </div>
  );
}
