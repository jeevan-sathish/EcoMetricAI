import { useEffect, useRef, useState } from "react";

const CustomChatBot = () => {
  const [input, setInput] = useState("");
  const inpRef = useRef();
  useEffect(() => {
    inpRef.current.focus();
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      window.alert("working:", input);
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
        <button className="rounded-2xl text-white bg-green-600 font-bold w-[100px] p-3.5">
          submit
        </button>
      </div>
      <div className="w-full h-[800px] rounded-2xl bg-zinc-950"></div>
    </div>
  );
};

export default CustomChatBot;
