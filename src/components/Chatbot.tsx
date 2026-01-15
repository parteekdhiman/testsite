import { useState, useRef, useEffect, memo, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, sendMessage } from "@/utils/chatbotService";
import ReactMarkdown from "react-markdown";

const Chatbot = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "👋 Hello! Welcome to NEWUS Learner Hub! I'm your course assistant. Ask me anything about our courses, durations, placement opportunities, or course types!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Create a placeholder for the bot response
    const botMessageId = (Date.now() + 1).toString();
    const botMessagePlaceholder: ChatMessage = {
      id: botMessageId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessagePlaceholder]);

    try {
      const stream = await sendMessage(messages, inputValue);

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessageIndex = newMessages.length - 1;
            newMessages[lastMessageIndex] = {
              ...newMessages[lastMessageIndex],
              text: newMessages[lastMessageIndex].text + content,
            };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessageIndex = newMessages.length - 1;
        newMessages[lastMessageIndex] = {
          ...newMessages[lastMessageIndex],
          text: "Sorry, I encountered an error. Please try again later.",
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-pink-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 h-[600px] bg-background rounded-lg shadow-2xl border border-border/50 glass flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-pink-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Course Assistant</h3>
              <p className="text-xs text-white/80">Ask about our courses</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
              aria-label="Close chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap break-words ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-primary to-pink-500 text-white rounded-br-none"
                      : "bg-secondary/70 text-foreground rounded-bl-none border border-border/50"
                  }`}
                >
                  {message.sender === "user" ? (
                    message.text
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1].text === "" && (
              <div className="flex justify-start">
                <div className="bg-secondary/70 text-foreground px-4 py-2 rounded-lg rounded-bl-none border border-border/50">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border/50 p-4 bg-secondary/30">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about courses..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                className="bg-background border-border/50"
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-primary to-pink-500 hover:opacity-90 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              💡 Try: "Tell me about Data Science" or "Flagship courses"
            </p>
          </div>
        </div>
      )}
    </>
  );
});

export default Chatbot;
