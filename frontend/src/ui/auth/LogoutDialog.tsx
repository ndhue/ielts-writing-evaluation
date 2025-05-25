"use client";
import { Button } from "@/components";
import { useEffect, useRef } from "react";

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutDialog = ({ open, onClose, onConfirm }: LogoutDialogProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current === e.target && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when dialog is open
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div ref={overlayRef} className="fixed inset-0 bg-[#7A69D1] opacity-60" />
      <div className="relative z-10 max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-4">
          Confirm Logout
        </h2>
        <p className="text-gray-300 mb-6">Are you sure you want to log out?</p>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            label="Cancel"
            onClick={onClose}
            className="border border-purple-600 text-purple-600"
          />
          <Button variant="primary" label="Logout" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
