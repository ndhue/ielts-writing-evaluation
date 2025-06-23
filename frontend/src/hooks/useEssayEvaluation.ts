"use client";

import { useAuth, useShowNoti } from "@/hooks";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface EssaySubmission {
  topic: string;
  essay: string;
}

export interface BandScore {
  score: number;
  explanation: string;
}

export interface AIEvaluation {
  band_scores: {
    overall: BandScore;
    task_response: BandScore;
    coherence_and_cohesion: BandScore;
    lexical_resource: BandScore;
    grammatical_range_and_accuracy: BandScore;
  };
  feedback: {
    strengths: string[];
    areas_for_improvement: string[];
    strategies_for_enhancement: string[];
  };
  improvement: {
    comparison_summary: string;
    improved_essay: string;
  };
}

export interface EssayResult {
  id: string;
  topic: string;
  essay: string;
  result: AIEvaluation;
  created_at: string;
}

export interface EssaySubmissionResult {
  average: number;
  highest: number;
  lowest: number;
  total: number;
}

export interface RecentSubmission {
  date: string;
  score: number;
}

export interface EssayFilters {
  search?: string;
  sortBy?: "date" | "score";
  sortOrder?: "asc" | "desc";
  fromDate?: string;
  toDate?: string;
}

export function useEssayEvaluation(essayId?: string) {
  const { authFetch, isAuthenticated } = useAuth();
  const { showError } = useShowNoti();
  const queryClient = useQueryClient();
  const [currentEvaluation, setCurrentEvaluation] =
    useState<AIEvaluation | null>(null);
  const [filters, setFilters] = useState<EssayFilters>({
    sortBy: "date",
    sortOrder: "desc",
  });

  // Submit essay mutation
  const submitEssayMutation = useMutation({
    mutationFn: async (data: EssaySubmission) => {
      try {
        // Use authFetch for authenticated users, regular fetch for non-authenticated
        let response;
        if (isAuthenticated) {
          response = await authFetch(
            `${process.env.NEXT_PUBLIC_API_URL}/essay`,
            {
              method: "POST",
              body: JSON.stringify(data),
            }
          );
        } else {
          response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/essay`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit essay");
        }

        const result = await response.json();

        if (isAuthenticated) {
          // For authenticated users with saved results
          if (result.success && result.result) {
            const essayId = result.result.essay._id;
            queryClient.invalidateQueries({ queryKey: ["evaluations"] });

            const aiOutput = result.result.aiPrediction.ai_output;
            // Format the evaluation data

            return {
              evaluation: aiOutput,
              essayId,
            };
          }
        } else {
          // For non-authenticated users without saved results
          if (result.success && result.ai_output) {
            // Format the evaluation data
            return {
              evaluation: result.ai_output,
              essayId: null,
            };
          }
        }

        throw new Error("No evaluation was generated");
      } catch (error) {
        console.error("Submit essay error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setCurrentEvaluation(data.evaluation);
    },
    onError: (error: Error) => {
      showError({ message: error.message });
    },
  });

  // Infinite query for evaluations
  const {
    data: evaluationsData,
    isLoading: isLoadingEvaluations,
    isError: isEvaluationsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchEvaluations,
  } = useInfiniteQuery({
    queryKey: ["evaluations", filters],
    queryFn: async ({ pageParam = 1 }) => {
      if (!isAuthenticated) return null;
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
      if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder);
      if (filters.fromDate) queryParams.append("fromDate", filters.fromDate);
      if (filters.toDate) queryParams.append("toDate", filters.toDate);
      queryParams.append("page", pageParam.toString());
      queryParams.append("limit", "10");
      const url = `${process.env.NEXT_PUBLIC_API_URL}/getFeedbackHistory?${queryParams}`;
      const response = await authFetch(url);
      if (!response.ok) throw new Error("Failed to fetch evaluations");
      return await response.json();
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination?.hasMore) return undefined;
      return (lastPage.pagination.page || 1) + 1;
    },
    initialPageParam: 1,
    enabled: isAuthenticated,
  });

  const evaluations: EssayResult[] =
    evaluationsData?.pages.flatMap((p) => p?.data || []) || [];
  const evaluationStats = evaluationsData?.pages[0]?.stats || null;
  const recentEvaluations: RecentSubmission[] =
    evaluationsData?.pages[0]?.recent || [];

  // Get a specific evaluation by ID
  const {
    data: evaluation,
    isLoading: isLoadingEvaluation,
    isError: isEvaluationError,
    error: evaluationError,
  } = useQuery({
    queryKey: ["evaluation", essayId],
    queryFn: async () => {
      if (!isAuthenticated || !essayId) {
        return null;
      }

      try {
        const response = await authFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/getFeedbackHistoryDetail?historyId=${essayId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch evaluation");
        }

        const result = await response.json();

        return result.data as EssayResult;
      } catch (error) {
        console.error("Fetch evaluation error:", error);
        throw error;
      }
    },
    enabled: isAuthenticated && !!essayId,
  });

  // Clear evaluation when component unmounts or when essayId changes
  useEffect(() => {
    return () => {
      setCurrentEvaluation(null);
    };
  }, [essayId]);

  // Update filters function
  const updateFilters = (newFilters: Partial<EssayFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return {
    submitEssay: submitEssayMutation.mutate,
    isSubmitting: submitEssayMutation.isPending,
    currentEvaluation,
    evaluations,
    evaluationStats,
    recentEvaluations,
    isLoadingEvaluations,
    isEvaluationsError,
    refetchEvaluations,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    evaluation,
    isLoadingEvaluation,
    isEvaluationError,
    evaluationError,
    isAuthenticated,
    filters,
    updateFilters,
  };
}

export default useEssayEvaluation;
