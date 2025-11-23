import { apiClient } from "../lib/api";
import type {
  RegisterRequest,
  LoginRequest,
  RegisterResponse,
  LoginResponse,
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

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      // Decode JWT token to get user info (basic implementation)
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        email: payload.email || payload.sub,
        name: payload.name,
      };
    } catch {
      return null;
    }
  },
};
