"use client";
import { Button } from "@/components";
import Link from "next/link";
import { useState, useEffect } from "react";

interface EmailNotiDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const EmailNotiDialog = ({ open, onClose, title, message }: EmailNotiDialogProps) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg max-w-md w-full p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
          <div className="flex justify-center mt-4">
            <div className="bg-slate-800 p-3 rounded-full">
            </div>
          </div>
          <p className="mt-4 text-slate-300">{message}</p>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <Button
            onClick={handleClose}
            label="Got it"
            className="w-full"
          />
          <Link href="/auth" className="text-center text-sm text-slate-400 hover:underline">
            Return to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailNotiDialog;
