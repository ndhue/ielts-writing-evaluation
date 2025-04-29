"use client";
import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CriterionScoreCircleProps {
  score: number;
  maxScore?: number;
  color?: string;
}

export default function CriterionScoreCircle({
  score,
  maxScore = 9,
  color = "#8e2de2",
}: CriterionScoreCircleProps) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="w-24 h-24">
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#e6e6e6",
        })}
      >
        <div className="flex flex-col items-center justify-center text-sm">
          <div className="text-lg font-semibold text-black">
            {score.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500">/{maxScore.toFixed(1)}</div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
