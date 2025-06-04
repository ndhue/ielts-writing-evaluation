"use client";
import { Button, Input } from "@/components";
import { useAuth, useShowNoti } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define form schema with Zod
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showError, showSuccess } = useShowNoti();
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const data = await response.json();
        showError({
          message: data.message || "Login failed. Please try again.",
        });
        throw new Error(result.message || "Login failed");
      }

      // Use our auth hook to handle login and token storage
      login(result.user, result.token, result.refreshToken);

      showSuccess({ message: "Login successful" });

      // Redirect to dashboard or home page
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      showError({
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-slate-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="email">
          <label htmlFor="email">Email</label>
          <Input
            {...register("email")}
            type="email"
            className="w-[400px] mt-1 border border-slate-100 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="password mt-6">
          <label htmlFor="password">Password</label>
          <Input
            {...register("password")}
            type="password"
            className="w-[400px] mt-1 border border-slate-100 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="text-right mt-1">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-slate-300 hover:text-white hover:underline transition-all duration-200"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          className="w-full mt-6"
          label={isLoading ? "Signing in..." : "Sign in"}
          disabled={isLoading}
          type="submit"
        />
      </form>

      <div className="flex gap-2 justify-center mt-4">
        <span className="text-sm text-slate-400">
          Don&apos;t have an account?{" "}
        </span>
        <Link
          href="/auth/register"
          className="text-sm text-slate-300 hover:text-white hover:underline transition-all duration-200"
        >
          Sign up
        </Link>
      </div>
      <div className="mt-2 text-center">
        <Link
          href="/"
          className="text-sm text-slate-300 hover:text-white hover:underline transition-all duration-200"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
