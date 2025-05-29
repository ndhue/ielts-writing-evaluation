"use client";

import { useAuth, useShowNoti } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export interface Topic {
  _id: string;
  topic: string;
  description: string;
  is_generated: boolean;
  keywords: string[];
  created_by: string;
  created_at: string;
}

export function useTopics() {
  const { authFetch, isAuthenticated } = useAuth();
  const { showError, showSuccess } = useShowNoti();

  const {
    data: topics,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      if (!isAuthenticated) {
        return [];
      }

      try {
        const response = await authFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/topic/gettopicisgenerate`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch topics");
        }

        const result = await response.json();
        return result.data as Topic[];
      } catch (error) {
        console.error("Error fetching topics:", error);
        showError({
          message:
            error instanceof Error ? error.message : "Failed to fetch topics",
        });
        return [];
      }
    },
    enabled: isAuthenticated,
  });

  const removeTopic = async (topicId: string) => {
    if (!isAuthenticated) {
      showError({ message: "Please login to remove topics" });
      return false;
    }

    try {
      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/topic/${topicId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove topic");
      }

      showSuccess({ message: "Topic removed successfully" });

      // Trigger refetch to update the list
      refetch();

      return true;
    } catch (error) {
      console.error("Error removing topic:", error);
      showError({
        message:
          error instanceof Error ? error.message : "Failed to remove topic",
      });
      return false;
    }
  };

  return {
    topics,
    isLoading,
    isError,
    refetch,
    removeTopic,
  };
}

export default useTopics;
