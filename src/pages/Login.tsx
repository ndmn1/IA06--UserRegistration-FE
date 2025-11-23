import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout, FormField, AuthForm } from "../components";
import { loginSchema, type LoginFormData } from "../lib/validations";
import { useLogin } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
    // Redirect immediately after successful login
    navigate("/", { replace: true });
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      description="Welcome back! Please sign in to your account"
      footerText="Or"
      footerLink={{
        text: "create a new account",
        to: "/register",
      }}
    >
      <AuthForm
        onSubmit={handleSubmit(onSubmit)}
        submitText="Sign in"
        isLoading={isSubmitting || loginMutation.isPending}
      >
        <FormField
          label="Email address"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email?.message}
          autoComplete="email"
        />

        <FormField
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password?.message}
          autoComplete="current-password"
        />
      </AuthForm>
    </AuthLayout>
  );
}
