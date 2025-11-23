export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  access_token?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
