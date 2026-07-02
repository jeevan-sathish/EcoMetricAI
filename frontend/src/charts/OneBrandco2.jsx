import { useEffect, useMemo, useRef, useState } from "react";
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
  Brush,
} from "recharts";

// how many points show in the window at once
const WINDOW_SIZE = 5;

const OneBrandco2 = () => {
  const { brandCo2, minCo2 } = useGetBrandco2();

  // unique signature of current dataset (changes on ANY brand or model switch)
  const signature = useMemo(
    () => (brandCo2 ? brandCo2.map((d) => d.model).join("|") : ""),
    [brandCo2],
  );

  // controlled brush window state
  const [range, setRange] = useState({ start: 0, end: WINDOW_SIZE - 1 });

  // tracks whether the NEXT onChange call is Recharts auto-firing after a data swap
  // (we want to ignore that one, not let it override our fixed window)
  const ignoreNextChange = useRef(false);

  useEffect(() => {
    if (!brandCo2 || brandCo2.length === 0) return;
    ignoreNextChange.current = true; // Brush will auto-fire onChange right after this — skip it
    setRange({
      start: 0,
      end: Math.min(WINDOW_SIZE - 1, brandCo2.length - 1),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  if (!brandCo2 || brandCo2.length === 0) {
    return (
      <div className="w-full h-[480px] bg-black text-white rounded-2xl shadow-lg flex items-center justify-center">
        <p className="text-gray-400">No CO₂ data available 🚗</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white rounded-2xl shadow-lg p-4 mt-3">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-1">
        <span className="text-pink-500">{minCo2?.brand}</span> Brands CO₂
        Emission Overview
      </h1>

      <p className="text-center text-gray-400 text-sm mb-4">
        Drag the slider below to browse models
      </p>

      <div className="w-full h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={brandCo2}
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
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />

            <Brush
              dataKey="model"
              height={30}
              stroke="#22c55e"
              fill="#111"
              travellerWidth={10}
              startIndex={range.start}
              endIndex={range.end}
              onChange={(newRange) => {
                if (ignoreNextChange.current) {
                  ignoreNextChange.current = false;
                  return; // skip Recharts' auto full-width correction
                }
                if (
                  newRange &&
                  newRange.startIndex != null &&
                  newRange.endIndex != null
                ) {
                  setRange({
                    start: newRange.startIndex,
                    end: newRange.endIndex,
                  });
                }
              }}
              tickFormatter={() => ""}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OneBrandco2;
