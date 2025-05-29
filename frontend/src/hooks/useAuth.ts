"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShowNoti } from "./useShowNoti";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { showError } = useShowNoti();

  // Set mounted state when component mounts
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Initialize user from localStorage on component mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Check if token is expired and refresh if needed
  const getValidToken = async () => {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem("token");
    if (!token) return null;

    // Simple check if token might be expired
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));

      // Check if token is expired
      if (payload.exp * 1000 < Date.now()) {
        // Token expired, try to refresh
        return refreshToken();
      }

      return token;
    } catch (error) {
      console.error("Error decoding token", error);
      return refreshToken();
    }
  };

  const refreshToken = async () => {
    if (typeof window === "undefined") return null;

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data.token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
      return null;
    }
  };

  const login = (userData: User, token: string, refreshToken: string) => {
    if (typeof window === "undefined") return;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    if (typeof window === "undefined") return;

    const refreshToken = localStorage.getItem("refreshToken");

    // Clear local storage first for better UX
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);

    if (refreshToken) {
      // Fire and forget - don't wait for response
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }).catch((error) => {
        console.error("Error during logout", error);
      });
    }
  };

  // Authenticated API request helper
  const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = await getValidToken();

    if (!token) {
      showError({ message: "Authentication required" });
      router.push("/auth");
      throw new Error("Authentication required");
    }

    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
      Authorization: `Bearer ${token}`,
    };

    // Only add Content-Type if not FormData
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  return {
    user,
    loading,
    login,
    logout,
    authFetch,
    getValidToken,
    isAuthenticated: mounted && !!user,
  };
}

export default useAuth;
