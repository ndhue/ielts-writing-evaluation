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
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
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
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        showError({
          message: data.message || "Registration failed. Please try again.",
        });
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      showError({ message: `Registration error: ${error}` });
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
        <div className="name mt-6">
          <label htmlFor="name">Name</label>
          <Input
            {...register("name")}
            type="text"
            className="w-[400px] mt-1 border border-slate-100 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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

        <Button
          className="w-full mt-6"
          label={isLoading ? "Signing up..." : "Sign up"}
          disabled={isLoading}
          type="submit"
        />
      </form>

      <div className="flex gap-2 justify-center mt-4">
        <span className="text-sm text-slate-400">Already have an account?</span>
        <Link
          href="/auth"
          className="text-sm text-slate-300 hover:text-white hover:underline transition-all duration-200"
        >
          Sign in
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
          title="Registration Confirmation"
          message="Please check your email to confirm your registration. We've sent you a verification link that will expire in 10 minutes."
        />
      )}
    </div>
  );
};

export default SignUpForm;
