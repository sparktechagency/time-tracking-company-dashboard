import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const generatedYearData = [
  {
    year: 2023,
    data: [
      { month: "January", serviceProviders: 120, users: 400 },
      { month: "February", serviceProviders: 180, users: 600 },
      { month: "March", serviceProviders: 100, users: 300 },
      { month: "April", serviceProviders: 160, users: 450 },
      { month: "May", serviceProviders: 200, users: 700 },
      { month: "June", serviceProviders: 220, users: 750 },
      { month: "July", serviceProviders: 130, users: 350 },
      { month: "August", serviceProviders: 250, users: 900 },
      { month: "September", serviceProviders: 170, users: 500 },
      { month: "October", serviceProviders: 210, users: 650 },
      { month: "November", serviceProviders: 240, users: 800 },
      { month: "December", serviceProviders: 90, users: 200 },
    ],
  },
  {
    year: 2024,
    data: [
      { month: "January", serviceProviders: 140, users: 450 },
      { month: "February", serviceProviders: 190, users: 650 },
      { month: "March", serviceProviders: 150, users: 400 },
      { month: "April", serviceProviders: 170, users: 500 },
      { month: "May", serviceProviders: 230, users: 720 },
      { month: "June", serviceProviders: 250, users: 780 },
      { month: "July", serviceProviders: 200, users: 600 },
      { month: "August", serviceProviders: 260, users: 850 },
      { month: "September", serviceProviders: 210, users: 700 },
      { month: "October", serviceProviders: 270, users: 900 },
      { month: "November", serviceProviders: 290, users: 950 },
      { month: "December", serviceProviders: 300, users: 1000 },
    ],
  },
  {
    year: 2025,
    data: [
      { month: "January", serviceProviders: 160, users: 500 },
      { month: "February", serviceProviders: 210, users: 700 },
      { month: "March", serviceProviders: 200, users: 800 },
      { month: "April", serviceProviders: 230, users: 850 },
      { month: "May", serviceProviders: 270, users: 950 },
      { month: "June", serviceProviders: 290, users: 1000 },
      { month: "July", serviceProviders: 220, users: 700 },
      { month: "August", serviceProviders: 310, users: 1100 },
      { month: "September", serviceProviders: 260, users: 900 },
      { month: "October", serviceProviders: 300, users: 1000 },
      { month: "November", serviceProviders: 320, users: 1050 },
      { month: "December", serviceProviders: 350, users: 1150 },
    ],
  },
];

export default function CustomerStatisticsBarChart({ selectedYear }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const yearData = generatedYearData.find(
      (data) => data.year === selectedYear
    );
    if (yearData) {
      setChartData(yearData.data);
    }
  }, [selectedYear]);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="serviceProviders" fill="#FF3B30" barSize={20} />
          <Bar dataKey="users" fill="#5856D6" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
