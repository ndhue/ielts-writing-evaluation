interface ScoreSummaryTableProps {
  scoreHistory: {
    testDate: string;
    overall: number;
  }[];
}

const ScoreSummaryTable = ({ scoreHistory }: ScoreSummaryTableProps) => {
  return (
    <div className="bg-white rounded-2xl px-6 py-8 ring-slate-200 ring-1 shadow-md">
      <p className="text-xl font-medium text-center">Recent Score Summary</p>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex justify-between items-center border-b border-border pb-1 text-slate-500 text-xs">
          <span>Test date</span>
          <span>Overall</span>
        </div>
        {scoreHistory.map((item, index) => (
          <div key={index}>{getScoreRow(item.testDate, item.overall)}</div>
        ))}
      </div>
    </div>
  );
};

const getScoreRow = (date: string, score: number) => {
  return (
    <div className="flex justify-between items-center border-b border-border pb-1 text-sm text-slate-500">
      <span>{date}</span>
      <span>{score}</span>
    </div>
  );
};

export default ScoreSummaryTable;
