import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth";
import type { RegisterRequest, LoginRequest } from "../types/auth";
import { toast } from "react-hot-toast";

interface BackendErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  errors?: string[] | null;
}

interface ApiError {
  response?: {
    data?: BackendErrorResponse;
    status?: number;
  };
  message?: string;
}

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Registration successful!");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;

      // Handle backend structured error response
      if (apiError.response?.data) {
        const backendError = apiError.response.data;

        // Show validation errors if available
        if (backendError.errors && backendError.errors.length > 0) {
          backendError.errors.forEach((err) => toast.error(err));
        } else {
          toast.error(backendError.message || "Registration failed");
        }
      } else {
        // Fallback for network or other errors
        toast.error(apiError.message || "Registration failed");
      }
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Login successful!");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;

      // Handle backend structured error response
      if (apiError.response?.data) {
        const backendError = apiError.response.data;

        // Show validation errors if available
        if (backendError.errors && backendError.errors.length > 0) {
          backendError.errors.forEach((err) => toast.error(err));
        } else {
          toast.error(backendError.message || "Login failed");
        }
      } else {
        // Fallback for network or other errors
        toast.error(apiError.message || "Login failed");
      }
    },
  });
};
