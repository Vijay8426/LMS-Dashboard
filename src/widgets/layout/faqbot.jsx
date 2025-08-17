import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography, Input, Button } from "@material-tailwind/react";

export function FAQChatbot({ open, onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m your assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `You asked: "${input}". I’ll get back to you! 😊` },
      ]);
    }, 600);

    setInput("");
  };

  // Auto scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white shadow-lg 
      transition-transform duration-500 ease-in-out flex flex-col
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <Typography variant="h6" color="blue-gray">
          FAQ Assistant
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                msg.from === "user"
                  ? "bg-blue-200 text-blue-900 rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 flex items-center gap-2">
        <Input
          variant="outlined"
          label="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          crossOrigin={undefined}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button variant="gradient" color="blue-gray" onClick={sendMessage}>
          <PaperAirplaneIcon className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}

FAQChatbot.displayName = "/src/widgets/layout/faq-chatbot.jsx";

export default FAQChatbot;
