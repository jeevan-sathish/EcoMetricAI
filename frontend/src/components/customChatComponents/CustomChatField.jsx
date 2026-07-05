import { useEffect, useRef } from "react";
import { FaBolt, FaCar, FaLeaf, FaGasPump, FaRoad } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

const quickstart = [
  { icon: <FaLeaf />, text: "Which cars have the lowest CO₂ emissions?" },
  { icon: <FaCar />, text: "Tell me about Audi's most efficient models" },
  {
    icon: <FaGasPump />,
    text: "What's the best diesel car for highway driving?",
  },
  { icon: <FaRoad />, text: "Top 5 cars with the best combined MPG" },
];
const CustomChatField = ({ handleSend, messages, loading }) => {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  return (
    <div
      className="w-full flex-1 min-h-0 overflow-y-auto scroll-smooth rounded-2xl bg-zinc-950 border border-zinc-800 p-4 flex flex-col  gap-4
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-zinc-900
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-gradient-to-b
              [&::-webkit-scrollbar-thumb]:from-green-500
              [&::-webkit-scrollbar-thumb]:to-green-700
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:hover:from-green-400
              [&::-webkit-scrollbar-thumb]:hover:to-green-600
              [scrollbar-width:thin]
              [scrollbar-color:#16a34a_#18181b]"
    >
      {messages.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-full gap-5">
          <div className="flex items-center gap-2">
            <FaBolt className="text-yellow-400 text-xl" />
            <h3 className="text-lg font-semibold text-white">
              Ask me about any car
            </h3>
          </div>

          <div className="grid grid-cols-2 w-full max-w-md gap-5">
            {quickstart.map((item) => (
              <button
                key={item.text}
                onClick={() => handleSend(item.text)}
                className="flex  flex-col items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 px-7 py-6 text-sm text-gray-300 transition-all duration-300 hover:border-green-500 hover:bg-gray-900 hover:text-white hover:scale-105"
              >
                <span className="text-green-400 text-3xl">{item.icon}</span>
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-green-800 text-white rounded-br-sm"
                : "bg-zinc-800 text-gray-200 rounded-bl-sm"
            }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3">
            <ThreeDots
              visible={true}
              height="18"
              width="30"
              color="#22c55e"
              radius="9"
              ariaLabel="bot-typing"
            />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default CustomChatField;
