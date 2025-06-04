"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components";
import { FantasyIcon } from "@/components/icons";
import { useDisclosure } from "@/hooks";
import { cn } from "@/utils/cn";
import GenerateTopicForm from "./GenerateTopicForm";

const GenerateTopicDialog = () => {
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
        variant="icon"
        type="button"
        icon={<FantasyIcon />}
        label="Generate topic"
        className="border-none bg-purple-400 text-purple-600 px-2.5 py-1.5 rounded-full hover:bg-purple-300 hover:text-purple-500"
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
        <div ref={dialogRef} className="bg-white p-6 rounded-2xl shadow-xl">
          <GenerateTopicForm />
        </div>
      </div>
    </>
  );
};

export default GenerateTopicDialog;
