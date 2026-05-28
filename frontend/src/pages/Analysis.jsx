import ModelTemplates from "@/components/ModelTemplates";
import InputForm from "@/components/InputForm";
import SingleDataDashboard from "@/components/SingleDataDashboard";
import OneBrandco2 from "@/charts/OneBrandco2";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import Note from "@/components/Note";

const Analysis = () => {
  return (
    <div className="min-h-screen w-full flex flex-col  lg:flex-row bg-gray-50 gap-2">
      <div className="w-full lg:w-[25%] bg-green-100 p-4 ">
        <div className="w-full h-12 bg-green-300 rounded-0 text-black flex flex-row justify-center items-center">
          <MdOutlineContentPasteSearch className="text-2xl mr-2" />
          <h2 className="text-md font-semibold mb-0">Find Your Best Car</h2>
        </div>
        <div className="flex flex-col gap-[10px]">
          <InputForm />
          <ModelTemplates />
        </div>
      </div>

      <div className="w-full min-h-screen lg:w-[45%] flex flex-col gap-4 p-6 ">
        <div className="w-full h-14 bg-green-600 rounded-2xl text-white flex flex-row justify-center items-center">
          Dashboard
        </div>
        <div className="w-full h-full bg-green-100 rounded-2xl p-4 flex flex-col gap-3">
          <SingleDataDashboard />
          <OneBrandco2 />
          <Note note="The above analysis is based on the EPA Records.for latest and aquarate prefer our AI suggestions in the right panel." />
        </div>
      </div>

      <div className="w-full lg:w-[30%] bg-green-100 p-4 ">
        <h2 className="text-lg font-semibold mb-4">AI Suggestions</h2>
      </div>
    </div>
  );
};

export default Analysis;
