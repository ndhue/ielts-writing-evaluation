"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { DocumentIcon, HistoricalIcon, UserIcon } from "../icons";
import LogoutIcon from "../icons/LogoutIcon";
import React from "react";

const navItems = [
  {
    label: "Feedbacks",
    href: "/evaluations",
    Icon: DocumentIcon,
    matchPath: "/evaluations",
  },
  {
    label: "Topics",
    href: "/topics",
    Icon: HistoricalIcon,
    matchPath: "/topics",
  },
  {
    label: "Profile",
    href: "/profile",
    Icon: UserIcon,
    matchPath: "/profile",
    position: "bottom",
  },
];

const Sidebar = () => {
  const pathname = usePathname() || "";

  const renderNavItem = ({
    label,
    href,
    Icon,
    matchPath,
  }: (typeof navItems)[number]) => {
    const isActive = pathname.includes(matchPath);

    return (
      <Link
        key={href}
        href={href}
        className={cn("flex flex-col items-center gap-1", {
          "text-purple-500 font-medium": isActive,
          "text-purple-50": !isActive,
        })}
      >
        <Icon className={cn("size-7", { "text-purple-500": isActive })} />
        <p className="text-xs">{label}</p>
      </Link>
    );
  };

  return (
    <section className="fixed top-0 h-screen bg-background w-20 py-8 flex flex-col items-center">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/icon.png"
          alt="logo"
          width={50}
          height={50}
          className="rounded-md"
        />
      </Link>

      {/* Top nav items */}
      <div className="flex flex-col gap-8 items-center mt-8">
        {navItems
          .filter((item) => item.position !== "bottom")
          .map(renderNavItem)}
      </div>

      {/* Bottom nav items */}
      <div className="mt-auto flex flex-col gap-4 items-center">
        {navItems
          .filter((item) => item.position === "bottom")
          .map(renderNavItem)}

        <div
          onClick={() => {
            console.log("Logging out...");
          }}
          className="flex flex-col items-center gap-1 text-purple-50 hover:text-purple-500 transition-colors cursor-pointer"
        >
          <LogoutIcon className="size-6" />
          <p className="text-xs">Logout</p>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
