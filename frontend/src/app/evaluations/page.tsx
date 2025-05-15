import {
  EvaluationCard,
  ScoreStatisticTable,
  ScoreSummaryTable,
} from "@/ui/evaluation";

const mockHistory = [
  { testDate: "2023-10-01", overall: 7.5 },
  { testDate: "2023-09-15", overall: 8.0 },
  { testDate: "2023-08-20", overall: 7.0 },
];

const EvaluationPage = () => {
  return (
    <div className="my-4">
      <h1 className="font-bold text-3xl mb-4">Feedback history</h1>
      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2">
          <EvaluationCard />
        </div>
        <div className="flex flex-col gap-8">
          <ScoreStatisticTable
            highest={9.0}
            lowest={5.5}
            average={7.5}
            totalEssays={7}
          />
          <ScoreSummaryTable scoreHistory={mockHistory} />
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
