import { FaLeaf } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useGreetStore from "@/store/useProfileStore";
import useGetBrandco2 from "@/store/useGetBrandco2";
import { useState } from "react";
import UserProfile from "@/components/UserProfile";
import AiToggleButton from "@/components/AiToggleButton";
import { useLocation } from "react-router-dom";

// import { Link } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const { name, profile_picture } = useGreetStore();
  const { minCo2 } = useGetBrandco2();
  const [profileToggle, setProfileToggle] = useState(false);

  const GreetName = name || "Guest";

  function handleProfileToggle() {
    setProfileToggle((prev) => !prev);
  }

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-green-500/10 p-2">
          <FaLeaf className="text-xl text-green-500" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-wide text-white">
            EcoMetric<span className="text-green-500">AI</span>
          </h1>
          <p className="text-[10px] text-zinc-500">
            Sustainable Vehicle Intelligence
          </p>
        </div>
      </div>
      {location.pathname === "/Analysis" && (
        <div className="hidden items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 md:flex">
          <FaLeaf className="text-green-500" />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-400">Best Choice</span>

            <span className="font-semibold text-green-400">
              {minCo2.brand}-{minCo2?.model || "N/A"}
            </span>

            <span className="text-zinc-700">|</span>

            <span className="text-zinc-400">
              CO₂:
              <span className="ml-1 font-bold text-white">
                {minCo2?.co2emission || "0"}
              </span>
            </span>

            <span className="text-zinc-700">|</span>

            <span className="text-zinc-400">
              Engine:
              <span className="ml-1 font-bold text-white">
                {minCo2?.enginesize || "0"}
              </span>
            </span>
          </div>
        </div>
      )}

      {location.pathname === "/Analysis" && <AiToggleButton />}

      <div
        onClick={handleProfileToggle}
        className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-2 py-1 transition-all hover:border-green-500"
      >
        {profile_picture ? (
          <img
            src={profile_picture}
            alt={name}
            className="h-10 w-10 rounded-full border border-green-500 object-cover"
          />
        ) : (
          <CgProfile className="text-3xl text-zinc-400" />
        )}

        <div className="hidden flex-col md:flex">
          <p className="font-medium text-white">{GreetName}</p>
          <p className="text-xs text-zinc-500">User Account</p>
        </div>
      </div>

      {profileToggle && (
        <UserProfile
          handleProfToggle={handleProfileToggle}
          setProfileToggle={setProfileToggle}
        />
      )}
    </nav>
  );
};

export default Nav;
