"use client";
import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthUser {
  id: string;
  email: string;
  accessToken: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
  role: string;
  refreshToken: string;
  expires: string;
}

interface AuthState {
  authenticatedUser: AuthUser | null;
  setAuthUser: (authData: {
    id: any;
    email: any;
    name: any;
    role: any;
    token: any;
  }) => void;
  clearAuthUser: () => void;
}

const isClient = typeof window !== "undefined";

const getAuthFromCookies = (): AuthUser | null => {
  if (isClient) {
    const authUser = Cookies.get("authUser");
    return authUser ? JSON.parse(authUser) : null;
  }
  return null;
};

const setAuthToCookies = (authData: AuthUser | null) => {
  if (isClient) {
    if (authData) {
      Cookies.set("authUser", JSON.stringify(authData), {
        expires: 1,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
    } else {
      Cookies.remove("authUser");
    }
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  authenticatedUser: getAuthFromCookies(),

  setAuthUser: (authData) => {
    // Transform backend response into full AuthUser structure
    const mappedUser: AuthUser = {
      id: String(authData.id),
      email: authData.email,
      accessToken: authData.token,
      firstName: authData.name?.split(" ")[0] || "",
      lastName: authData.name?.split(" ")[1] || "",
      phoneNumber: "",
      userType: "user", // fallback
      role: authData.role,
      refreshToken: "",
      expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hr expiry
    };

    console.log("Setting auth user:", mappedUser);
    setAuthToCookies(mappedUser);
    set({ authenticatedUser: mappedUser });
  },

  clearAuthUser: () => {
    setAuthToCookies(null);
    set({ authenticatedUser: null });
  },
}));
