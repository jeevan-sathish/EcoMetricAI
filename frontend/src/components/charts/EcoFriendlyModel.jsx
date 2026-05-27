import useGetBrandco2 from "@/store/useGetBrandco2";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

const EcoFriendlyModel = () => {
  const { brandCo2, minCo2 } = useGetBrandco2();

  // sort lowest emission first
  const sortedData = [...brandCo2].sort(
    (a, b) => a.co2emission - b.co2emission,
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Eco-Friendly Vehicle Analysis
        </h1>

        <p className="text-gray-500 mt-2">
          Compare CO₂ emissions across different models. Lower CO₂ means a more
          eco-friendly vehicle.
        </p>
      </div>

      <div className="bg-green-100 border border-green-300 rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold text-green-800">
          Most Eco-Friendly Model
        </h2>

        <p className="text-gray-700 mt-2">
          <span className="font-bold">{minCo2?.model}</span> produces only{" "}
          <span className="font-bold">{minCo2?.co2emission} g/km</span> of CO₂
          emission.
        </p>
      </div>

      <div className="w-full h-112.5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 50, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              label={{
                value: "CO₂ Emission (g/km)",
                position: "insideBottom",
                offset: -5,
              }}
            />

            <YAxis dataKey="model" type="category" width={120} />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="co2emission"
              name="CO₂ Emission"
              radius={[0, 10, 10, 0]}
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.model === minCo2?.model ? "#22c55e" : "#60a5fa"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EcoFriendlyModel;
