import useAIassistantToggleStore from "@/store/useAIassistentToggleStore";

const AiToggleButton = () => {
  const { toggleAiMode, setToggleAiMode } = useAIassistantToggleStore();
  return (
    <div
      className={`${toggleAiMode ? "bg-green-300 justify-end" : "bg-red-400 justify-start"} w-[50px] p-1 rounded-2xl flex flex-row `}
    >
      <div
        onClick={() => setToggleAiMode()}
        className="w-[20px] h-5 rounded-full bg-black"
      ></div>
    </div>
  );
};

export default AiToggleButton;
