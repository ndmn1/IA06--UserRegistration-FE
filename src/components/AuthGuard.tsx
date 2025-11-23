import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { authService } from "../services/auth";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * AuthGuard component to handle authentication-based redirects
 * @param children - The component to render if auth check passes
 * @param redirectTo - Where to redirect (default: "/")
 * @param requireAuth - If true, requires authentication; if false, redirects authenticated users
 */
export function AuthGuard({
  children,
  redirectTo = "/",
  requireAuth = false,
}: AuthGuardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();

    // If page requires auth but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    // If page is for unauthenticated users but user is authenticated
    if (!requireAuth && isAuthenticated) {
      navigate(redirectTo, { replace: true });
      return;
    }
  }, [navigate, redirectTo, requireAuth]);

  return <>{children}</>;
}
