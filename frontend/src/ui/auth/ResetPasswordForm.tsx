"use client";
import { Button, Input } from "@/components";
import { useShowNoti } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define form schema with Zod
const formSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const ResetPasswordForm = ({ token }: { token: string | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showError, showSuccess } = useShowNoti();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  if (!token) {
    return (
      <div className="text-slate-100 text-center">
        <h2 className="text-2xl font-semibold mb-4">Invalid Reset Link</h2>
        <p>
          The password reset link is invalid or has expired. Please request a
          new link.
        </p>
        <div className="mt-6">
          <Link
            href="/auth/forgot-password"
            className="text-purple-400 hover:text-purple-300"
          >
            Request new password reset
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword: data.newPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const data = await response.json();
        showError({
          message: data.message || "Failed to reset password",
        });
        throw new Error(result.message || "Failed to reset password");
      }

      showSuccess({ message: "Password reset successful" });

      // Redirect to login page after successful reset
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } catch (error) {
      showError({
        message:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-slate-100">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Reset your password
      </h2>
      <p className="text-center text-slate-300 mb-6">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="password">
          <label htmlFor="newPassword">New Password</label>
          <Input
            {...register("newPassword")}
            type="password"
            className="w-[400px] mt-1 border border-slate-100 py-2"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="password mt-6">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            {...register("confirmPassword")}
            type="password"
            className="w-[400px] mt-1 border border-slate-100 py-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          className="w-full mt-6"
          label={isLoading ? "Resetting..." : "Reset Password"}
          disabled={isLoading}
          type="submit"
        />
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/auth"
          className="text-sm text-slate-300 hover:text-white hover:underline transition-all duration-200"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
