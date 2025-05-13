import React from "react";

type ScoreBoxProps = {
  label: string;
  score: number;
};

export default function ScoreBox({ label, score }: ScoreBoxProps) {
  return (
    <div className="text-center border-t-3 border-dashed border-gray-400">
      <div className="text-gray-600">{label}</div>
      <div className="text-5xl font-medium text-gray-800">
        {score.toFixed(1)}
      </div>
    </div>
  );
}
