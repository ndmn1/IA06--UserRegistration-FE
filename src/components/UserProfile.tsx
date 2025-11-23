import { User, LogOut, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface UserProfileProps {
  user?: {
    email: string;
    name?: string;
  } | null;
  onLogout: () => void;
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Shield className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-xl font-semibold text-green-600">
          Welcome back!
        </CardTitle>
        <CardDescription>You are successfully logged in.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user && (
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || "User"}
              </p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        )}

        <Button onClick={onLogout} variant="outline" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
