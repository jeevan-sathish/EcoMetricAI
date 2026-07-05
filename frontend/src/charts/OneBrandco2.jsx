import { useState } from "react";
import useGetBrandco2 from "@/store/useGetBrandco2";
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
import { ChevronLeft, ChevronRight } from "lucide-react";

const WINDOW_SIZE = 5;

const OneBrandco2 = () => {
  const { brandCo2, minCo2 } = useGetBrandco2();
  const [page, setPage] = useState(0);

  const [prevData, setPrevData] = useState(brandCo2);
  if (brandCo2 !== prevData) {
    setPrevData(brandCo2);
    if (page !== 0) setPage(0);
  }

  if (!brandCo2 || brandCo2.length === 0) {
    return (
      <div className="w-full h-[480px] bg-black text-white rounded-2xl shadow-lg flex items-center justify-center">
        <p className="text-gray-400">No CO₂ data available 🚗</p>
      </div>
    );
  }

  const totalPages = Math.ceil(brandCo2.length / WINDOW_SIZE);
  const start = page * WINDOW_SIZE;
  const windowedData = brandCo2.slice(start, start + WINDOW_SIZE);

  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  return (
    <div className="w-full bg-black text-white rounded-2xl shadow-lg p-4 mt-3">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-1">
        <span className="text-pink-500">{minCo2?.brand}</span> Brands CO₂
        Emission Overview
      </h1>

      <p className="text-center text-gray-400 text-sm mb-4">
        {windowedData[0]?.model} –{" "}
        {windowedData[windowedData.length - 1]?.model}
        <span className="text-gray-600">
          {" "}
          (page {page + 1} of {totalPages})
        </span>
      </p>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={windowedData}
            margin={{ top: 20, right: 25, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />

            <XAxis
              dataKey="model"
              angle={-25}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12, fill: "#ffffff" }}
              height={70}
            />

            <YAxis
              tick={{ fill: "#fff" }}
              width={60}
              label={{
                value: "CO₂ (g/km)",
                angle: -90,
                position: "insideLeft",
                offset: 7,
                fill: "#fff",
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
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 mt-3">
        <button
          onClick={() => canGoPrev && setPage((p) => p - 1)}
          disabled={!canGoPrev}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm transition ${
            canGoPrev
              ? "border-green-500 text-green-400 hover:bg-green-500/10 cursor-pointer"
              : "border-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <div className="flex gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === page
                  ? "bg-green-500 w-4"
                  : "bg-gray-700 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => canGoNext && setPage((p) => p + 1)}
          disabled={!canGoNext}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm transition ${
            canGoNext
              ? "border-green-500 text-green-400 hover:bg-green-500/10 cursor-pointer"
              : "border-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default OneBrandco2;
