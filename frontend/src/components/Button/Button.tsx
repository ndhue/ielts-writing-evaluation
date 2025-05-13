import { cn } from "@/utils/cn";
import React, { ButtonHTMLAttributes, forwardRef, Ref } from "react";
import { CirclingSVG } from "../icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "data-testid"?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "icon";
  label?: string;
}
const buttonClsx =
  "button min-h-[32px] text-sm px-2.5 py-1.5 flex items-center justify-center gap-x-[6px] rounded-full transition-all duration-300 cursor-pointer";

const Button = forwardRef(
  (
    {
      disabled = false,
      children,
      label,
      onClick,
      className,
      variant = "primary",
      icon,
      type,
      form,
      loading,
      ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    const id = label ? label.replace(/\s/g, "-") : "";
    const checkClassByType = () => {
      const baseClasses = {
        primary:
          "border-2 border-purple-500 text-white bg-purple-500 hover:bg-purple-400",
        secondary:
          "border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-50",
        danger: "text-white",
        icon: "flex items-center justify-center min-h-[24px] min-w-[24px] p-[1px] border",
      };
      const disabledClasses = {
        primary: "cursor-not-allowed bg-purple-100",
        secondary: "cursor-not-allowed border-purple-100 text-purple-200",
        danger: "cursor-not-allowed bg-red-100",
        icon: "cursor-not-allowed bg-slate-300 text-white",
      };

      if (disabled) {
        return `${baseClasses[variant]} ${disabledClasses[variant] || ""}`;
      }

      return `${baseClasses[variant]}`;
    };

    return (
      <button
        form={form}
        className={cn(buttonClsx, checkClassByType(), className)}
        disabled={disabled}
        id={id}
        type={type}
        ref={ref}
        {...(!disabled && { onClick: onClick })}
        {...props}
      >
        {icon} {label} {children}
        {loading && (
          <span className="pb-[1.5px]">
            <CirclingSVG />
          </span>
        )}
      </button>
    );
  }
);

// Add display name
Button.displayName = "Button";

export default Button;
