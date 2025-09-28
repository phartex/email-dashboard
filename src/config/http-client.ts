import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth";
 
export class HttpClient {
  private readonly client: AxiosInstance;
 
  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
 
    this.client.interceptors.request.use(
      (request) => {
        const token = this.getAuthToken();
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
      },
      (error) => Promise.reject(error),
    );
 
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response } = error;
        if (response?.status === 401 && window.location.pathname !== "/") {
          useAuthStore.getState().clearAuthUser();
          window.location.href = "/";
        }
        return Promise.reject(error);
      },
    );
  }
 
  private getAuthToken(): string | null {
    const { authenticatedUser } = useAuthStore.getState();
    return authenticatedUser?.accessToken ?? null;
  }
 
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config).then((res) => res.data);
  }
 
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config).then((res) => res.data);
  }
 
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put(url, data, config).then((res) => res.data);
  }
 
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config).then((res) => res.data);
  }
}
 
 