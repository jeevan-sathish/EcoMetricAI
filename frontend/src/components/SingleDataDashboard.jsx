import useSingleDataStore from "@/store/useSingleDataStore";

import {
  FaCar,
  FaGasPump,
  FaLeaf,
  FaRoad,
  FaCogs,
  FaTools,
} from "react-icons/fa";
import { TbEngineFilled } from "react-icons/tb";
import { MdOutlineTrendingDown } from "react-icons/md";

import DashboardCardSD from "./DashboardCardSD";

const SingleDataDashboard = () => {
  const { singleData } = useSingleDataStore();

  const isLoading = !singleData || !singleData.brand;

  const cards = [
    {
      title: "Brand",
      value: singleData?.brand,
      icon: FaCar,
      color: "text-blue-600",
      size: "sm",
    },
    {
      title: "Model",
      value: singleData?.model,
      icon: FaCar,
      color: "text-green-600",
      size: "base",
    },
    {
      title: "Combined MPG",
      value: singleData?.combmpg,
      icon: FaRoad,
      color: "text-purple-600",
      size: "sm",
    },
    {
      title: "Fuel Type",
      value: singleData?.fueltype,
      icon: FaGasPump,
      color: "text-red-500",
      size: "sm",
    },
    {
      title: "CO₂ Emission",
      value: singleData?.co2emission,
      icon: FaLeaf,
      color: "text-green-700",
      size: "lg",
    },
    {
      title: "Transmission",
      value: singleData?.transmission,
      icon: FaCogs,
      color: "text-orange-500",
      size: "sm",
    },
    {
      title: "Cylinders",
      value: singleData?.cylinders,
      icon: MdOutlineTrendingDown,
      color: "text-orange-500",
      size: "sm",
    },
    {
      title: "Engine Size",
      value: singleData?.enginesize,
      icon: TbEngineFilled,
      color: "text-blue-500",
      size: "sm",
    },
    {
      title: "Vehicle Class",
      value: singleData?.vehicleclass,
      icon: FaTools,
      color: "text-orange-500",
      size: "sm",
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4  mt-1">
      {cards.map((card, index) => (
        <DashboardCardSD
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
          loading={isLoading}
          size={card.size}
        />
      ))}
    </div>
  );
};

export default SingleDataDashboard;
