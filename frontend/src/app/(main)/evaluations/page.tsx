"use client";

import { useEssayEvaluation } from "@/hooks/useEssayEvaluation";
import {
  EssayFilters,
  EvaluationCard,
  EvaluationsEmptyState,
  EvaluationsLoadingState,
  ScoreStatisticTable,
  ScoreSummaryTable,
} from "@/ui/evaluation";
import { format } from "date-fns";
import { useCallback, useEffect, useRef } from "react";

const EvaluationsPage = () => {
  const {
    evaluations,
    evaluationStats,
    recentEvaluations,
    isLoadingEvaluations,
    isEvaluationsError,
    filters,
    updateFilters,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEssayEvaluation();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  if (isLoadingEvaluations) {
    return <EvaluationsLoadingState />;
  }

  if (isEvaluationsError) {
    return (
      <div className="my-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Error Loading Evaluations</h1>
        <p className="text-gray-600">
          There was a problem loading your evaluations.
        </p>
      </div>
    );
  }

  // Format recent evaluations data for the ScoreSummaryTable
  const scoreHistory =
    recentEvaluations?.map((item) => ({
      testDate: format(new Date(item.date), "MMM dd, yyyy"),
      overall: item.score || 0,
    })) || [];

  return (
    <div className="my-8 h-[calc(100vh-128px)]">
      <h1 className="text-2xl font-bold mb-4">Your Writing Evaluations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="order-1 lg:order-2 lg:col-span-1 space-y-6">
          {/* Statistics Tables */}
          {evaluationStats && (
            <ScoreStatisticTable
              highest={evaluationStats.highest || 0}
              lowest={evaluationStats.lowest || 0}
              average={evaluationStats.average || 0}
              totalEssays={evaluationStats.total || 0}
            />
          )}

          {recentEvaluations && (
            <ScoreSummaryTable scoreHistory={scoreHistory} />
          )}
        </div>

        <div className="order-2 lg:order-1 lg:col-span-2">
          {/* Filter component */}
          <div className="mb-4">
            <EssayFilters filters={filters} updateFilters={updateFilters} />
          </div>

          {/* Essays list or No Results Message */}
          {evaluations.length > 0 ? (
            <div className="h-[calc(100vh-370px)] overflow-y-auto">
              <div className="space-y-6">
                {evaluations.map((evaluation, idx) => (
                  <div
                    key={evaluation.id}
                    ref={
                      idx === evaluations.length - 1 ? lastItemRef : undefined
                    }
                  >
                    <EvaluationCard
                      id={evaluation.id}
                      date={evaluation.created_at}
                      topic={evaluation.topic || "Untitled Topic"}
                      essay={evaluation.essay || "No essay provided"}
                      score={
                        evaluation.result?.band_scores?.overall?.score || 0
                      }
                    />
                  </div>
                ))}
                {isFetchingNextPage && (
                  <div className="py-4 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading more...</p>
                  </div>
                )}
                {!hasNextPage && evaluations.length > 0 && (
                    <div className="text-center py-4 text-gray-500">
                    No more evaluations to load
                    </div>
                )}
              </div>
            </div>
          ) : (
            <EvaluationsEmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluationsPage;
