import api from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { Comment } from "react-loader-spinner";
import useCarStore from "@/store/useCarStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ReportDownloader } from "@/services/ReportDowloader";

export const AiSuggestion = () => {
  const reportRef = useRef(null);

  const { cars } = useCarStore();
  const [suggestion, setSuggestion] = useState("input is missing");

  const data = {
    brand: cars[0]?.brand || "",
    model: cars[0]?.model || "",
  };

  async function Ai_Suggestion() {
    try {
      const res = await api.post("/filterData", data);
      setSuggestion(res.data.suggestion);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Ai_Suggestion();
  }, [cars]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-white rounded-0  shadow-lg  overflow-hidden">
        <div
          ref={reportRef}
          className="h-[500px] bg-green-100 overflow-y-auto p-6"
        >
          {suggestion === "input is missing" ? (
            <div className="h-full flex flex-col items-center justify-center gap-3">
              <Comment
                visible={true}
                height="50"
                width="50"
                ariaLabel="comment-loading"
                color="#fff"
                backgroundColor="#22c55e"
              />

              <RiRobot2Line className="text-6xl text-green-600 animate-pulse" />

              <p className="text-sm text-gray-500">
                Generating your AI vehicle report...
              </p>
            </div>
          ) : (
            <div className="prose prose-sm md:prose lg:prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {suggestion}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      <button
        disabled={suggestion === "input is missing"}
        onClick={() => ReportDownloader(reportRef.current)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition  disabled:bg-gray-400
  disabled:cursor-not-allowed
  disabled:hover:bg-gray-400"
      >
        Download PDF Report
      </button>
    </div>
  );
};
