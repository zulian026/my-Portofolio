import React from "react";
import { FiMessageCircle } from "react-icons/fi";

export default function ChatBotButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6
        bg-blue-600 text-white
        p-4 rounded-full shadow-lg
        hover:scale-110 transition-all duration-300
        flex items-center justify-center
      "
      aria-label="Open Chatbot"
    >
      <FiMessageCircle size={24} />
    </button>
  );
}
