import { QueryClient } from "@tanstack/react-query";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth";
import fetchRuntimeConfig from "@/config";
 
const getAuthToken = (): string | null => {
  const { authenticatedUser } = useAuthStore.getState();
  return authenticatedUser?.accessToken ?? null;
};
 
// Create an Axios instance with a placeholder `baseURL`
const client = axios.create({
  // baseURL: "https://qm-apiservices.k8.isw.la", // Will be set dynamically
  baseURL: "", // Will be set dynamically
});
 
export const initializeAxios = async () => {
  const envConfig = await fetchRuntimeConfig();
  client.defaults.baseURL = envConfig.TRANSPORT_SWITCH_END_POINT;
};
 
// Initialize Axios configuration at runtime
initializeAxios();
 
client.interceptors.request.use(

  (request) => {
    const token = getAuthToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);
 
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    // Check if we received a 401 and we're not on the home route
    if (response?.status === 401 && window.location.pathname !== "/") {
      useAuthStore.getState().clearAuthUser();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
 
 
type ApiClientRead = <T>(
  url: string,
  config?: AxiosRequestConfig,
) => Promise<T>;
 
type ApiClientWrite = <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  config?: AxiosRequestConfig,
) => Promise<T>;
 
// API error handling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiClientErrorParams<T = any> {
  message?: string;
  name?: string;
  stack?: string;
  userMessage?: string;
  axiosError?: AxiosError<T>;
  response?: T;
}
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ApiClientError<T = any> extends Error {
  userMessage: string | undefined;
  axiosError?: AxiosError<T>;
  response?: T | undefined;
 
  constructor(params?: ApiClientErrorParams<T>) {
    super();
    this.message = params?.message ?? "";
    this.name = params?.name ?? "ApiClientError";
    this.stack = params?.stack;
    this.userMessage = params?.userMessage;
    this.axiosError = params?.axiosError;
    this.response = params?.response;
  }
}
 
// API functions
export const get: ApiClientRead = async (...args) => await client.get(...args);
export const httpDelete: ApiClientRead = async (...args) =>
  await client.delete(...args);
export const post: ApiClientWrite = async (...args) =>
  await client.post(...args);
export const put: ApiClientWrite = async (...args) => await client.put(...args);
export const patch: ApiClientWrite = async (...args) => await client.patch(...args);
 
// React Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});