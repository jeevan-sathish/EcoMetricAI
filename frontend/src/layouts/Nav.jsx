import { FaLeaf } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useGreetStore from "@/store/useGreetStore";
import useGetBrandco2 from "@/store/useGetBrandco2";

const Nav = () => {
  const { name, email, profile_picture } = useGreetStore();
  const { minCo2 } = useGetBrandco2();

  const GreetName = name || "Guest";

  return (
    <nav className="w-full h-16 bg-blue-600 shadow-md px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FaLeaf className="text-2xl text-black" />
        <h1 className="text-2xl font-bold text-black tracking-wide">
          EcoMetric-AI
        </h1>
      </div>

      <div className="hidden  top-16 md:flex items-center gap-2 bg-transparent px-4 py-2 rounded-xl ">
        <FaLeaf className="text-green-400 text-lg animate-bounce" />

        <p className="text-black font-medium text-sm">
          Eco Friendly Brand-Model:
          <span className="font-medium ml-1 text-white">
            {minCo2.brand}-{minCo2?.model || "N/A"}
          </span>
        </p>

        <span className="text-black">|</span>

        <p className="text-black text-sm">
          CO₂:
          <span className="font-bold text-white ml-1">
            {minCo2?.co2emission || "0"}
          </span>
        </p>
        <span className="text-black">|</span>

        <p className="text-black text-sm">
          Engine Size:
          <span className="font-bold ml-1 text-white">
            {minCo2?.enginesize || "0"}
          </span>
        </p>
      </div>

      <div className="flex w-[250px] items-center bg-gray-600 p-1 rounded-2xl gap-2">
        {profile_picture ? (
          <div className="w-[40px]  h-[40px] flex justify-center items-center bg-black rounded-full">
            <img
              src={profile_picture}
              alt={name}
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        ) : (
          <CgProfile className="text-3xl text-black" />
        )}

        <p className="text-white font-semibold">{GreetName}</p>
      </div>
    </nav>
  );
};

export default Nav;
