"use client";

import { Button } from "@/components";
import { useDisclosure } from "@/hooks";
import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePasswordDialog = () => {
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
        label="Change password"
        className="border-none hover:bg-white hover:text-purple-700 ml-auto"
        onClick={onOpen}
        type="button"
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
        <div ref={dialogRef} className="bg-white p-6 rounded-2xl shadow-xl">
          <ChangePasswordForm onClose={onClose} />
        </div>
      </div>
    </>
  );
};

export default ChangePasswordDialog;
