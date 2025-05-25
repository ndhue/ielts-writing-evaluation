"use client";
import { Button, Input } from "@/components";
import { useShowNoti } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EmailNotiDialog from "./EmailNotiDialog";

// Define form schema with Zod
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { showError } = useShowNoti();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
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
        throw new Error(result.message || "Failed to process request");
      }

      // Show success dialog
      setShowDialog(true);
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
        Forgot your password?
      </h2>
      <p className="text-center text-slate-300 mb-6">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </p>

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

        <Button
          className="w-full mt-6"
          label={isLoading ? "Sending..." : "Send reset link"}
          disabled={isLoading}
          type="submit"
        />
      </form>

      <div className="flex gap-2 justify-center mt-4">
        <span className="text-sm text-slate-400">Remember your password?</span>
        <Link
          href="/auth"
          className="text-sm text-slate-300 hover:text-white hover:underline transition-all duration-200"
        >
          Back to login
        </Link>
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-slate-300 hover:text-white hover:underline transition-all duration-200"
        >
          Back to Homepage
        </Link>
      </div>

      {showDialog && (
        <EmailNotiDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          title="Password Reset Email Sent"
          message="Please check your email for instructions to reset your password. If you don't receive an email within a few minutes, please check your spam folder."
        />
      )}
    </div>
  );
};

export default ForgotPasswordForm;
