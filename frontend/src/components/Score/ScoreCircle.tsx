"use client";

import { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { cn } from "@/utils/cn";

interface ScoreCircleProps {
  score: number;
  circleClassName?: string;
  textClassName?: string;
  scoreClassName?: string;
  animationDuration?: number; // in ms
  animate?: boolean; // control whether score should animate
}

export default function ScoreCircle({
  score,
  circleClassName,
  textClassName,
  scoreClassName,
  animationDuration = 1000,
  animate = true,
}: ScoreCircleProps) {
  const [displayedScore, setDisplayedScore] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) {
      setDisplayedScore(score);
      return;
    }

    let start: number | null = null;

    const animateScore = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / animationDuration, 1);
      setDisplayedScore(Number((score * percentage).toFixed(2)));

      if (percentage < 1) {
        requestAnimationFrame(animateScore);
      }
    };

    requestAnimationFrame(animateScore);
  }, [score, animationDuration, animate]);

  const percentage = (displayedScore / 9) * 100;

  return (
    <div className="flex flex-col gap-2">
      <p className={cn("text-slate-500 font-semibold text-md", textClassName)}>
        OVERALL BAND SCORE
      </p>
      <div
        className={cn(
          "size-40 flex flex-col items-center justify-center",
          circleClassName
        )}
      >
        <CircularProgressbarWithChildren
          value={percentage}
          strokeWidth={10}
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
            <div
              className={cn(
                "text-5xl font-bold text-slate-800",
                scoreClassName
              )}
            >
              {displayedScore.toFixed(1)}
            </div>
            <div className="text-xs text-slate-400">(0-9)</div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
