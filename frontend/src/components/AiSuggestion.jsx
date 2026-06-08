import api from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { Comment } from "react-loader-spinner";
import useCarStore from "@/store/useCarStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const AiSuggestion = () => {
  const reportRef = useRef(null);

  const { cars } = useCarStore();

  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchSuggestion() {
    if (!cars?.length) return;

    try {
      setLoading(true);

      const res = await api.post("/filterData", {
        brand: cars[0]?.brand,
        model: cars[0]?.model,
      });

      setSuggestion(res.data.suggestion);
    } catch (error) {
      console.error(error);
      setSuggestion("Failed to generate AI report.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSuggestion();
  }, [cars]);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
        <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
          <RiRobot2Line className="text-2xl text-green-500" />
          <div>
            <h2 className="font-semibold text-white">AI Vehicle Analysis</h2>
            <p className="text-xs text-zinc-400">
              Personalized sustainability insights
            </p>
          </div>
        </div>

        <div ref={reportRef} className="max-h-[500px] overflow-y-auto p-6">
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
