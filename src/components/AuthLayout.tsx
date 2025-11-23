import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText?: string;
  footerLink?: {
    text: string;
    to: string;
  };
  showHomeLink?: boolean;
}

export function AuthLayout({
  title,
  description,
  children,
  footerText,
  footerLink,
  showHomeLink = true,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h1>
        {footerText && footerLink && (
          <p className="mt-2 text-center text-sm text-gray-600">
            {footerText}{" "}
            <Link
              to={footerLink.to}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {footerLink.text}
            </Link>
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {title}
            </CardTitle>
            <CardDescription className="text-center">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {children}

            {showHomeLink && (
              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  ← Back to home
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
