import { FaLeaf } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useGreetStore from "@/store/useGreetStore";
import useGetBrandco2 from "@/store/useGetBrandco2";

const Nav = () => {
  const { name } = useGreetStore();
  const { minCo2 } = useGetBrandco2();

  const GreetName = name || "Guest";

  return (
    <nav className="w-full h-16 bg-green-500 shadow-md px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <FaLeaf className="text-2xl text-black" />
        <h1 className="text-2xl font-bold text-black tracking-wide">
          EcoMetric-AI
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl ">
        <FaLeaf className="text-green-900 text-lg" />

        <p className="text-black font-medium text-sm">
          Eco Friendly Brand-Model:
          <span className="font-bold ml-1">
            {minCo2.brand}-{minCo2?.model || "N/A"}
          </span>
        </p>

        <span className="text-black">|</span>

        <p className="text-black text-sm">
          CO₂:
          <span className="font-bold ml-1">{minCo2?.co2emission || "0"}</span>
        </p>
        <span className="text-black">|</span>

        <p className="text-black text-sm">
          Engine Size:
          <span className="font-bold ml-1">{minCo2?.enginesize || "0"}</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <CgProfile className="text-3xl text-black" />
        <p className="text-black font-semibold">{GreetName}</p>
      </div>
    </nav>
  );
};

export default Nav;
