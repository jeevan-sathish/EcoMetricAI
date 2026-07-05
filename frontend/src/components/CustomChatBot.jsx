import api from "@/services/api";
import { useRef, useState } from "react";

import CustomChatField from "./customChatComponents/CustomChatField";
import CustomChatToast from "./customChatComponents/CustomChatToast";
import CustomChatInputField from "./customChatComponents/CustomChatInputField";
import useCustomChatStore from "../store/useCustomChatStore";

const CustomChatBot = () => {
  const { messages, addMessage } = useCustomChatStore();
  const [input, setInput] = useState("");
  // const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const inpRef = useRef();

  const token = localStorage.getItem("access_token");

  async function handleSend(overrideText) {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    addMessage({ role: "user", text });
    setInput("");
    setLoading(true);

    try {
      const response = await api.post(
        "/customChatResponse",
        { userInput: text },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const reply =
        response.data?.reply ||
        "Sorry, I couldn't come up with a reply for that.";

      addMessage({ role: "bot", text: reply });
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        "Something went wrong. Please try again.";
      setToast(message);
      addMessage({
        role: "bot",
        text: "Hmm, I ran into an issue with that. Try asking differently?",
      });
    } finally {
      setLoading(false);
      inpRef.current?.focus();
    }
  }

  return (
    <div className="w-full h-212.5 bg-black rounded-2xl p-4 flex flex-col gap-4">
      {toast && <CustomChatToast setToast={setToast} toast={toast} />}

      <CustomChatField
        handleSend={handleSend}
        messages={messages}
        loading={loading}
      />

      <CustomChatInputField
        inpRef={inpRef}
        input={input}
        loading={loading}
        setInput={setInput}
        handleSend={handleSend}
        messages={messages}
      />
    </div>
  );
};

export default CustomChatBot;
