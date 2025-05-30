"use client";
import { CriterionScoreCircle, ScoreCircle } from "@/components";
import { RadarChart } from "@/ui/evaluation";
import React from "react";

const Evaluation = () => {
  return (
    <div className="my-4 w-3/4 mx-auto">
      <div className="h-[400px] w-[800px] flex items-center justify-center mx-auto">
        <RadarChart />
      </div>
      <div className="crierion-scores">
        <p className="text-2xl font-bold mt-6">Criterion Scores</p>
        <div className="border-t-1 border-border flex items-center justify-between gap-8 mt-6 pt-6">
          <CriterionScoreCircle score={8} />
          <div className="explaination text-slate-600">
            <p className="text-xl font-medium">Task achievement</p>
            <ul className="list-disc list-inside mt-3 font-thin">
              <li>
                The candidate has effectively addressed the given task by
                providing a clear and relevant response that covers all aspects
                of the task.
              </li>
              <li>
                The essay is well-organized, with a clear introduction, body
                paragraphs, and conclusion.
              </li>
              <li>
                The ideas presented are coherent and supported with appropriate
                arguments and evidence.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="feedback mt-6">
        <p className="text-2xl font-bold mt-6">Feedback</p>
        <div className="flex items-center gap-8 mt-6">
          <ScoreCircle
            score={7.5}
            circleClassName="size-50"
            textClassName="text-slate-500 font-semibold text-md text-center"
            scoreClassName="text-4xl font-bold"
            animate={true}
          />
          <div className="explaination text-slate-600">
            <p className="text-xl font-medium">Strength</p>
            <ul className="list-disc list-inside mt-3 font-thin">
              <li>
                The candidate demonstrates a good range of grammatical
                structures.
              </li>
              <li>Sentences are well-constructed and punctuated correctly.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
