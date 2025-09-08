"use client";
import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  async function fetchResponse(formData) {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
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

  const sendMessage = (msg, file, imagePreviewUrl) => {
    // Add user message
    const newMessage = { role: "user", content: msg ,image: imagePreviewUrl};
    setMessages((prev) => [...prev, newMessage]);

    const formData = new FormData()
    formData.append("message",msg)
    formData.append("chat",JSON.stringify([...messages, newMessage]))
    if (file) formData.append("file",file)

    // Fetch AI response
    fetchResponse(formData);
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
