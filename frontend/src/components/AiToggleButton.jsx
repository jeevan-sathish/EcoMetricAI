import useAIassistantToggleStore from "@/store/useAIassistentToggleStore";
import { IoSparklesSharp } from "react-icons/io5";

const AiToggleButton = () => {
  const { toggleAiMode, setToggleAiMode } = useAIassistantToggleStore();
  return (
    <div className="p-1 flex flex-row items-center gap-2 bg-gray-950 pl-3 pr-3 pt-1 pb-1 rounded-2xl border-2 border-black">
      <div className="text-white flex flex-col text-center gap-1.5 items-center">
        <IoSparklesSharp className="text-[15px] " />
        <p className="text-[10px] text-gray-400"> Ai mode</p>
      </div>
      <div
        className={`${toggleAiMode ? " justify-end" : " justify-start"} w-[50px] p-1 rounded-2xl flex flex-row bg-gray-900  transition-colors duration-300 `}
      >
        <div
          onClick={() => setToggleAiMode()}
          className={`w-[20px] h-5 rounded-full ${toggleAiMode ? "bg-green-400" : "bg-red-500"} hover:cursor-pointer`}
        ></div>
      </div>
    </div>
  );
};

export default AiToggleButton;
