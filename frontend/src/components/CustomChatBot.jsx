import api from "@/services/api";
import { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import {
  FaBolt,
  FaCar,
  FaLeaf,
  FaGasPump,
  FaRoad,
  FaCogs,
  FaSearch,
  FaChartBar,
} from "react-icons/fa";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { ThreeDots } from "react-loader-spinner";

const ROWS_PER_PAGE = 5;

const CustomChatBot = () => {
  const [input, setInput] = useState("");
  const inpRef = useRef();
  const [customChatResponse, setCustomChatResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    inpRef.current.focus();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChatSubmit();
    }
  }

  const token = localStorage.getItem("access_token");

  async function handleChatSubmit() {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await api.post(
        "/customChatResponse",
        { userInput: input },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setCustomChatResponse(response.data.result || []);
      setHasSearched(true);
      setPage(1);
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        "Something went wrong. Please try again.";
      setToast(message);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  const totalPages = Math.max(
    1,
    Math.ceil(customChatResponse.length / ROWS_PER_PAGE),
  );
  const paginatedRows = customChatResponse.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE,
  );

  return (
    <div className="w-full  bg-black rounded-2xl p-4 flex flex-col gap-4">
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-start gap-3 bg-red-950 border border-red-600 text-red-200 px-4 py-3 rounded-xl shadow-lg max-w-sm animate-in fade-in slide-in-from-top-2">
          <FiAlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
          <p className="text-sm flex-1">{toast}</p>
          <button
            onClick={() => setToast(null)}
            className="text-red-400 hover:text-red-200"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="w-full bg-gray-900 rounded-2xl flex flex-row items-center gap-3 p-3">
        <input
          ref={inpRef}
          type="text"
          value={input}
          onKeyDown={handleKeyDown}
          placeholder="Ask about a brand, emissions, mileage..."
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 h-[50px] bg-gray-800 rounded-xl pl-4 text-gray-200 outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          onClick={handleChatSubmit}
          disabled={loading}
          className="rounded-xl text-white bg-green-600 hover:bg-green-500 disabled:bg-green-900 disabled:cursor-not-allowed font-bold px-6 h-[50px] transition-colors flex items-center justify-center"
        >
          {loading ? (
            <ThreeDots
              visible={true}
              height="20"
              width="20"
              color="#ffffff"
              radius="9"
              ariaLabel="submitting"
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>

      <div className="w-full max-h-[1000px] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 p-4 flex flex-col gap-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <ThreeDots
              visible={true}
              height="50"
              width="50"
              color="#22c55e"
              radius="9"
              ariaLabel="three-dots-loading"
            />
            <p className="text-gray-500 text-sm">Fetching results...</p>
          </div>
        )}

        {!loading && !hasSearched && (
          <div className="flex  items-center justify-center py-0">
            <div className="mt-2 w-full h-full flex flex-col items-center">
              <div className="flex items-center gap-2 mb-5">
                <FaBolt className="text-yellow-400 text-xl" />
                <h3 className="text-lg font-semibold text-white">
                  Quick Start
                </h3>
              </div>

              <div className="flex flex-wrap w-[95%] flex-col justify-center gap-5 max-w-8xl">
                {[
                  {
                    icon: <FaLeaf />,
                    text: "Show cars with CO₂ emission below 100 g/km",
                  },
                  {
                    icon: <FaCar />,
                    text: "List all Audi vehicles",
                  },
                  {
                    icon: <FaSearch />,
                    text: "Find SUVs with engine size above 3.0L",
                  },
                  {
                    icon: <FaGasPump />,
                    text: "Show diesel cars with the lowest highway consumption",
                  },
                  {
                    icon: <FaRoad />,
                    text: "Top 10 cars with the best combined MPG",
                  },
                  {
                    icon: <FaChartBar />,
                    text: "Average CO₂ emission for each brand",
                  },
                  {
                    icon: <FaCogs />,
                    text: "Cars with more than 6 cylinders",
                  },
                  {
                    icon: <FaLeaf />,
                    text: "Lowest CO₂ emission vehicle in the dataset",
                  },
                ].map((item) => (
                  <button
                    key={item.text}
                    onClick={() => setInput(item.text)}
                    className="flex  items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-gray-300 transition-all duration-300 hover:border-green-500 hover:bg-green-600 hover:text-white hover:scale-105"
                  >
                    <span className="text-green-400">{item.icon}</span>
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && hasSearched && customChatResponse.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500 text-sm">
              No matching vehicles found for that query.
            </p>
          </div>
        )}

        {!loading && customChatResponse.length > 0 && (
          <>
            <div>
              <p className="text-gray-400 text-xs mb-2">
                {customChatResponse.length} result
                {customChatResponse.length > 1 ? "s" : ""} found
              </p>
              <div className="w-full h-[220px] ">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={customChatResponse}
                    margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                    <XAxis
                      dataKey="model"
                      angle={-25}
                      textAnchor="end"
                      interval={0}
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      height={50}
                      overflow="visible"
                    />
                    <YAxis
                      tick={{ fill: "#9ca3af", fontSize: 11 }}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111",
                        border: "1px solid #333",
                        borderRadius: "10px",
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="co2emission"
                      fill="#22c55e"
                      radius={[6, 6, 0, 0]}
                    />

                    <Brush
                      dataKey="model"
                      height={20}
                      travellerWidth={10}
                      startIndex={0}
                      endIndex={6}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="bg-zinc-900 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Brand</th>
                    <th className="px-4 py-3">Model</th>
                    <th className="px-4 py-3">Class</th>
                    <th className="px-4 py-3">Fuel</th>
                    <th className="px-4 py-3 text-right">Comb. MPG</th>
                    <th className="px-4 py-3 text-right">CO2 (g/km)</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRows.map((row, i) => (
                    <tr
                      key={`${row.brand}-${row.model}-${i}`}
                      className="border-t border-zinc-800 hover:bg-zinc-900/60"
                    >
                      <td className="px-4 py-3">{row.brand}</td>
                      <td className="px-4 py-3">{row.model}</td>
                      <td className="px-4 py-3">{row.vehicleclass}</td>
                      <td className="px-4 py-3">{row.fueltype}</td>
                      <td className="px-4 py-3 text-right">{row.combmpg}</td>
                      <td className="px-4 py-3 text-right text-green-500 font-medium">
                        {row.co2emission}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-sm text-gray-400 hover:text-white disabled:text-gray-700 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <span className="text-xs text-gray-500">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="text-sm text-gray-400 hover:text-white disabled:text-gray-700 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomChatBot;
