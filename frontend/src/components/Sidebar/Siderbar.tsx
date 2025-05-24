"use client";

import { useAuth } from "@/hooks";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentIcon, HistoricalIcon, UserIcon } from "../icons";
import LogoutIcon from "../icons/LogoutIcon";

interface NavItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  matchPath: string;
  position?: "top" | "bottom";
}

// Define base navigation items that are always shown
const baseNavItems: NavItem[] = [
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
];

// Profile item only shown when authenticated
const profileItem: NavItem = {
  label: "Profile",
  href: "/profile",
  Icon: UserIcon,
  matchPath: "/profile",
  position: "bottom",
};

const Sidebar = () => {
  const pathname = usePathname() || "";
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Combine nav items based on auth state
  const navItems = [
    ...baseNavItems,
    ...(mounted && isAuthenticated ? [profileItem] : []),
  ];

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

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/auth");
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
          .filter((item) => item?.position !== "bottom")
          .map(renderNavItem)}
      </div>

      {/* Bottom nav items */}
      <div className="mt-auto flex flex-col gap-4 items-center">
        {mounted &&
          navItems
            .filter((item) => item?.position === "bottom")
            .map(renderNavItem)}

        {mounted &&
          (isAuthenticated ? (
            <div
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 text-purple-50 hover:text-purple-500 transition-colors cursor-pointer"
            >
              <LogoutIcon className="size-6" />
              <p className="text-xs">Logout</p>
            </div>
          ) : (
            <div
              onClick={handleLogin}
              className="flex flex-col items-center gap-1 text-purple-50 hover:text-purple-500 transition-colors cursor-pointer"
            >
              <UserIcon className="size-6" />
              <p className="text-xs">Login</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Sidebar;
