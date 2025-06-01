"use client";

import { useEssayEvaluation } from "@/hooks/useEssayEvaluation";
import {
  EvaluationCard,
  EvaluationsEmptyState,
  EvaluationsLoadingState,
} from "@/ui/evaluation";

const EvaluationsPage = () => {
  const { evaluations, isLoadingEvaluations, isEvaluationsError } =
    useEssayEvaluation();

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

  return (
    <div className="my-8">
      <h1 className="text-2xl font-bold mb-6">Your Writing Evaluations</h1>
      <div className="space-y-6">
        {evaluations.map((evaluation) => (
          <EvaluationCard
            key={evaluation.id}
            id={evaluation.id}
            date={evaluation.created_at}
            topic={evaluation.topic || "Untitled Topic"}
            essay={evaluation.essay || "No essay provided"}
            score={evaluation.result.band_scores.overall.score || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default EvaluationsPage;
