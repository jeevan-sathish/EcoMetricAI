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
import useGetBrandco2 from "@/store/useGetBrandco2";

const SingleDataDashboard = () => {
  const { singleData } = useSingleDataStore();
  const { minCo2 } = useGetBrandco2();

  const hasSingleData = Boolean(singleData?.brand);
  const hasMinCo2Data = Boolean(minCo2?.brand);

  const isLoading = !hasSingleData && !hasMinCo2Data;

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
      size: "sm",
    },
    {
      title: "Combined MPG",
      value: singleData?.combmpg,
      icon: FaRoad,
      color: "text-purple-600",
      size: "md",
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
      showScore: true,
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
      size: "lg",
    },
    {
      title: "Engine Size",
      value: singleData?.enginesize,
      icon: TbEngineFilled,
      color: "text-blue-500",
      size: "lg",
    },
    {
      title: "Vehicle Class",
      value: singleData?.vehicleclass,
      icon: FaTools,
      color: "text-orange-500",
      size: "md",
    },
  ];

  const minco2EmissionData = [
    {
      title: "Brand",
      value: minCo2?.brand,
      icon: FaCar,
      color: "text-blue-600",
      size: "sm",
    },
    {
      title: "Model",
      value: minCo2?.model,
      icon: FaCar,
      color: "text-green-600",
      size: "sm",
    },
    {
      title: "Combined MPG",
      value: minCo2?.combmpg,
      icon: FaRoad,
      color: "text-purple-600",
      size: "sm",
    },
    {
      title: "Fuel Type",
      value: minCo2?.fueltype,
      icon: FaGasPump,
      color: "text-red-500",
      size: "sm",
    },
    {
      title: "CO₂ Emission",
      value: minCo2?.co2emission,
      icon: FaLeaf,
      color: "text-green-700",
      size: "lg",
      showScore: true,
    },
    {
      title: "Transmission",
      value: minCo2?.transmission,
      icon: FaCogs,
      color: "text-orange-500",
      size: "sm",
    },
    {
      title: "Cylinders",
      value: minCo2?.cylinders,
      icon: MdOutlineTrendingDown,
      color: "text-orange-500",
      size: "sm",
    },
    {
      title: "Engine Size",
      value: minCo2?.enginesize,
      icon: TbEngineFilled,
      color: "text-blue-500",
      size: "sm",
    },
    {
      title: "Vehicle Class",
      value: minCo2?.vehicleclass,
      icon: FaTools,
      color: "text-orange-500",
      size: "sm",
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4  mt-1">
      {!hasSingleData
        ? minco2EmissionData.map((card, index) => (
            <DashboardCardSD
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              loading={isLoading}
              size={card.size}
              showScore={card.showScore}
            />
          ))
        : cards.map((card, index) => (
            <DashboardCardSD
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              loading={isLoading}
              size={card.size}
              showScore={card.showScore}
            />
          ))}
    </div>
  );
};

export default SingleDataDashboard;
