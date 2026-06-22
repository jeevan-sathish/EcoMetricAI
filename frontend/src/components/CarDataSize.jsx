import api from "@/services/api";

import { useEffect, useState } from "react";
import { LuChartNoAxesCombined } from "react-icons/lu";

const CarDataSize = () => {
  const [carSize, setCarSize] = useState(0);

  async function getCarDataSize() {
    try {
      const response = await api.get("/dataset/datasize");
      const result = response.data.car_data_size;
      setCarSize(result);
      console.log(result);
    } catch (error) {
      console.log(error.response.data.detail);
    }
  }

  useEffect(() => {
    getCarDataSize();
  }, []);
  return (
    <div className="rounded-xl border gap-2 border-zinc-800 bg-zinc-950 p-2  flex flex-row justify-center items-center">
      <LuChartNoAxesCombined className="text-[14px] text-green-500" />
      <p className="text-[12px] text-gray-500">{carSize}</p>
    </div>
  );
};

export default CarDataSize;
