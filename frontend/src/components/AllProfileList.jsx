import { useEffect, useState } from "react";
// import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaAward } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";

import api from "@/services/api";
import useGetBrandco2 from "@/store/useGetBrandco2";

const AllProfileList = () => {
  const { minCo2 } = useGetBrandco2();
  const [allprofile, setAllprofile] = useState([]);
  async function handleAllUsersProfile() {
    try {
      const res = await api.get("/profile/allprofiles");
      setAllprofile(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleAllUsersProfile();
  }, []);
  return (
    <div className="w-full h-90 rounded-2xl flex flex-col gap-3 bg-gray-950 border border-gray-800 p-5">
      <div className="flex items-center gap-4 mb-0">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
          <FaAward className="text-amber-400 text-xl" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Recommended Vehicle Choice
          </h2>

          <p className="text-amber-400 text-[12px] ">
            We strongly recommend this vehicle based on your selected brand.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-4 bg-gradient-to-r from-green-600/20 to-emerald-500/10 border border-green-500/30 rounded-2xl px-6 py-2 shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-all duration-300">
          <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center">
            <IoCarSport className="text-white text-3xl" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-green-400 font-medium">
              Best Low Emission Vehicle
            </p>

            <h2 className="text-white text-xl font-bold">
              {minCo2?.brand || "Brand"}
            </h2>

            <p className="text-gray-300 text-sm">{minCo2?.model || "Model"}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="text-white text-lg font-semibold mt-3 mb-2 flex flex-row item-center text-center gap-3 ">
          <HiMiniUsers className="text-[28px] text-cyan-500" />
          <p>Our Trusted Users</p>
        </div>

        <div className="flex items-center">
          {allprofile.slice(0, 6).map((user, index) => (
            <img
              key={user.id}
              src={user.picture}
              alt={user.name}
              className="w-14 h-14 rounded-full border-3 border-gray-950 object-cover"
              style={{
                marginLeft: index === 0 ? "0px" : "-14px",
                zIndex: allprofile.length - index,
              }}
            />
          ))}

          {allprofile.length > 8 && (
            <div
              className="w-14 h-14 rounded-full bg-green-600 border-3 border-gray-950
        flex items-center justify-center text-white text-sm font-bold ml-[-14px]"
            >
              +{allprofile.length - 6}
            </div>
          )}
        </div>

        <p className="text-gray-400 mt-2 text-sm">
          Join {allprofile.length}+ eco-conscious users using EcoMetric AI.
        </p>
      </div>
    </div>
  );
};

export default AllProfileList;
