import React from "react";
import { LinearProgress } from "@mui/material";

const serviceStatsDataByYear = {
  2023: { laundry: 45, homeCleaning: 30, officeCleaning: 55, carWash: 70 },
  2024: { laundry: 55, homeCleaning: 40, officeCleaning: 65, carWash: 80 },
  2025: { laundry: 64, homeCleaning: 38, officeCleaning: 51, carWash: 88 },
};

function ServiceProgress({ label, value, color }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="w-48">{label}</p>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          flex: 1,
          height: 10,
          borderRadius: 5,
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
          },
        }}
      />
      <p className="w-12 text-right">{value}%</p>
    </div>
  );
}

export default function ServiceStats({ selectedYear }) {
  const stats = serviceStatsDataByYear[selectedYear] || {
    laundry: 0,
    homeCleaning: 0,
    officeCleaning: 0,
    carWash: 0,
  };

  return (
    <div className="flex flex-col gap-3 w-full space-y-4 mt-5">
      <ServiceProgress
        label="Laundry Service"
        value={stats.laundry}
        color="#FF9500"
      />
      <ServiceProgress
        label="Home Cleaning Service"
        value={stats.homeCleaning}
        color="#3B82F6"
      />
      <ServiceProgress
        label="Office Cleaning Service"
        value={stats.officeCleaning}
        color="#10B981"
      />
      <ServiceProgress
        label="Car Wash Service"
        value={stats.carWash}
        color="#EF4444"
      />
    </div>
  );
}
