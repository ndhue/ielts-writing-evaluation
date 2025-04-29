import { CriterionScoreCircle, ScoreCircle } from "@/components";

import ScoreRadarChart from "./evaluation/components/RadarChart";

export default function Home() {
  return (
    <>
 
      <div className="h-screen gap-4 flex justify-center items-center">
        <ScoreCircle score={8.5} />
        <CriterionScoreCircle score={5.0} />
        <CriterionScoreCircle score={7.0} color="#4ac7c4" />
        <div className="w-[500px] h-[500px]">
          <ScoreRadarChart />
        </div>
      </div>
    </>
  );
}
