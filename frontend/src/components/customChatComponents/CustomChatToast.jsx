import { useEffect } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const CustomChatToast = ({ toast, setToast }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="fixed top-6 right-6 z-50 flex items-start gap-3 bg-red-950 border border-red-600 text-red-200 px-4 py-3 rounded-xl shadow-lg max-w-sm animate-in fade-in slide-in-from-top-2">
      <FiAlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
      <p className="text-sm flex-1">{toast}</p>
      <button
        onClick={() => setToast(null)}
        className="text-red-400 hover:text-red-200"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CustomChatToast;
