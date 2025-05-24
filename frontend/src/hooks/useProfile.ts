"use client";

import { useAuth, useShowNoti } from "@/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

// Define schema outside
export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  target: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;

export interface ProfileData {
  name: string;
  email: string;
  target?: number | null;
  description?: string | null;
  avatarUrl?: string | null;
}

interface ProfileUpdateData {
  name?: string;
  target?: number | null;
  description?: string | null;
}

export function useProfile() {
  const { authFetch } = useAuth();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useShowNoti();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  // Query to fetch profile data
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await authFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/getProfile`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        return data as ProfileData;
      } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
    },
    retry: 1,
    refetchOnMount: true,
  });

  // Mutation to update profile data
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-profile`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      return await response.json();
    },
    onSuccess: () => {
      showSuccess({ message: "Profile updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      showError({ message: error.message });
    },
  });

  // Mutation to update avatar
  const updateAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-avatar`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update avatar");
      }

      return await response.json();
    },
    onSuccess: () => {
      showSuccess({ message: "Avatar updated successfully" });
      // Invalidate the profile query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      showError({ message: error.message });
    },
  });

  // Mutation to remove avatar
  const removeAvatarMutation = useMutation({
    mutationFn: async () => {
      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/remove-avatar`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove avatar");
      }

      return await response.json();
    },
    onSuccess: () => {
      showSuccess({ message: "Avatar removed successfully" });
      // Invalidate the profile query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      showError({ message: error.message });
    },
  });

  // Mutation to change password
  const changePasswordMutation = useMutation({
    mutationFn: async (data: PasswordFormValues) => {
      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
        {
          method: "PUT",
          body: JSON.stringify({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

      return await response.json();
    },
    onSuccess: () => {
      showSuccess({ message: "Password changed successfully!" });
      setIsPasswordDialogOpen(false);
    },
    onError: (error: Error) => {
      showError({ message: error.message });
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isUpdating: updateProfileMutation.isPending,
    isUploadingAvatar: updateAvatarMutation.isPending,
    isRemovingAvatar: removeAvatarMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile: updateProfileMutation.mutate,
    updateAvatar: updateAvatarMutation.mutate,
    removeAvatar: removeAvatarMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    refetch: profileQuery.refetch,
    isPasswordDialogOpen,
    openPasswordDialog: () => setIsPasswordDialogOpen(true),
    closePasswordDialog: () => setIsPasswordDialogOpen(false),
  };
}

export default useProfile;
