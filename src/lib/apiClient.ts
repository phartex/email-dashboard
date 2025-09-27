import axios from "axios";
import { useAuthStore } from "@/store/auth";

const getAuthToken = (): string | null => {
  const { authenticatedUser } = useAuthStore.getState();
  return authenticatedUser?.accessToken ?? null;
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    console.log("Token from store:", token); // Debug log
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response?.status === 401 && window.location.pathname !== "/") {
      useAuthStore.getState().clearAuthUser();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;