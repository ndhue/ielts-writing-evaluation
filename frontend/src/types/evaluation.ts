export interface BandScore {
  score: number;
  explanation: string;
}

export interface BandScores {
  task_response: BandScore;
  coherence_and_cohesion: BandScore;
  lexical_resource: BandScore;
  grammatical_range_and_accuracy: BandScore;
  overall: BandScore;
}

export interface EvaluationFeedback {
  strengths: string[];
  areas_for_improvement: string[];
  strategies_for_enhancement: string[];
}

export interface EvaluationResult {
  band_scores: BandScores;
  feedback: EvaluationFeedback;
}
