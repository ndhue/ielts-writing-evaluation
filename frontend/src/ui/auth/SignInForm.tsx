"use client";
import { Button, Input } from "@/components";
import Link from "next/link";
import EmailNotiDialog from "./EmailNotiDialog";

const SignInForm = () => {
  return (
    <div className="text-slate-100">
      <div className="email">
        <label htmlFor="email">Email</label>
        <Input
          name="email"
          type="email"
          className="w-[400px] mt-1 border border-slate-100 py-2"
        />
      </div>
      <div className="password mt-6">
        <label htmlFor="password">Password</label>
        <Input
          name="password"
          type="password"
          className="w-[400px] mt-1 border border-slate-100 py-2"
        />
      </div>

      <Button className="w-full mt-6" label="Sign in" />
      <EmailNotiDialog />
      <div className="flex gap-2 justify-center mt-2">
        <span className="text-sm text-slate-400">
          Don&apos;t have an account?{" "}
        </span>
        <Link
          href="/auth/signup"
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
