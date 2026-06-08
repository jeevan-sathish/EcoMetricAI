import useGetBrandco2 from "@/store/useGetBrandco2";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
// import CustomTooltip from "@/components/CustomToolTip";

const OneBrandco2 = () => {
  const { brandCo2, minCo2 } = useGetBrandco2();

  const chartWidth = Math.max(800, brandCo2.length * 80);

  return (
    <div className="w-full h-[500px] bg-black text-white rounded-2xl shadow-lg p-2 mt-3">
      <h1 className="text-2xl font-bold text-center mb-2">
        <span className="text-pink-500">{minCo2.brand}</span> Brand Models CO₂
        Emission Analysis
      </h1>

      <p className="text-center text-gray-500 mb-5">
        CO₂ emission comparison between car models
      </p>

      <div className="overflow-x-auto overflow-y-hidden">
        <LineChart
          width={chartWidth}
          height={380}
          data={brandCo2}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 60,
          }}
        >
          <XAxis
            dataKey="model"
            angle={-35}
            textAnchor="end"
            interval={0}
            height={80}
            tick={{ fontSize: 12 }}
          />

          <YAxis />

          <Tooltip
          // content={
          //   <CustomTooltip active={true} payload={brandCo2} label="Civic" />
          // }
          />

          <Legend verticalAlign="top" />

          <Line
            type="monotone"
            dataKey="co2emission"
            stroke="#22c55e"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name="CO₂ Emission"
          />
        </LineChart>
      </div>
    </div>
  );
};

export default OneBrandco2;
