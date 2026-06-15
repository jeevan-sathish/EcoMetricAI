import { IoCarSport } from "react-icons/io5";

import { useState, useEffect } from "react";

import Login from "@/auth/Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loginToggle, setLoginToggle] = useState(false);
  const navigate = useNavigate();

  async function handleUserNavigation() {
    const acces_token = localStorage.getItem("access_token");

    if (acces_token) {
      navigate("/Analysis");
      return;
    }
    setLoginToggle((prev) => !prev);
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-white via-gray-50 to-white px-6 relative">
      <div className="flex flex-row items-center gap-4 justify-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 text-center">
          EcoMetric <span className="text-green-600">AI</span>
        </h1>

        <IoCarSport className="text-black text-8xl animate-pulse" />
      </div>

      <p className="mt-6 max-w-5xl text-center text-lg md:text-xl text-gray-600 leading-relaxed">
        EcoMetric AI is an intelligent car emission analysis platform that helps
        you explore vehicle brands and models, visualize emission patterns
        through interactive charts, and generate AI-driven insights for smarter,
        cleaner mobility decisions.
      </p>

      <div className="mt-6 w-full  max-w-md flex flex-row justify-center gap-3">
        <button
          onClick={handleUserNavigation}
          className={`w-70 h-[70px] rounded-2xl text-white font-medium transition bg-green-500 hover:bg-green-600`}
        >
          Get Start
        </button>
      </div>

      {loginToggle && <Login toggleFunction={handleUserNavigation} />}
    </div>
  );
};

export default Home;
