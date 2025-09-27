"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Email must be valid" }),
  password: z.string().min(2, { message: "Password must be at least 2 characters." }),
});

export default function LoginForm() {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const { setAuthUser } = useAuthStore();
  const router = useRouter();

  const authenticateUser = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await apiClient.post("/api/auth/login", data);
      return res.data;
    },
    onSuccess: (response) => {
      console.log("Login response:", response);

      if (!response.success) {
        toast.error("Invalid login response");
        return;
      }

      const { user, token } = response.data;

      const authData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token, // Bearer token for API calls
      };

      setAuthUser(authData);
      toast.success("Login Successful");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || "Login failed";
      toast.error(errorMessage);
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const onSubmit = (data: { email: string; password: string }) => authenticateUser.mutate(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-[#353F50] w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Enter password" {...field} />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2">
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center my-4">
          {/* <div className="flex items-center">
            <Checkbox checked={checked} onCheckedChange={setChecked} />
            <span className="ml-2 text-sm">Remember me</span>
          </div> */}
          <Button variant="link" type="button">Forgot Password?</Button>
        </div>
        <Button type="submit" className="w-full" disabled={authenticateUser.isPending}>
          {authenticateUser.isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
}
