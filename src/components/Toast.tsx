import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { cn } from "../lib/utils";

interface ToastProps {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  description: string;
  className?: string;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    className: "border-green-200 bg-green-50 text-green-800",
  },
  error: {
    icon: XCircle,
    className: "border-red-200 bg-red-50 text-red-800",
  },
  warning: {
    icon: AlertCircle,
    className: "border-yellow-200 bg-yellow-50 text-yellow-800",
  },
  info: {
    icon: Info,
    className: "border-blue-200 bg-blue-50 text-blue-800",
  },
};

export function Toast({
  variant = "info",
  title,
  description,
  className,
}: ToastProps) {
  const config = toastConfig[variant];
  const Icon = config.icon;

  return (
    <Alert className={cn(config.className, className)}>
      <Icon className="h-4 w-4" />
      {title && <div className="font-medium">{title}</div>}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
