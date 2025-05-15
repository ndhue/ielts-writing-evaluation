import { cn } from "@/utils/cn";
import { ComponentProps, ReactNode, forwardRef } from "react";

export interface InputProps extends ComponentProps<"input"> {
  isError?: boolean;
  errorMessage?: string;
  icon?: ReactNode;
}

const Input = forwardRef(
  ({ isError, errorMessage, icon, className, ...props }: InputProps, ref) => {
    return (
      <>
        <div className="relative w-full">
          <input
            ref={(inputRef) => {
              if (typeof ref === "function") {
                ref(inputRef);
              } else if (ref) {
                ref.current = inputRef;
              }
            }}
            className={cn(
              "w-full rounded-[10px] text-sm outline-none border border-border p-1.5",
              {
                "bg-slate-50 text-slate-400": props.disabled,
                "border-red-400": isError,
                "border-slate-300 ": !isError,
              },
              className
            )}
            type="text"
            {...props}
          />
          {icon && (
            <div className="absolute top-0 right-0 h-full flex items-center px-2 text-gray-400">
              {icon}
            </div>
          )}
        </div>

        {errorMessage && (
          <span className="block text-red-400 text-sm mt-1">
            {errorMessage}
          </span>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
