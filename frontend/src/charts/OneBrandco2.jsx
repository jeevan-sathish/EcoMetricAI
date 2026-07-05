import { useEffect, useRef, useState } from "react";
import useGetBrandco2 from "@/store/useGetBrandco2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WINDOW_SIZE = 5;

const OneBrandco2 = () => {
  const { brandCo2, minCo2 } = useGetBrandco2();
  const [startIndex, setStartIndex] = useState(0);
  const trackRef = useRef(null);
  const dragState = useRef(null);

  const [prevData, setPrevData] = useState(brandCo2);
  if (brandCo2 !== prevData) {
    setPrevData(brandCo2);
    if (startIndex !== 0) setStartIndex(0);
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
    };
  }, []);

  if (!brandCo2 || brandCo2.length === 0) {
    return (
      <div className="w-full h-[480px] bg-black text-white rounded-2xl shadow-lg flex items-center justify-center">
        <p className="text-gray-400">No CO₂ data available 🚗</p>
      </div>
    );
  }

  const total = brandCo2.length;
  const maxStartIndex = Math.max(0, total - WINDOW_SIZE);
  const clampedStart = Math.min(startIndex, maxStartIndex);
  const windowedData = brandCo2.slice(clampedStart, clampedStart + WINDOW_SIZE);
  const rangeEnd = Math.min(clampedStart + WINDOW_SIZE, total);

  const canGoPrev = clampedStart > 0;
  const canGoNext = clampedStart < maxStartIndex;

  const maxCo2 = Math.max(...brandCo2.map((d) => d.co2emission || 0), 1);
  const slotPercent = 100 / total;
  const windowLeftPercent = clampedStart * slotPercent;
  const windowWidthPercent = WINDOW_SIZE * slotPercent;

  function goPrev() {
    setStartIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setStartIndex((i) => Math.min(maxStartIndex, i + 1));
  }

  function indexFromClientX(clientX) {
    if (!trackRef.current) return clampedStart;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return Math.round(ratio * total);
  }

  function handleWindowPointerDown(e) {
    e.preventDefault();
    dragState.current = {
      startClientX: e.clientX,
      startIndexAtDrag: clampedStart,
    };
    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);
  }

  function handleWindowPointerMove(e) {
    if (!dragState.current || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const slotWidthPx = rect.width / total;
    const deltaX = e.clientX - dragState.current.startClientX;
    const deltaIndex = Math.round(deltaX / slotWidthPx);
    const next = dragState.current.startIndexAtDrag + deltaIndex;
    setStartIndex(Math.max(0, Math.min(maxStartIndex, next)));
  }

  function handleWindowPointerUp() {
    dragState.current = null;
    window.removeEventListener("pointermove", handleWindowPointerMove);
    window.removeEventListener("pointerup", handleWindowPointerUp);
  }

  function handleTrackClick(e) {
    const clickedIndex = indexFromClientX(e.clientX);
    const centered = clickedIndex - Math.floor(WINDOW_SIZE / 2);
    setStartIndex(Math.max(0, Math.min(maxStartIndex, centered)));
  }

  return (
    <div className="w-full bg-black text-white rounded-2xl shadow-lg p-4 mt-3">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-1">
        <span className="text-pink-500">{minCo2?.brand}</span> Brands CO₂
        Emission Overview
      </h1>

      <p className="text-center text-gray-400 text-sm mb-4">
        Showing {clampedStart + 1}–{rangeEnd} of {total} models
      </p>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={windowedData}
            margin={{ top: 20, right: 25, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />

            <XAxis
              dataKey="model"
              angle={-20}
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
                fill: "green",
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

      <div className="flex items-center gap-3 mt-4 px-1">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className={`flex items-center justify-center w-8 h-8 rounded-lg border shrink-0 transition ${
            canGoPrev
              ? "border-green-500 text-green-400 hover:bg-green-500/10 cursor-pointer"
              : "border-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative flex-1 h-10 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden cursor-pointer select-none"
        >
          <div className="absolute inset-0 flex items-end px-0.5 gap-[2px]">
            {brandCo2.map((d, i) => {
              const isActive =
                i >= clampedStart && i < clampedStart + WINDOW_SIZE;
              const heightPct = Math.max(
                8,
                ((d.co2emission || 0) / maxCo2) * 100,
              );
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-colors ${
                    isActive ? "bg-green-500/80" : "bg-gray-700"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              );
            })}
          </div>

          <div
            onPointerDown={handleWindowPointerDown}
            className="absolute top-0 h-full bg-green-500/20 border-2 border-green-500 rounded-md cursor-grab active:cursor-grabbing touch-none"
            style={{
              left: `${windowLeftPercent}%`,
              width: `${windowWidthPercent}%`,
            }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-0.5">
              <span className="w-0.5 h-3 bg-green-300 rounded-full" />
              <span className="w-0.5 h-3 bg-green-300 rounded-full" />
            </div>
          </div>
        </div>

        <button
          onClick={goNext}
          disabled={!canGoNext}
          className={`flex items-center justify-center w-8 h-8 rounded-lg border shrink-0 transition ${
            canGoNext
              ? "border-green-500 text-green-400 hover:bg-green-500/10 cursor-pointer"
              : "border-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default OneBrandco2;
