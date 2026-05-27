import useSingleDataStore from "@/store/useSingleDataStore";
import { FaCar, FaGasPump, FaLeaf, FaRoad, FaCogs } from "react-icons/fa";

const SingleDataDashboard = () => {
  const { singleData } = useSingleDataStore();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div className="bg-white shadow-lg rounded-2xl p-5 border">
        <div className="flex items-center gap-3">
          <FaCar className="text-2xl text-blue-600" />

          <div>
            <p className="text-gray-500 text-sm">Brand</p>
            <h2 className="text-xl font-bold">{singleData.brand}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-5 border">
        <div className="flex items-center gap-3">
          <FaCar className="text-2xl text-green-600" />

          <div>
            <p className="text-gray-500 text-sm">Model</p>
            <h2 className="text-xl font-bold">{singleData.model}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-5 border">
        <div className="flex items-center gap-3">
          <FaRoad className="text-2xl text-purple-600" />

          <div>
            <p className="text-gray-500 text-sm">Combined MPG</p>
            <h2 className="text-xl font-bold">{singleData.combmpg}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-5 border">
        <div className="flex items-center gap-3">
          <FaGasPump className="text-2xl text-red-500" />

          <div>
            <p className="text-gray-500 text-sm">Fuel Type</p>
            <h2 className="text-xl font-bold">{singleData.fueltype}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-5 border">
        <div className="flex items-center gap-3">
          <FaLeaf className="text-2xl text-green-700" />

          <div>
            <p className="text-gray-500 text-sm">CO₂ Emission</p>
            <h2 className="text-xl font-bold">{singleData.co2emission}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-5 border">
        <div className="flex items-center gap-3">
          <FaCogs className="text-2xl text-orange-500" />

          <div>
            <p className="text-gray-500 text-sm">Transmission</p>
            <h2 className="text-lg font-bold">{singleData.transmission}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDataDashboard;
