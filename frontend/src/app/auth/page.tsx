import { SignInForm } from "@/ui/auth";
import Image from "next/image";

const AuthPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <Image
        src="/images/big-logo.png"
        alt="logo"
        width={200}
        height={200}
        className="mx-auto rounded-md"
      />
      <SignInForm />
    </div>
  );
};

export default AuthPage;
