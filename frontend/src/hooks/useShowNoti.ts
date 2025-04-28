import { CustomToast } from "@/components";
import { toast, ToastOptions } from "react-toastify";

interface CustomToastOptions extends Partial<ToastOptions> {
  message: string;
}

const defaultOptions: Partial<ToastOptions> = {
  autoClose: 3000,
  position: "top-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  style: {
    padding: 0,
  },
};

export const useShowNoti = () => {
  const showSuccess = (options: CustomToastOptions) => {
    toast(CustomToast({ type: "success", message: options.message }), {
      ...defaultOptions,
      ...options,
    });
  };

  const showError = (options: CustomToastOptions) => {
    toast(CustomToast({ type: "error", message: options.message }), {
      ...defaultOptions,
      ...options,
    });
  };

  const showWarning = (options: CustomToastOptions) => {
    toast(CustomToast({ type: "warning", message: options.message }), {
      ...defaultOptions,
      ...options,
    });
  };

  const showInfo = (options: CustomToastOptions) => {
    toast(CustomToast({ type: "info", message: options.message }), {
      ...defaultOptions,
      ...options,
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default useShowNoti;
