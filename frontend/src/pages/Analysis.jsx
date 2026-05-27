import ModelTemplates from "@/components/ModelTemplates";
import InputForm from "@/components/InputForm";
import SingleDataDashboard from "@/components/SingleDataDashboard";
import OneBrandco2 from "@/components/charts/OneBrandco2";
import EcoFriendlyModel from "@/components/charts/ecoFriendlyModel";

const Analysis = () => {
  return (
    <div className="min-h-screen w-full flex flex-col  lg:flex-row bg-gray-50 gap-2">
      <div className="w-full lg:w-[25%] bg-green-100 p-4 ">
        <div>
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
        </div>
        <div className="flex flex-col gap-[10px]">
          <InputForm />
          <ModelTemplates />
        </div>
      </div>

      <div className="w-full min-h-screen lg:w-[50%] flex flex-col p-6 overflow-y-scroll">
        <div className="w-full h-14 bg-green-600 rounded-2xl text-white flex flex-row justify-center">
          dashboard
        </div>
        <SingleDataDashboard />
        <OneBrandco2 />
      </div>

      <div className="w-full lg:w-[24%] bg-green-100 p-4 ">
        <h2 className="text-lg font-semibold mb-4">AI Suggestions</h2>
      </div>
    </div>
  );
};

export default Analysis;
