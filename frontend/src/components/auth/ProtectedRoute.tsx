"use client";

import { useAuth } from "@/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait until auth state is loaded
    if (!loading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        // Save the current URL to redirect back after login
        sessionStorage.setItem("redirectAfterLogin", pathname);
        router.push("/");
      }
    }
  }, [isAuthenticated, loading, router, pathname]);

  // Show nothing while loading or redirecting
  if (loading || !isAuthenticated) {
    return null; // Or return a loading spinner
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
