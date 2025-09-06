"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";

export default function ChatPage() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage({ role: "user", content: input });
    setInput("");
    // Later: call your AI API here
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.role]);

  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Chat Window */}
      <Card className="flex-1 m-4 shadow-lg border rounded-2xl overflow-hidden">
        <CardContent className="flex flex-col h-full p-4 overflow-y-auto space-y-4 overflow-x-clip">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "max-w-[70%] p-3 rounded-2xl text-sm shadow-sm",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground self-end"
                  : "bg-muted text-foreground self-start tracking-normal text-base leading-relaxed",
                  "whitespace-pre-wrap break-words break-all prose prose-sm sm:prose-base  dark:prose-invert"
              )}
            >
              <Markdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeHighlight, rehypeKatex]}
                // className="prose prose-sm sm:prose-base max-w-none dark:prose-invert"
              >
                {msg.content}
              </Markdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Input Section */}
      <div className="p-4 border-t fixed bottom-0 left-0 right-0 bg-background">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-2xl"
          />
          <Button onClick={handleSend} className="rounded-2xl px-6">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
