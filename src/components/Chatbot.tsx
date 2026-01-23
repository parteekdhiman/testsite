import { useState, useRef, useEffect, memo, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApiCall } from "@/hooks/useApi";
import ChatMessageItem from "./ui/ChatMessageItem";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const MAX_HISTORY = 10;

const Chatbot = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text:
        "👋 Hello! Welcome to NEWUS Learner Hub! Ask me about courses, duration, or placements.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { execute: sendChatMessage, isLoading: isApiLoading } = useApiCall(
    async (data: { message: string; conversationHistory: ChatMessage[] }) => {
      const trimmedHistory = data.conversationHistory.slice(-MAX_HISTORY);

      const response = await fetch(
        "https://newusmailer.vercel.app/api/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: data.message,
            conversationHistory: trimmedHistory.map((m) => ({
              sender: m.sender,
              text: m.text,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Chatbot API failed");
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: data.response,
            sender: "bot",
            timestamp: new Date(data.timestamp),
          },
        ]);
      },
    }
  );

  const handleSendMessage = useCallback(() => {
    if (isApiLoading || !inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputValue("");

    sendChatMessage({
      message: inputValue,
      conversationHistory: updatedMessages,
    });
  }, [inputValue, messages, isApiLoading, sendChatMessage]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white flex items-center justify-center"
        >
          <MessageCircle />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 h-[600px] bg-background border rounded-lg flex flex-col">
          <div className="bg-gradient-to-r from-primary to-pink-500 text-white p-4 flex justify-between">
            <h3 className="font-semibold">Course Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          <ScrollArea className="flex-1 p-4 space-y-4">
            {messages.map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} />
            ))}
            {isApiLoading && <p className="text-sm">Typing…</p>}
            <div ref={scrollRef} />
          </ScrollArea>

          <div className="p-4 border-t flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about courses..."
              disabled={isApiLoading}
            />
            <Button onClick={handleSendMessage} disabled={isApiLoading}>
              <Send />
            </Button>
          </div>
        </div>
      )}
    </>
  );
});

export default Chatbot;
