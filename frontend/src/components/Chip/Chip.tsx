import { cn } from "@/utils/cn";
import { CloseIcon } from "../icons";

interface ChipProps {
  label: string;
  onClick?: () => void;
  onDelete?: () => void;
  variant?: "default" | "outlined";
  className?: string;
}

const Chip = ({
  label,
  onClick,
  onDelete,
  variant = "default",
  className,
}: ChipProps) => {
  const variantClasses = {
    default:
      "border border-purple-600 bg-purple-600 text-white hover:bg-purple-500",
    outlined: "border border-border text-slate-500 hover:bg-slate-50",
  };

  const wrapperClasses = `rounded-2xl text-xs flex items-center justify-center py-1 px-2.5 w-fit cursor-pointer transition-all duration-300 ${variantClasses[variant]}`;

  return (
    <div className={cn(wrapperClasses, className)} onClick={onClick}>
      <span className="max-w-[20ch] truncate truncate-ellipsis">{label}</span>
      {onDelete && (
        <CloseIcon className="size-3 cursor-pointer ml-2" onClick={onDelete} />
      )}
    </div>
  );
};

export default Chip;
