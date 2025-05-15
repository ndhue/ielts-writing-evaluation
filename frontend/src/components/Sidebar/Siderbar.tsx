"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DocumentIcon, HistoricalIcon } from "../icons";
import LogoutIcon from "../icons/LogoutIcon";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

const Siderbar = () => {
  const pathname = usePathname() || "";

  const isTopicsActive = pathname.includes("/topics");
  const isEvaluationActive = pathname.includes("/evaluations");

  const menuItemClass = (isActive: boolean) =>
    cn("flex flex-col items-center gap-1", {
      "text-purple-500 font-medium": isActive,
      "text-purple-50": !isActive,
    });

  return (
    <section className="fixed top-0 h-screen bg-background w-20 py-8 flex flex-col items-center">
      <Link href="/" className="cursor-pointer">
        <Image
          src={"/icon.png"}
          alt="logo"
          width={50}
          height={50}
          className="rounded-md"
        />
      </Link>
      <div className="flex flex-col gap-8 items-center mt-8">
        <Link href="/evaluations" className={menuItemClass(isEvaluationActive)}>
          <DocumentIcon
            className={cn("size-7", {
              "text-purple-500": isEvaluationActive,
            })}
          />
          <p className="text-xs">Feedbacks</p>
        </Link>
        <Link href="/topics" className={menuItemClass(isTopicsActive)}>
          <HistoricalIcon
            className={cn("size-7", {
              "text-purple-500": isTopicsActive,
            })}
          />
          <p className="text-xs">Topics</p>
        </Link>
      </div>
      {/* Logout at bottom */}
      <button
        onClick={() => {
          // Add logout functionality here
          console.log("Logging out...");
        }}
        className="mt-auto flex flex-col items-center gap-1 text-purple-50 hover:text-purple-500 transition-colors cursor-pointer"
      >
        <LogoutIcon className="size-6" />
        <p className="text-xs">Logout</p>
      </button>
    </section>
  );
};

export default Siderbar;
