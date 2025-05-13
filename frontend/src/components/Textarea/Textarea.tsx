import { cn } from "@/utils/cn";
import { ComponentProps, forwardRef } from "react";

export interface TextareaProps extends ComponentProps<"textarea"> {
  isError?: boolean;
  errorMessage?: string;
  resize?: boolean;
}

const Textarea = forwardRef(
  (
    {
      isError,
      errorMessage,
      className,
      resize = true,
      ...props
    }: TextareaProps,
    ref: React.Ref<HTMLTextAreaElement | null>
  ) => {
    return (
      <>
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-[10px] text-sm outline-none border border-border p-1.5",
            {
              "bg-slate-50 text-slate-400": props.disabled,
              "border-red-400 ": isError,
              "border-slate-300 ": !isError,
              "resize-none overflow-hidden": !resize,
            },
            className
          )}
          {...props}
        />

        {errorMessage && (
          <span className="text-red-400 text-sm">{errorMessage}</span>
        )}
      </>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
