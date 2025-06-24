import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { LuFolderKanban } from "react-icons/lu";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import CustomerStatisticsBarChart from "../Chart/CustomerStatisticsBarChart";
import RevenuePieChart from "../Chart/RevenuePieChart";
import ServiceStats from "../UI/ServiceStats";

export default function Dashboard() {
  const [revenueByYear, setRevenueByYear] = useState(2025);
  const [productsByYear, setProductsByYear] = useState(2025);
  const [serviceByYear, setServiceByYear] = useState(2025);

  const handleRevenueYearChange = (event) => {
    // console.log("year", event.target.value);
    setRevenueByYear(event.target.value);
  };
  const handleProductsYearChange = (event) => {
    // console.log("year", event.target.value);
    setProductsByYear(event.target.value);
  };
  const handleServiceYearChange = (event) => {
    // console.log("year", event.target.value);
    setServiceByYear(event.target.value);
  };

  // console.log("yaaaaaaaaaaaaaaaaaar", year);

  return (
    <div className="bg-[#efefef] px-10 py-3 h-[92vh] w-full">
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg px-8 py-4 w-full h-28">
            <div className="flex items-center gap-2 text-[#333333]">
              <FaRegUser />
              <p className="font-medium text-lg">Total Employee</p>
            </div>
            <p className="text-[#333333] text-3xl font-semibold">320</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg px-8 py-4 w-full  h-28">
            <div className="flex items-center gap-2 text-[#333333]">
              <LuFolderKanban />
              <p className="font-medium text-lg">Total Project</p>
            </div>
            <p className="text-[#333333] text-3xl font-semibold">134</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg px-8 py-4 w-full  h-28">
            <div className="flex items-center gap-2 text-[#333333]">
              <LuFolderKanban />
              <p className="font-medium text-lg">Complete Project</p>
            </div>
            <p className="text-[#333] text-3xl font-semibold">403</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-5">
        <div className="bg-white shadow-xl w-full px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-[#333333] font-semibold text-xl">
                Customer Statistics
              </p>
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                  <p className="bg-[#FF3B30] size-4 rounded-full"></p>
                  <p>Service Providers</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="bg-[#5856D6] size-4 rounded-full"></p>
                  <p>Users</p>
                </div>
              </div>
            </div>
            <div className="w-28">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  <div className="flex items-center">
                    <p>
                      <LuCalendar fontSize={20} />
                    </p>
                    {/* <p className="text-sm">Year</p> */}
                  </div>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={revenueByYear}
                  label="Year"
                  onChange={handleRevenueYearChange}
                  className="h-8"
                >
                  <MenuItem value={2025}>2025</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-5">
            <CustomerStatisticsBarChart selectedYear={revenueByYear} />
          </div>
        </div>
        <div className="flex items-center gap-3 w-full">
          {/* revenue */}
          <div
            className="bg-white shadow-xl flex-1 px-5 py-3"
            style={{ minHeight: 325 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[#333333] font-semibold text-xl">Revenue</p>
              <div className="w-28">
                <FormControl fullWidth>
                  <InputLabel id="revenue-year-label">
                    <div className="flex items-center">
                      <p>
                        <LuCalendar fontSize={20} />
                      </p>
                      {/* <p className="text-sm">Year</p> */}
                    </div>
                  </InputLabel>
                  <Select
                    labelId="revenue-year-label"
                    id="revenue-year-select"
                    value={productsByYear}
                    label="Year"
                    onChange={handleProductsYearChange}
                    className="h-8"
                  >
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex mt-5 h-full">
              <RevenuePieChart selectedYear={productsByYear} />
              <div className="flex flex-col items-start gap-5 w-full">
                <div className="flex items-center gap-2 w-28">
                  <p className="bg-[#32ADE6] w-4 h-4 rounded-full"></p>
                  <p>My Profit</p>
                </div>
                <div className="flex items-center gap-2 w-32">
                  <p className="bg-[#AF52DE] w-4 h-4 rounded-full"></p>
                  <p>Total Profit</p>
                </div>
              </div>
            </div>
          </div>

          {/* service stats */}
          <div
            className="bg-white shadow-xl flex-1 px-5 py-3"
            style={{ minHeight: 325 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1A1A1A] font-semibold text-xl">
                  Service Stats
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="bg-[#FF9500] w-4 h-4 rounded-full"></p>
                  <p>Orders</p>
                </div>
              </div>
              <div className="w-28">
                <FormControl fullWidth>
                  <InputLabel id="service-year-label">
                    <div className="flex items-center">
                      <p>
                        <LuCalendar fontSize={20} />
                      </p>
                      {/* <p className="text-sm">Year</p> */}
                    </div>
                  </InputLabel>
                  <Select
                    labelId="service-year-label"
                    id="service-year-select"
                    value={serviceByYear}
                    label="Year"
                    onChange={handleServiceYearChange}
                    className="h-8"
                  >
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <ServiceStats selectedYear={serviceByYear} />
          </div>
        </div>
      </div>
    </div>
  );
}
