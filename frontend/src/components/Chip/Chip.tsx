import React from "react";
import { CloseIcon } from "../icons";
import { cn } from "@/utils/cn";

interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
  variant?: "default" | "outlined";
  className?: string;
}

const Chip = ({
  label,
  icon,
  onClick,
  onDelete,
  variant = "default",
  className,
}: ChipProps) => {
  const variantClasses = {
    default: "border border-purple-600 text-white",
    outlined: "border border-border text-slate-500",
  };

  const wrapperClasses = `rounded-2xl text-xs flex items-center justify-center py-1 px-2.5 w-fit ${variantClasses[variant]}`;

  return (
    <div
      className={cn(wrapperClasses, className)}
      onClick={onClick}
    >
      <span>
        {icon} {label}
      </span>
      {onDelete && (
        <CloseIcon className="size-3 cursor-pointer ml-2" onClick={onDelete} />
      )}
    </div>
  );
};

export default Chip;
