interface ScoreStatisticTableProps {
  highest: number;
  lowest: number;
  average: number;
  totalEssays: number;
}

const ScoreStatisticTable = ({
  highest,
  lowest,
  average,
  totalEssays,
}: ScoreStatisticTableProps) => {
  const data: ScoreStatisticTableProps = {
    highest,
    lowest,
    average,
    totalEssays,
  };

  return (
    <div className="bg-white rounded-2xl px-6 py-8 ring-slate-200 ring-1 shadow-md">
      <p className="text-xl font-medium text-center">Overall Band Score</p>
      <div className="flex flex-col gap-2 mt-4">
        {Object.entries(data).map(([key, value]) =>
          getScoreRow(
            getLabel(key as keyof ScoreStatisticTableProps),
            value,
            getScoreColor(key as keyof ScoreStatisticTableProps)
          )
        )}
      </div>
    </div>
  );
};

const getScoreRow = (label: string, value: number, colorClass = "") => {
  return (
    <div className="flex justify-between items-center border-b border-border pb-1" key={label}>
      <span className="text-slate-600 text-sm">{label}</span>
      <span className={`text-sm ${colorClass}`}>{value}</span>
    </div>
  );
};

const getLabel = (key: keyof ScoreStatisticTableProps): string => {
  switch (key) {
    case "highest":
      return "Highest";
    case "lowest":
      return "Lowest";
    case "average":
      return "Average";
    case "totalEssays":
      return "Total essays";
    default:
      return "";
  }
};

const getScoreColor = (key: keyof ScoreStatisticTableProps): string => {
  switch (key) {
    case "highest":
      return "text-purple-500";
    case "lowest":
      return "text-error-500";
    case "average":
      return "text-success-500";
    case "totalEssays":
      return "text-warning-500";
    default:
      return "";
  }
};

export default ScoreStatisticTable;
