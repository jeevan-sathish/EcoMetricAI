import api from "@/services/api";
import { useEffect, useRef, useState } from "react";

const CustomChatBot = () => {
  const [input, setInput] = useState("");
  const inpRef = useRef();
  const [customChatResponse, setCustomChatResponse] = useState("");

  useEffect(() => {
    inpRef.current.focus();
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChatSubmit();
      inpRef.current.value = "";
    }
  }
  const token = localStorage.getItem("access_token");
  async function handleChatSubmit() {
    try {
      const response = await api.post(
        "/customChatResponse",
        { userInput: input },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCustomChatResponse(response.data.result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="full h-full bg-zinc-black rounded-2xl p-0 flex flex-col justify-center items-center gap-3">
      <div className="w-full h-[100px] rounded-2xl bg-gray-900 flex flex-row justify-center items-center gap-3">
        <input
          ref={inpRef}
          type="text"
          value={input}
          onKeyDown={handleKeyDown}
          placeholder="Ask me any thing?"
          onChange={(e) => setInput(e.target.value)}
          className="w-[460px] h-[50px] bg-gray-800 rounded-2xl pl-[20px] text-gray-200"
        />
        <button
          onClick={handleChatSubmit}
          className="rounded-2xl text-white bg-green-600 font-bold w-[100px] p-3.5"
        >
          submit
        </button>
      </div>
      <div className="w-full h-[800px] rounded-2xl bg-zinc-950">
        {customChatResponse && (
          <div className="w-full h-full p-5 text-gray-200">
            {customChatResponse}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomChatBot;
