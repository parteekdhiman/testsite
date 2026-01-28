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
const MAX_MESSAGES = 50; // SECURITY: Prevent unbounded memory growth

const Chatbot = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "👋 Hello! Welcome to NEWUS Learner Hub! Ask me about courses, duration, or placements.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null); // SECURITY: Timeout control

  // SECURITY: Auto-scroll to latest message, but prevent scroll flooding
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => clearTimeout(timer);
  }, [messages]);

  // SECURITY: Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const { execute: sendChatMessage, isLoading: isApiLoading } = useApiCall(
    async (data: { message: string; conversationHistory: ChatMessage[] }) => {
      // SECURITY: Validate input
      if (!data.message || typeof data.message !== 'string') {
        throw new Error('Invalid message format');
      }

      const trimmedMessage = data.message.trim();
      if (trimmedMessage.length === 0 || trimmedMessage.length > 2000) {
        throw new Error('Message must be 1-2000 characters');
      }

      const trimmedHistory = data.conversationHistory.slice(-MAX_HISTORY);

      // SECURITY: Create abort controller for timeout
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const timeoutId = setTimeout(() => abortControllerRef.current?.abort(), 15000); // 15s timeout

      try {
        const response = await fetch(
          "https://newusmailer.vercel.app/api/chatbot",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: trimmedMessage,
              conversationHistory: trimmedHistory.map((m) => ({
                sender: m.sender,
                text: m.text,
              })),
            }),
            signal: abortControllerRef.current.signal,
          },
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `API error: ${response.status}`);
        }

        return response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error('Request timeout. Please try again.');
        }
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        // SECURITY: Prevent memory leak - cap message history
        setMessages((prev) => {
          const updated = [
            ...prev,
            {
              id: Date.now().toString(),
              text: data.response || 'Unable to process response',
              sender: "bot" as const,
              timestamp: new Date(data.timestamp || new Date()),
            },
          ];
          // Keep only last MAX_MESSAGES to prevent memory bloat
          return updated.slice(-MAX_MESSAGES);
        });
      },
    },
  );

  const handleSendMessage = useCallback(() => {
    if (isApiLoading || !inputValue.trim()) return;

    const trimmedInput = inputValue.trim();
    if (trimmedInput.length > 2000) {
      alert('Message is too long. Please keep it under 2000 characters.');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];

    // SECURITY: Keep messages bounded
    if (updatedMessages.length > MAX_MESSAGES) {
      updatedMessages.splice(0, updatedMessages.length - MAX_MESSAGES);
    }

    setMessages(updatedMessages);
    setInputValue("");

    sendChatMessage({
      message: trimmedInput,
      conversationHistory: updatedMessages,
    }).catch((error) => {
      // Add error message to chat
      const errorMsg = error instanceof Error ? error.message : 'Failed to send message';
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `⚠️ ${errorMsg}`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    });
  }, [inputValue, messages, isApiLoading, sendChatMessage]);

  // SECURITY: Handle Enter key but prevent memory issues
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Open chatbot"
        >
          <MessageCircle />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 h-[600px] bg-background border rounded-lg flex flex-col shadow-lg">
          <div className="bg-gradient-to-r from-primary to-pink-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Course Assistant</h3>
            <button
              onClick={() => {
                setIsOpen(false);
                // SECURITY: Cleanup on close
                if (abortControllerRef.current) {
                  abortControllerRef.current.abort();
                }
              }}
              aria-label="Close chatbot"
              className="hover:opacity-80 transition-opacity"
            >
              <X />
            </button>
          </div>

          <ScrollArea className="flex-1 p-4 space-y-4">
            {messages.map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} />
            ))}
            {isApiLoading && <p className="text-sm text-muted-foreground">Typing…</p>}
            <div ref={scrollRef} />
          </ScrollArea>

          <div className="p-4 border-t flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.slice(0, 2000))} // Prevent oversized input
              onKeyPress={handleKeyPress}
              placeholder="Ask about courses..."
              disabled={isApiLoading}
              maxLength={2000}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isApiLoading || !inputValue.trim()}
              className="hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
});

Chatbot.displayName = 'Chatbot';

export default Chatbot;
