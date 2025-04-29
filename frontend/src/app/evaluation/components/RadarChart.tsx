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

const data = [
  {
    subject: "Task Achievement",
    A: 4.5,
  },
  {
    subject: "Coherence & Cohesion",
    A: 7.0,
  },
  {
    subject: "Lexical Resource",
    A: 6.5,
  },
  {
    subject: "Grammar",
    A: 7.0,
  },
];

const ScoreRadarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="40%" data={data}>
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
          dataKey="A"
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
