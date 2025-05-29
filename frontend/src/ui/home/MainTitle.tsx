"use client";
import { useAuth } from "@/hooks";
import Link from "next/link";

const MainTitle = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-purple-50 rounded-3xl flex flex-col gap-3 items-center justify-center p-8 w-full">
      <h1 className="text-3xl font-bold">IELTS Writing Task 2 Essay Checker</h1>
      <p>
        Write with confidence — get feedback, fix mistakes, and boost your
        score!
      </p>
      {isAuthenticated ? (
        <div className="flex gap-2 items-center text-sm">
          <div className="border border-purple-500 text-purple-500 py-1 px-3 rounded-md">
            Hello
          </div>
          <span>— Ready to improve your score?</span>
        </div>
      ) : (
        <div className="flex gap-2 items-center text-sm">
          <div className="border border-purple-400 text-purple-500 py-1 px-3 rounded-md">
            Guest
          </div>
          <span>
            — Ready to shine?{" "}
            <Link
              href="/auth"
              className="relative font-bold after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300"
            >
              Log in
            </Link>{" "}
            and let&apos;s go!
          </span>
        </div>
      )}
    </div>
  );
};

export default MainTitle;
