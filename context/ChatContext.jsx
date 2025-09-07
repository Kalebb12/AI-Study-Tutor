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
        body: JSON.stringify({ msg , chat: messages }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      let aiMessage = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiMessage += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage?.role === "assistant") {
            lastMessage.content = aiMessage;
          } else {
            newMessages.push({ role: "assistant", content: aiMessage });
          }
          return newMessages;
        });
      }
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
