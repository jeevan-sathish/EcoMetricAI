import api from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { Comment, ThreeDots } from "react-loader-spinner";
import useCarStore from "@/store/useCarStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SpeechBox from "./SpeechBox";
import useAIassistantToggleStore from "@/store/useAIassistentToggleStore";
import Toast from "./Toast";
import { MdDeleteSweep } from "react-icons/md";

export const AiSuggestion = () => {
  const { toggleAiMode, setToggleAiMode } = useAIassistantToggleStore();
  const reportRef = useRef(null);

  const { cars } = useCarStore();

  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const toastMessage = "Please select Brand and Model to perform AI analysis";
  const hasCars = cars && cars.length > 0;

  async function fetchSuggestion() {
    if (!toggleAiMode || !cars?.length) return;

    const brand = cars[0]?.brand;
    const model = cars[0]?.model;

    const cacheKey = `${brand}-${model}`;

    const cacheSuggestion = localStorage.getItem(cacheKey);

    if (
      cacheSuggestion &&
      cacheSuggestion !== "undefined" &&
      cacheSuggestion !== "null"
    ) {
      console.log("Using cache");
      setSuggestion(cacheSuggestion);
      return;
    }
    try {
      setLoading(true);
      console.log("hitting aisuggestion router.........");
      const res = await api.post("/aisuggestion", {
        brand,
        model,
      });

      console.log("FULL RESPONSE:", res.data);

      const airesponse = res.data?.suggestion;

      if (!airesponse) {
        throw new Error("Empty AI response");
      }

      setSuggestion(airesponse);
      localStorage.setItem(cacheKey, airesponse);
    } catch (error) {
      console.log("ERROR:", error);

      setSuggestion("Failed to generate AI report.");
    } finally {
      setLoading(false);
    }
  }

  function handleClearSuggestion() {
    setSuggestion("");
    setToggleAiMode();
  }

  useEffect(() => {
    if (toggleAiMode && hasCars) {
      fetchSuggestion();
    }
  }, [cars, toggleAiMode]);

  return (
    <div className="w-full ">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
        <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
          <RiRobot2Line className="text-2xl text-green-500" />
          <div>
            <h2 className="font-semibold text-white">AI Vehicle Analysis</h2>
            <p className="text-xs text-zinc-400">
              Personalized sustainability insights
            </p>
          </div>
          {suggestion ? (
            <div className="flex flex-row gap-2 justify-center items-center">
              <SpeechBox suggestion={suggestion} />
              <button className="  p-0 text-white">
                <MdDeleteSweep onClick={handleClearSuggestion} />
              </button>
            </div>
          ) : loading ? (
            <div>
              <ThreeDots
                visible={true}
                height="40"
                width="40"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : null}
        </div>

        <div ref={reportRef} className="max-h-[500px] overflow-y-auto p-6">
          {!toggleAiMode && suggestion.length === 0 && (
            <p className="text-gray-500 text-[15px] text-center">
              Enable AI mode for detailed analysis.
            </p>
          )}
          {!hasCars && toggleAiMode && <Toast message={toastMessage} />}

          {loading ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
              <Comment
                visible={true}
                height="50"
                width="50"
                color="#ffffff"
                backgroundColor="#22c55e"
              />

              <RiRobot2Line className="animate-pulse text-6xl text-green-500" />

              <p className="text-sm text-zinc-400">
                Generating your AI vehicle report
              </p>
            </div>
          ) : (
            <div className="prose prose-invert text-gray-400  max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {suggestion}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
