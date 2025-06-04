"use client";

import { CriterionScoreCircle, ScoreCircle } from "@/components";
import { useEssayEvaluation } from "@/hooks/useEssayEvaluation";
import { RadarChart } from "@/ui/evaluation";
import formatEvaluation from "@/utils/evaluationFormatter";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const Evaluation = () => {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Pass the ID from params to the hook
  const { evaluation, isLoadingEvaluation, isEvaluationError } =
    useEssayEvaluation(id);

  // Format evaluation data
  const formattedEvaluation = useMemo(() => {
    if (!evaluation) return null;
    return formatEvaluation(evaluation);
  }, [evaluation]);

  console.log(formattedEvaluation);

  if (isLoadingEvaluation) {
    return <div className="my-4 text-center py-8">Loading evaluation...</div>;
  }

  if (isEvaluationError || !evaluation || !formattedEvaluation) {
    return (
      <div className="my-4 text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Evaluation Not Found</h1>
        <p className="text-gray-600">
          The requested evaluation could not be found.
        </p>
      </div>
    );
  }

  // Use formatted evaluation data for rendering
  const {
    overallScore,
    taskResponseScore,
    coherenceAndCohesionScore,
    lexicalResourceScore,
    grammaticalRangeAndAccuracyScore,
    taskResponseExplanation,
    coherenceAndCohesionExplanation,
    lexicalResourceExplanation,
    grammaticalRangeAndAccuracyExplanation,
    overallExplanation,
    strengths,
    areasForImprovement,
    strategiesForEnhancement,
  } = formattedEvaluation;

  const criteriaScores = [
    {
      name: "Task Achievement",
      score: taskResponseScore,
      feedback: taskResponseExplanation,
    },
    {
      name: "Coherence & Cohesion",
      score: coherenceAndCohesionScore,
      feedback: coherenceAndCohesionExplanation,
    },
    {
      name: "Lexical Resource",
      score: lexicalResourceScore,
      feedback: lexicalResourceExplanation,
    },
    {
      name: "Grammar",
      score: grammaticalRangeAndAccuracyScore,
      feedback: grammaticalRangeAndAccuracyExplanation,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group transition-colors cursor-pointer hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to results
      </button>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Evaluation Results
      </h1>

      {/* Overall Score Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreCircle
            score={overallScore}
            circleClassName="size-32 md:size-40"
            textClassName="text-slate-500 font-semibold text-md text-center"
            scoreClassName="text-4xl font-bold"
            animate={true}
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Overall Band Score: {overallScore}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {overallExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Score Breakdown
        </h2>
        <div className="h-[350px] max-w-[700px] flex items-center justify-center mx-auto">
          <RadarChart
            scores={{
              taskAchievement: taskResponseScore,
              coherenceCohesion: coherenceAndCohesionScore,
              lexicalResource: lexicalResourceScore,
              grammar: grammaticalRangeAndAccuracyScore,
            }}
          />
        </div>
      </div>

      {/* Criterion Scores */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Criterion Scores
        </h2>

        {criteriaScores.map((criterion, index) => (
          <div
            key={index}
            className={`border-t border-gray-200 ${
              index === 0 ? "border-t-0" : ""
            } py-6`}
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex items-center justify-center w-full md:w-24">
                <CriterionScoreCircle score={criterion.score} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {criterion.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {criterion.feedback}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Detailed Feedback
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
            <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Strengths
            </h3>
            <ul className="list-none mt-3 text-green-700 space-y-3">
              {strengths.length > 0 ? (
                strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block bg-green-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                    <span>{strength}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start">
                  <span className="inline-block bg-green-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                  <span>No specific strengths mentioned</span>
                </li>
              )}
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm">
            <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Areas for Improvement
            </h3>
            <ul className="list-none mt-3 text-red-700 space-y-3">
              {areasForImprovement.length > 0 ? (
                areasForImprovement.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block bg-red-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                    <span>{area}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start">
                  <span className="inline-block bg-red-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                  <span>No specific areas for improvement mentioned</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {strategiesForEnhancement.length > 0 && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              Strategies for Enhancement
            </h3>
            <ul className="list-none mt-3 text-blue-700 space-y-3">
              {strategiesForEnhancement.map((strategy, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block bg-blue-200 rounded-full h-1.5 w-1.5 mt-2 mr-2"></span>
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Evaluation;
