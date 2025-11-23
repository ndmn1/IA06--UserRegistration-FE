import { useState } from "react";
import type { ReactNode } from "react";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
  description?: string;
  showPasswordToggle?: boolean;
  autoComplete?: string;
}

export function FormField<T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  description,
  showPasswordToggle = false,
  autoComplete,
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="space-y-2">
      <Label htmlFor={name as string}>{label}</Label>
      <div className="relative">
        <Input
          {...register(name)}
          id={name as string}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            showPasswordToggle && "pr-10",
            error && "border-red-500 focus-visible:ring-red-500",
          )}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {description && !error && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

interface AuthFormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  isLoading?: boolean;
  secondaryButton?: {
    text: string;
    onClick: () => void;
    variant?: "outline" | "secondary";
  };
}

export function AuthForm({
  children,
  onSubmit,
  submitText,
  isLoading = false,
  secondaryButton,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}

      <div className="space-y-3">
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
          )}
          {submitText}
        </Button>

        {secondaryButton && (
          <Button
            type="button"
            variant={secondaryButton.variant || "outline"}
            onClick={secondaryButton.onClick}
            disabled={isLoading}
            className="w-full"
          >
            {secondaryButton.text}
          </Button>
        )}
      </div>
    </form>
  );
}
