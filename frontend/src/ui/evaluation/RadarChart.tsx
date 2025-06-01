"use client";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarChartProps {
  scores: {
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammar: number;
  };
}

const RadarChart = ({ scores }: RadarChartProps) => {
  const [mounted, setMounted] = useState(false);

  // Fix for hydration issues with recharts
  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    {
      subject: "Task Achievement",
      score: scores?.taskAchievement || 0,
      fullMark: 9,
    },
    {
      subject: "Coherence & Cohesion",
      score: scores?.coherenceCohesion || 0,
      fullMark: 9,
    },
    {
      subject: "Lexical Resource",
      score: scores?.lexicalResource || 0,
      fullMark: 9,
    },
    {
      subject: "Grammar",
      score: scores?.grammar || 0,
      fullMark: 9,
    },
  ];

  if (!mounted)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading chart...
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#e0e0e0" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#333", fontSize: 14 }}
        />
        <PolarRadiusAxis angle={90} domain={[0, 9]} />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;
