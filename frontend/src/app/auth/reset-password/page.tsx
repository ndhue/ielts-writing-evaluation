"use client";
import { ResetPasswordForm } from "@/ui/auth";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <Image
        src="/images/big-logo.png"
        alt="logo"
        width={200}
        height={200}
        className="mx-auto rounded-md"
      />
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
