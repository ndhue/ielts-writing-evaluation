"use client";

import { ScoreCircle } from "@/components";
import { RightArrowIcon, TrashIcon } from "@/components/icons";
import { truncateEssay } from "@/utils/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface EvaluationCardProps {
  id: string;
  date: string;
  topic: string;
  essay: string;
  score: number;
}

const EvaluationCard = ({
  id,
  date,
  topic,
  essay,
  score,
}: EvaluationCardProps) => {
  const router = useRouter();
  const [swiped, setSwiped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handlers = useSwipeable({
    onSwipedRight: () => setSwiped(true),
    onSwipedLeft: () => setSwiped(false),
    onTouchStartOrOnMouseDown: () => setIsDragging(true),
    onTouchEndOrOnMouseUp: () => setIsDragging(false),
    touchEventOptions: { passive: false },
  });

  return (
    <div className="text-slate-500 text-sm font-light">
      <p className="mb-2"> {format(new Date(date), "MMM d, yyyy")}</p>

      <div
        {...handlers}
        className={`relative overflow-hidden select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onClick={() => setSwiped(!swiped)}
      >
        {swiped && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-0">
            <div className="group relative p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <TrashIcon className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        )}
        <div
          className={`relative z-10 bg-white m-1 ring ring-slate-200 shadow-md rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 w-[calc(100%-100px)] ${
            swiped ? "translate-x-[80px]" : ""
          }`}
        >
          <div className="flex flex-col gap-3 mr-4">
            <span>
              <span className="text-purple-600 font-medium mr-2">Topic:</span>
              {topic}
            </span>
            <span className="text-justify">
              <span className="text-purple-600 font-medium mr-2">Essay:</span>
              {truncateEssay(essay)}
            </span>
            <span
              className="text-purple-600 cursor-pointer group hover:font-medium transition-all duration-200 ease-in-out w-fit"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/evaluations/${id}`);
              }}
            >
              [ View full evaluation{" "}
              <RightArrowIcon className="inline transition-transform duration-200 ease-in-out group-hover:translate-x-1" />{" "}
              ]
            </span>
          </div>
          <ScoreCircle
            score={score}
            animate={false}
            textClassName="text-xs"
            circleClassName="size-34"
            scoreClassName="text-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default EvaluationCard;
