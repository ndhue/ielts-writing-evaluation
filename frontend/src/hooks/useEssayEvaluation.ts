"use client";

import { useAuth, useShowNoti } from "@/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useEssayEvaluation(essayId?: string) {
  const { authFetch, isAuthenticated } = useAuth();
  const { showError } = useShowNoti();
  const queryClient = useQueryClient();
  const [currentEvaluation, setCurrentEvaluation] =
    useState<AIEvaluation | null>(null);

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

  // Get evaluation history
  const {
    data: evaluationsData,
    isLoading: isLoadingEvaluations,
    isError: isEvaluationsError,
    refetch: refetchEvaluations,
  } = useQuery({
    queryKey: ["evaluations"],
    queryFn: async () => {
      if (!isAuthenticated) return null;

      try {
        const response = await authFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/getFeedbackHistory`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch evaluations");
        }

        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Fetch evaluations error:", error);
        throw error;
      }
    },
    enabled: isAuthenticated,
  });

  // Extract data from the query result
  const evaluations = (evaluationsData?.data as EssayResult[]) || [];
  const evaluationStats =
    (evaluationsData?.stats as EssaySubmissionResult) || null;
  const recentEvaluations =
    (evaluationsData?.recent as RecentSubmission[]) || [];

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
        const evaluationData = result.data.result || null;

        return evaluationData as AIEvaluation;
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
    evaluation,
    isLoadingEvaluation,
    isEvaluationError,
    evaluationError,
    isAuthenticated,
  };
}

export default useEssayEvaluation;
