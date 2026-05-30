import api from "@/services/api";
import { useEffect, useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { Comment } from "react-loader-spinner";
import useCarStore from "@/store/useCarStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import { TypeAnimation } from "react-type-animation";

export const AiSuggestion = () => {
  const { cars } = useCarStore();
  const [suggestion, setSuggestion] = useState(" ");

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
    <div className="w-full h-125 overflow-y-scroll items-start bg-green-200 pt-4 flex flex-col  ">
      {suggestion == "input is missing" ? (
        <div className="w-full h-125 flex flex-col justify-center items-center">
          <Comment
            visible={true}
            height="40"
            width="40"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#F4442E"
          />
          <RiRobot2Line className="text-[60px] ml-10" />
          <h1 className="text-[12px] text-center animate-pulse">
            wait we suggest you the best avialble models
          </h1>
        </div>
      ) : (
        <div className="p-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {suggestion}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};
