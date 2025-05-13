import { EvaluationCard } from "@/ui/evaluation";
import React from "react";

const EvaluationPage = () => {
  return (
    <div className="my-4 grid grid-cols-3 gap-12">
      <div className="col-span-2">
        <EvaluationCard />
      </div>
    </div>
  );
};

export default EvaluationPage;
