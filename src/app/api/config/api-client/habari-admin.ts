// lib/apiClient.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { QueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";


// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001" // your proxy
    : process.env.NEXT_PUBLIC_API_BASE_URL; // deployed backend

if (!baseURL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable.");
}


const client = axios.create({
  baseURL,
  withCredentials: true, 
    headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (request) => {
    const token = useAuthStore.getState().authenticatedUser?.accessToken;
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);


client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/") {
      useAuthStore.getState().clearAuthUser();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);


export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  (await client.get<T>(url, config)).data;

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  (await client.post<T>(url, data, config)).data;

export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  (await client.put<T>(url, data, config)).data;

export const patch = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  (await client.patch<T>(url, data, config)).data;

export const httpDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  (await client.delete<T>(url, config)).data;

export class ApiClientError<T = any> extends Error {
  userMessage?: string;
  axiosError?: AxiosError<T>;
  response?: T;

  constructor(params: {
    message?: string;
    name?: string;
    stack?: string;
    userMessage?: string;
    axiosError?: AxiosError<T>;
    response?: T;
  }) {
    super(params.message);
    this.name = params.name ?? "ApiClientError";
    this.stack = params.stack;
    this.userMessage = params.userMessage;
    this.axiosError = params.axiosError;
    this.response = params.response;
  }
}


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













