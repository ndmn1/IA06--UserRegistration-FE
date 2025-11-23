import { Link } from "react-router-dom";
import { UserProfile, AuthLayout, LoadingSpinner } from "../components";
import { Button } from "../components/ui/button";
import { authService } from "../services/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name?: string } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      const userData = authService.getCurrentUser();

      setIsAuthenticated(authenticated);
      setUser(userData);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    window.location.reload();
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <LoadingSpinner size="lg" text="Loading..." className="py-8" />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            User Registration System
          </h1>
          <UserProfile user={user} onLogout={handleLogout} />
        </div>
      </div>
    );
  }

  return (
    <AuthLayout
      title="User Registration System"
      description="A complete authentication system with NestJS and React"
      showHomeLink={false}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Get started with your account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Sign up for a new account or login to your existing one.
          </p>
        </div>
        <div className="space-y-4">
          <Link to="/login" className="block">
            <Button className="w-full">Sign In</Button>
          </Link>
          <Link to="/register" className="block">
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
