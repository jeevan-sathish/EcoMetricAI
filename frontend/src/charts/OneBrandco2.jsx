import useGetBrandco2 from "@/store/useGetBrandco2";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const OneBrandco2 = () => {
  const { brandCo2, minCo2 } = useGetBrandco2();
  // const { cars } = useCarStore();

  return (
    <div className="w-full h-120 bg-white rounded-2xl shadow-lg p-2 mt-3">
      <h1 className="text-2xl font-bold text-center mb-2">
        <span className="font-bold text-pink-500">{minCo2.brand}</span> Brand
        Models CO₂ Emission Analysis
      </h1>

      <p className="text-center text-gray-500 mb-5">
        CO₂ emission comparison between car models
      </p>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={brandCo2}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            height={50}
            dataKey="model"
            tick={{ fontSize: 12 }}
            angle={-25}
            textAnchor="end"
            interval={0}
          />

          <YAxis />

          <Tooltip />

          <Legend
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: "10px" }}
          />

          <Line
            type="monotone"
            dataKey="co2emission"
            stroke="#f59e0b"
            strokeWidth={3}
            name="CO₂ Emission"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OneBrandco2;
