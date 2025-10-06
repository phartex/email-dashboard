"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, ButtonLoading } from "@/components/ui/button";
import HabariSuperAuthService from "@/services/HabariSuperAuthService";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email must be valid"),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.string().min(1, "Role is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // 🔹 useMutation for register
  const registerUser = useMutation({
    mutationFn: (data: FormData) => HabariSuperAuthService.registerUser(data),
    onSuccess: (response) => {
      toast.success(response.message || "User registered successfully. Please login.");
      router.push("/");
    },
    onError: (error: any) => {
      console.log("Registration error:", error);
      toast.error(error.response?.data?.error || "Something went wrong.");
    },
  });

  // 🔹 define onSubmit
  const onSubmit = (data: FormData) => {
    registerUser.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="z-10 mx-auto max-w-md w-full rounded-2xl px-8 py-12 shadow-lg bg-white">
        <p className="text-green-700 text-3xl text-center font-semibold">Register</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="py-2">Name</Label>
            <Input id="name" type="text" placeholder="Enter your full name" {...register("name")}  className="focus:outline-none focus:ring-0 focus:border-none"/>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="py-2">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" {...register("email")} className="focus:outline-none focus:ring-0 focus:border-none"/>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="py-2">Password</Label>
            <Input id="password" type="password" placeholder="Enter a password" {...register("password")} className="focus:outline-none focus:ring-0 focus:border-none"/>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role" className="py-2">Role</Label>
            <Input id="role" type="text" placeholder="e.g. user / admin" {...register("role")} className="focus:outline-none focus:ring-0 focus:border-none"/>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full mt-4 bg-green-700 text-white py-6 text-xl"
            disabled={registerUser.isPending}
          >
            {registerUser.isPending && <ButtonLoading className="h-4 w-4 animate-spin mr-2" />}
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
