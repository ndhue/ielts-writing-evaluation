"use client";

import { Button } from "@/components";
import { useDisclosure } from "@/hooks";
import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";

const EmailNotiDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside the dialog
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <Button
        variant="secondary"
        label="Forgot your password?"
        className="text-sm text-slate-300 hover:text-white hover:underline transition-all duration-200 border-none hover:bg-transparent bg-transparent mx-auto mt-4"
        onClick={onOpen}
      />
      <div
        className={cn("fixed inset-0 bg-[#7A69D1] opacity-60 z-40", {
          hidden: !isOpen,
        })}
      />
      <div
        className={cn("fixed z-50 inset-0 flex items-center justify-center", {
          hidden: !isOpen,
        })}
      >
        <div ref={dialogRef} className="bg-white p-6 rounded-2xl shadow-xl text-slate-700 w-[400px]">
          <p className="font-bold text-2xl">Check your email</p>
          <p className="my-4 text-sm">
            We&apos;ve sent a confirmation link to your email. Please check your
            inbox to reset your password.
          </p>
          <Button
            variant="secondary"
            label="Resend email"
            className="rounded-md border-2 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default EmailNotiDialog;
