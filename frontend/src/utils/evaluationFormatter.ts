import { AIEvaluation } from "@/hooks/useEssayEvaluation";

export interface TransformedEvaluation {
  overallScore: number;
  taskResponseScore: number;
  coherenceAndCohesionScore: number;
  lexicalResourceScore: number;
  grammaticalRangeAndAccuracyScore: number;
  taskResponseExplanation: string;
  coherenceAndCohesionExplanation: string;
  lexicalResourceExplanation: string;
  grammaticalRangeAndAccuracyExplanation: string;
  overallExplanation: string;
  strengths: string[];
  areasForImprovement: string[];
  strategiesForEnhancement: string[];
}

// Helper to clean up explanation text
const formatExplanation = (explanation: string): string => {
  if (!explanation) return "";

  return explanation
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("**"))
    .join("\n");
};

export const formatEvaluation = (
  rawData: AIEvaluation
): TransformedEvaluation => {
  const bandScores = rawData.band_scores || {};
  const feedback = rawData.feedback || {};
  
  // Get band scores with proper fallbacks for different field names
  const taskResponse = bandScores.task_response || {};
  const coherenceAndCohesion = bandScores.coherence_and_cohesion || {};
  const lexicalResource = bandScores.lexical_resource || {};
  const grammaticalRange = bandScores.grammatical_range_and_accuracy || {};
  const overall = bandScores.overall || {};

  return {
    overallScore: overall.score || 0,
    taskResponseScore: taskResponse.score || 0,
    coherenceAndCohesionScore: coherenceAndCohesion.score || 0,
    lexicalResourceScore: lexicalResource.score || 0,
    grammaticalRangeAndAccuracyScore: grammaticalRange.score || 0,

    taskResponseExplanation: formatExplanation(taskResponse.explanation || ""),
    coherenceAndCohesionExplanation: formatExplanation(
      coherenceAndCohesion.explanation || ""
    ),
    lexicalResourceExplanation: formatExplanation(
      lexicalResource.explanation || ""
    ),
    grammaticalRangeAndAccuracyExplanation: formatExplanation(
      grammaticalRange.explanation || ""
    ),
    overallExplanation: formatExplanation(overall.explanation || ""),

    // Handle feedback fields with proper fallbacks
    strengths: Array.isArray(feedback.strengths)
      ? feedback.strengths.filter((item) => item !== "No feedback available")
      : [],

    areasForImprovement: Array.isArray(feedback.areas_for_improvement)
      ? feedback.areas_for_improvement
      : [],

    strategiesForEnhancement: Array.isArray(feedback.strategies_for_enhancement)
      ? feedback.strategies_for_enhancement
      : [],
  };
};

export default formatEvaluation;
