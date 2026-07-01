import ModelTemplates from "@/components/ModelTemplates";
import InputForm from "@/components/InputForm";
import SingleDataDashboard from "@/components/SingleDataDashboard";
import OneBrandco2 from "@/charts/OneBrandco2";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import Note from "@/components/Note";
import { RiRobot2Fill } from "react-icons/ri";
import HeaderTitles from "@/components/HeaderTitles";
import { AiSuggestion } from "@/components/AiSuggestion";

import AllProfileList from "@/components/AllProfileList";
import { useState } from "react";
import CustomChatBot from "@/components/CustomChatBot";

const Analysis = () => {
  const [currentmode, setCurrentMode] = useState("dashboard");
  const dashboardstate = Boolean(currentmode === "dashboard");

  const chatModeState = Boolean(currentmode === "chatMode");

  function handleCustomChatBot() {
    setCurrentMode("chatMode");
  }
  function handleDashboard() {
    setCurrentMode("dashboard");
  }
  return (
    <div className="min-h-screen w-full flex flex-col  lg:flex-row bg-black gap-2">
      <div className="w-full h-full lg:w-[25%] bg-black border border-r-gray-800 p-4 ">
        <div className="w-full h-12 bg-green-300 rounded-0 text-black flex flex-row justify-center items-center rounded-tl-2xl rounded-tr-2xl">
          <MdOutlineContentPasteSearch className="text-2xl mr-2" />
          <HeaderTitles title="Find Your Best Car" />
        </div>
        <div className="flex flex-col gap-2.5">
          <InputForm />
          <ModelTemplates />
        </div>
      </div>

      <div className="w-full min-h-screen lg:w-[45%] flex flex-col gap-4 p-3 ">
        <div className="w-full h-10 bg-green-400 rounded-2xl text-white flex flex-row justify-center gap-3 items-center">
          <div className="flex flex-row justify-center items-center gap-2">
            <div
              className={`w-[5px] h-[5px] rounded-full ${dashboardstate ? "bg-green-800 animate-ping" : "bg-red-500"}`}
            ></div>
            {/* <HeaderTitles title="Dashboard" /> */}
            <button
              className={`${dashboardstate ? "text-gray-500 hover:cursor-context-menu" : "text-black"}`}
              onClick={handleDashboard}
              disabled={dashboardstate}
            >
              DashBoard
            </button>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <div
              className={`w-[5px] h-[5px] rounded-full ${chatModeState ? "bg-green-800 animate-ping" : "bg-red-500"}`}
            ></div>
            <button
              onClick={handleCustomChatBot}
              className={`${chatModeState ? "text-gray-500" : "text-black"}`}
              disabled={chatModeState}
            >
              Chat mode
            </button>
          </div>
        </div>
        <div className="w-full h-full bg-green-black rounded-2xl p-4 flex flex-col gap-5">
          {currentmode === "chatMode" ? (
            <CustomChatBot />
          ) : (
            <div>
              <SingleDataDashboard />
              <OneBrandco2 />
            </div>
          )}

          {/* chatrt */}

          <Note note="The above analysis is based on the EPA Records.for latest and aquarate prefer our AI suggestions in the right panel." />
        </div>
      </div>

      <div className="w-full   lg:w-[30%] bg-black border border-l-gray-800 p-4   ">
        <div className="w-full h-12 bg-green-300 text-black flex flex-row gap-5 items-center justify-start rounded-tl-2xl rounded-tr-2xl p-4">
          <RiRobot2Fill className="text-2xl ml-3" />
          <HeaderTitles title="AI Suggestions" />
        </div>
        <div className="w-full h-auto p-2 flex flex-col gap-6  ">
          <AiSuggestion />
          <AllProfileList />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
