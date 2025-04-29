"use client";

import { cn } from "@/utils/cn";
import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

interface ScoreCircleProps {
  score: number;
  circleClassName?: string;
  textClassName?: string;
}

export default function ScoreCircle({
  score,
  circleClassName,
  textClassName,
}: ScoreCircleProps) {
  const percentage = (score / 9) * 100;

  return (
    <div className="flex flex-col gap-2">
      <p className={cn("text-slate-500 font-semibold text-md", textClassName)}>
        OVERALL BAND SCORE
      </p>
      <div
        className={cn(
          "w-40 h-40 flex flex-col items-center justify-center",
          circleClassName
        )}
      >
        <CircularProgressbarWithChildren
          value={percentage}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: "url(#gradient)",
            trailColor: "#eee",
          })}
        >
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(15)">
                <stop offset="0%" stopColor="#8e2de2" />
                <stop offset="100%" stopColor="#4ac7c4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center">
            <div className="text-5xl font-bold text-slate-800">
              {score.toFixed(1)}
            </div>
            <div className="text-xs text-slate-400">(0–9)</div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
