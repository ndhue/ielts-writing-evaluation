import { ForgotPasswordForm } from "@/ui/auth";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

const ForgotPasswordPage = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
      />
      <div className="flex flex-col justify-center items-center gap-8">
        <Image
          src="/images/big-logo.png"
          alt="logo"
          width={200}
          height={200}
          className="mx-auto rounded-md"
        />
        <ForgotPasswordForm />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
