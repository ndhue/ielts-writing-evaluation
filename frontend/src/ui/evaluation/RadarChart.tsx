"use client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ScoreData {
  subject: string;
  score: number;
}

interface ScoreRadarChartProps {
  data?: ScoreData[];
  width?: number;
  height?: number;
}

// Default data as fallback when no data is provided
const defaultData = [
  {
    subject: "Task Achievement",
    score: 4.5,
  },
  {
    subject: "Coherence & Cohesion",
    score: 7.0,
  },
  {
    subject: "Lexical Resource",
    score: 6.5,
  },
  {
    subject: "Grammar",
    score: 7.0,
  },
];

const ScoreRadarChart = ({
  data = defaultData,
  width = 500, // Increase default width
  height = 500, // Increase default height
}: ScoreRadarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="60%"
        data={data}
        width={width}
        height={height}
      >
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          style={{
            fontSize: "12px",
          }}
        />
        <PolarRadiusAxis domain={[0, 9]} />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#7A69D1"
          fill="#A594F9"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default ScoreRadarChart;
