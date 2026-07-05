import { useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";

const CustomChatInputField = ({
  input,
  loading,
  setInput,
  handleSend,
  messages,
}) => {
  const inpRef = useRef();
  useEffect(() => {
    inpRef.current?.focus();
  }, [messages, loading]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }
  return (
    <div className="w-full bg-gray-900 rounded-2xl flex flex-row items-center gap-3 p-3">
      <input
        ref={inpRef}
        type="text"
        value={input}
        onKeyDown={handleKeyDown}
        placeholder="Ask about a brand, emissions, mileage..."
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        className="flex-1 h-[50px] bg-gray-800 rounded-xl pl-4 text-gray-200 outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
      />
      <button
        onClick={() => handleSend()}
        disabled={loading || !input.trim()}
        className="rounded-xl text-white bg-green-600 hover:bg-green-500 disabled:bg-green-900 disabled:cursor-not-allowed font-bold px-6 h-[50px] transition-colors flex items-center justify-center"
      >
        {loading ? (
          <ThreeDots
            visible={true}
            height="20"
            width="20"
            color="#ffffff"
            radius="9"
            ariaLabel="submitting"
          />
        ) : (
          "Send"
        )}
      </button>
    </div>
  );
};

export default CustomChatInputField;
