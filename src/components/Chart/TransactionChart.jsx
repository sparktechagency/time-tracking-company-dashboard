import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", earning: 4000 },
  { month: "Feb", earning: 3000 },
  { month: "Mar", earning: 5000 },
  { month: "Apr", earning: 4000 },
  { month: "May", earning: 6000 },
  { month: "Jun", earning: 7000 },
  { month: "Jul", earning: 8000 },
  { month: "Aug", earning: 6000 },
  { month: "Sep", earning: 7000 },
  { month: "Oct", earning: 9000 },
  { month: "Nov", earning: 10000 },
  { month: "Dec", earning: 11000 },
];

export default function TransactionChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF2D55" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#FF2D55" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Tooltip />
        <Area
          type="monotone"
          dataKey="earning"
          stroke="#FF2D55"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorEarning)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
