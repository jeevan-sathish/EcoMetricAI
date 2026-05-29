import { IoCarSport } from "react-icons/io5";
import useGreetStore from "@/store/useGreetStore";
// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

const Home = () => {
  const navigate = useNavigate();
  const { name, setName } = useGreetStore();
  const [message, setMessage] = useState("");

  async function handleUserNavigation() {
    try {
      const response = await api.post("/greet", {
        name: name,
      });
      if (response.status == 200) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate("/Analysis");
        }, 500);
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage(error);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-white via-gray-50 to-white px-6">
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

      <div className="mt-6 w-full max-w-md flex flex-row gap-3">
        <input
          className="flex-1 h-12.5 border border-gray-300 pl-3 rounded-2xl outline-none focus:border-green-500"
          type="text"
          placeholder="What should we call you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleUserNavigation}
          disabled={!name}
          className={`w-35 rounded-2xl text-white font-medium transition ${
            name
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Get Start
        </button>
      </div>
      <p className="text-[15px]">{message}</p>
    </div>
  );
};

export default Home;
