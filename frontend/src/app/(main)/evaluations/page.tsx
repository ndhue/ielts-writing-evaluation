"use client";

import { useEssayEvaluation } from "@/hooks/useEssayEvaluation";
import {
  EvaluationCard,
  EvaluationsEmptyState,
  EvaluationsLoadingState,
  ScoreStatisticTable,
  ScoreSummaryTable,
} from "@/ui/evaluation";
import { format } from "date-fns";

const EvaluationsPage = () => {
  const {
    evaluations,
    evaluationStats,
    recentEvaluations,
    isLoadingEvaluations,
    isEvaluationsError,
  } = useEssayEvaluation();

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

  if (!evaluations || evaluations.length === 0) {
    return <EvaluationsEmptyState />;
  }

  // Format recent evaluations data for the ScoreSummaryTable
  const scoreHistory =
    recentEvaluations?.map((item) => ({
      testDate: format(new Date(item.date), "MMM dd, yyyy"),
      overall: item.score || 0,
    })) || [];

  return (
    <div className="my-8 h-[calc(100vh-128px)]">
      <h1 className="text-2xl font-bold mb-6">Your Writing Evaluations</h1>

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

          {recentEvaluations && recentEvaluations.length > 0 && (
            <ScoreSummaryTable scoreHistory={scoreHistory} />
          )}
        </div>

        <div className="order-2 lg:order-1 lg:col-span-2 h-[calc(100vh-120px)] overflow-y-auto">
          <div className="space-y-6"></div>
          {evaluations.map((evaluation) => (
            <EvaluationCard
              key={evaluation.id}
              id={evaluation.id}
              date={evaluation.created_at}
              topic={evaluation.topic || "Untitled Topic"}
              essay={evaluation.essay || "No essay provided"}
              score={evaluation.result?.band_scores?.overall?.score || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationsPage;
