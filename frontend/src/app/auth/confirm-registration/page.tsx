"use client";
import { Button } from "@/components";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const ConfirmRegistrationPage = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const confirmRegistration = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (response.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Confirmation error:", error);
        setStatus("error");
      }
    };

    confirmRegistration();
  }, [token]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
      />

      <div className="flex flex-col justify-center items-center gap-8 min-h-screen p-4">
        <Image
          src="/images/big-logo.png"
          alt="logo"
          width={200}
          height={200}
          className="mx-auto rounded-md"
        />
        <div className="bg-slate-800 p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Account Confirmation
          </h1>

          {status === "loading" && (
            <div className="text-slate-300">
              Confirming your registration...
            </div>
          )}

          {status === "success" && (
            <>
              <div className="text-green-400 mb-6">
                Your account has been successfully confirmed!
              </div>
              <Button
                className="w-full"
                label="Continue to Login"
                onClick={() => router.push("/auth")}
              />
            </>
          )}

          {status === "error" && (
            <>
              <div className="text-red-400 mb-6">
                Registration confirmation failed. Please try again.
              </div>
              <Button
                className="w-full"
                label="Back to Sign Up"
                onClick={() => router.push("/auth/register")}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmRegistrationPage;
