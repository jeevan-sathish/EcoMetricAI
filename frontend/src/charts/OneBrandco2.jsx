import useGetBrandco2 from "@/store/useGetBrandco2";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PAGE_SIZE = 6;

const OneBrandco2 = () => {
  const { brandCo2, minCo2 } = useGetBrandco2();
  const [startIndex, setStartIndex] = useState(0);

  if (!brandCo2 || brandCo2.length === 0) {
    return (
      <div className="w-full h-[480px] bg-black text-white rounded-2xl shadow-lg flex items-center justify-center">
        <p className="text-gray-400">No CO₂ data available 🚗</p>
      </div>
    );
  }

  const visibleData = brandCo2.slice(startIndex, startIndex + PAGE_SIZE);

  const canGoBack = startIndex > 0;
  const canGoNext = startIndex + PAGE_SIZE < brandCo2.length;

  return (
    <div className="w-full bg-black text-white rounded-2xl shadow-lg p-4 mt-3">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-1">
        <span className="text-pink-500">{minCo2?.brand}</span> Brands CO₂
        Emission Overview
      </h1>

      <p className="text-center text-gray-400 text-sm mb-4">
        Browse models using navigation
      </p>

      <div className="w-full h-[410px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={visibleData}
            margin={{ top: 20, right: 25, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />

            <XAxis
              dataKey="model"
              angle={-25}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 11, fill: "#ccc" }}
              height={70}
            />

            <YAxis
              tick={{ fill: "#ccc" }}
              width={60}
              label={{
                value: "CO₂ (g/km)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: "#888",
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="co2emission"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 px-2">
        <button
          onClick={() => setStartIndex((prev) => Math.max(prev - PAGE_SIZE, 0))}
          disabled={!canGoBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FiChevronLeft size={18} />
          Prev
        </button>

        <div className="text-sm text-gray-400">
          {startIndex + 1} - {Math.min(startIndex + PAGE_SIZE, brandCo2.length)}{" "}
          of {brandCo2.length}
        </div>

        <button
          onClick={() =>
            setStartIndex((prev) =>
              Math.min(prev + PAGE_SIZE, brandCo2.length - PAGE_SIZE),
            )
          }
          disabled={!canGoNext}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default OneBrandco2;
