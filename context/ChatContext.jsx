"use client";
import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  async function fetchResponse(msg) {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {msg} ),
      });

      const { message } = await res.json();

      // Add AI response
      const aiMessage = { role: "assistant", content: message };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("error from catch", err);
      const errMessage = {
        role: "assistant",
        content: "⚠️ Error connecting to AI.",
      };
      setMessages((prev) => [...prev, errMessage]);
    }
  }

  const sendMessage = (msg) => {
    // Add user message
    const newMessage = { role: "user", content: msg };
    setMessages((prev) => [...prev, newMessage]);

    // Fetch AI response
    fetchResponse(msg);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
