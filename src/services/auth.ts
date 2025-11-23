import { apiClient } from "../lib/api";
import type {
  RegisterRequest,
  LoginRequest,
  RegisterResponse,
  LoginResponse,
  User,
} from "../types/auth";

export const authService = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post("/user/register", data);

    // Transform backend response to match frontend expectations
    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
    };
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post("/user/login", data);

    // Store token in localStorage if login is successful
    if (response.data.data?.access_token) {
      localStorage.setItem("token", response.data.data.access_token);
    }

    // Transform backend response to match frontend expectations
    return {
      success: true,
      message: response.data.message,
      user: response.data.data?.user,
      access_token: response.data.data?.access_token,
    };
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  hasToken: () => {
    return !!localStorage.getItem("token");
  },

  getProfile: async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const response = await apiClient.get("/user/profile");
      return response.data.user;
    } catch (error) {
      console.error("Failed to get user profile:", error);
      return null;
    }
  },

  getLocalStorageToken: (): string | null => {
    return localStorage.getItem("token");
  },

  getCurrentUser: async (): Promise<User | null> => {
    return await authService.getProfile();
  },

  isAuthenticated: async (): Promise<boolean> => {
    const user = await authService.getProfile();
    return user !== null;
  },
};
