// src/components/CustomToast.tsx
import React from "react";
import { ErrorIcon, SuccessIcon, WarningIcon, InfoIcon } from "../icons";

interface CustomToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

const bgColors = {
  success: "bg-success-100",
  error: "bg-error-100",
  warning: "bg-warning-100",
  info: "bg-info-100",
};

const titleColors = {
  success: "text-success-600",
  error: "text-error-600",
  warning: "text-warning-600",
  info: "text-info-600",
};

const messageColors = {
  success: "text-success-500",
  error: "text-error-500",
  warning: "text-warning-500",
  info: "text-info-500",
};

const iconMap = {
  success: <SuccessIcon className="size-10" />,
  error: <ErrorIcon className="size-10" />,
  warning: <WarningIcon className="size-10" />,
  info: <InfoIcon className="size-10" />,
};

const titleMap = {
  success: "SUCCESS!",
  error: "ERROR!",
  warning: "WARNING!",
  info: "INFO!",
};

const CustomToast = ({ type, message }: CustomToastProps) => {
  return (
    <div className={`flex items-center w-full p-4 rounded-md ${bgColors[type]} gap-3`}>
      {iconMap[type]}
      <div>
        <div className={`font-bold text-base ${titleColors[type]}`}>
          {titleMap[type]}
        </div>
        <div className={`text-sm ${messageColors[type]}`}>{message}</div>
      </div>
    </div>
  );
};

export default CustomToast;
