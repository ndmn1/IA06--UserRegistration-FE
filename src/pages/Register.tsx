import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout, FormField, AuthForm } from "../components";
import { registerSchema, type RegisterFormData } from "../lib/validations";
import { useRegister } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      reset();
      // Redirect to login page immediately after successful registration
      navigate("/login", { replace: true });
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Join us today! Create your account to get started"
      footerText="Or"
      footerLink={{
        text: "sign in to your existing account",
        to: "/login",
      }}
    >
      <AuthForm
        onSubmit={handleSubmit(onSubmit)}
        submitText="Create account"
        isLoading={isSubmitting || registerMutation.isPending}
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
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password?.message}
          description="Password must be at least 6 characters and contain both letters and numbers."
          autoComplete="new-password"
        />
      </AuthForm>
    </AuthLayout>
  );
}
