import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const generatedYearData = [
  {
    year: 2023,
    data: [
      { name: "My", value: 70 },
      { name: "Total", value: 700 },
    ],
  },
  {
    year: 2024,
    data: [
      { name: "My", value: 32 },
      { name: "Total", value: 320 },
    ],
  },
  {
    year: 2025,
    data: [
      { name: "My", value: 110 },
      { name: "Total", value: 1100 },
    ],
  },
];

const COLORS = ["#32ADE6", "#AF52DE"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      ${`${value}`}
    </text>
  );
};

export default function RevenuePieChart({ selectedYear }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const yearData = generatedYearData.find(
      (data) => data.year === selectedYear
    );
    setChartData(yearData ? yearData.data : []);
  }, [selectedYear]);

  if (!chartData.length) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="w-full flex justify-center items-center h-64 text-gray-500"
      >
        No data available for the selected year ({selectedYear})
      </div>
    );
  }

  return (
    <div
      className="w-full"
      aria-label={`Pie chart showing photo usage for the year ${selectedYear}`}
      role="img"
    >
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
