import { Button } from "@/components";
import Image from "next/image";
import React from "react";

interface GoogleAuthButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  label,
  onClick,
  className = "",
}) => {
  return (
    <Button
      onClick={onClick}
      type="button"
      className={`flex items-center justify-center gap-2 bg-black hover:bg-gray-800 ${className}`}
    >
      <Image
        src="/images/google-icon.png"
        alt="Google"
        width={36}
        height={36}
      />
      <span>{label}</span>
    </Button>
  );
};

export default GoogleAuthButton;
