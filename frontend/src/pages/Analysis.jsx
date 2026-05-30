import ModelTemplates from "@/components/ModelTemplates";
import InputForm from "@/components/InputForm";
import SingleDataDashboard from "@/components/SingleDataDashboard";
import OneBrandco2 from "@/charts/OneBrandco2";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import Note from "@/components/Note";
import { RiRobot2Fill } from "react-icons/ri";
import HeaderTitles from "@/components/HeaderTitles";
import { AiSuggestion } from "@/components/AiSuggestion";

const Analysis = () => {
  return (
    <div className="min-h-screen w-full flex flex-col  lg:flex-row bg-gray-50 gap-2">
      <div className="w-full lg:w-[25%] bg-green-100 p-4 ">
        <div className="w-full h-12 bg-green-300 rounded-0 text-black flex flex-row justify-center items-center">
          <MdOutlineContentPasteSearch className="text-2xl mr-2" />
          <HeaderTitles title="Find Your Best Car" />
        </div>
        <div className="flex flex-col gap-2.5">
          <InputForm />
          <ModelTemplates />
        </div>
      </div>

      <div className="w-full min-h-screen lg:w-[45%] flex flex-col gap-4 p-6 ">
        <div className="w-full h-14 bg-green-600 rounded-2xl text-white flex flex-row justify-center items-center">
          <HeaderTitles title="Dashboard" />
        </div>
        <div className="w-full h-full bg-green-100 rounded-2xl p-4 flex flex-col gap-3">
          <SingleDataDashboard />
          <OneBrandco2 />
          <Note note="The above analysis is based on the EPA Records.for latest and aquarate prefer our AI suggestions in the right panel." />
        </div>
      </div>

      <div className="w-full  lg:w-[30%] bg-green-100 p-4 ">
        <div className="w-full h-12 bg-green-300 text-black flex flex-row gap-3 items-center justify-start ">
          <RiRobot2Fill className="text-2xl ml-3" />
          <HeaderTitles title="AI Suggestions" />
        </div>
        <div className="w-full h-auto p-2 ">
          <AiSuggestion />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
