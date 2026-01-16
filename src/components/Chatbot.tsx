import { useState, useEffect, useRef } from 'react';
import { OpenRouter } from "@openrouter/sdk";
import ReactMarkdown from 'react-markdown';
import { coursesList } from '../data/coursesList';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Loader2,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
const ai = apiKey ? new OpenRouter({ apiKey }) : null;

interface Message {
  text: string;
  isUser: boolean;
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! Welcome to NEWUS Learner Hub! I'm your course assistant. Ask me anything about our courses, durations, placement opportunities, or course types! ✨", isUser: false }
  ]);
  const [model, setModel] = useState<string>("meta-llama/llama-3.3-70b-instruct:free");
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We'll handle scrolling differently with ScrollArea if needed, 
    // but the viewport element usually works.
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!ai) {
      setMessages(prev => [...prev, { text: "Error: No API Key found in .env file (VITE_OPENROUTER_API_KEY).", isUser: false }]);
      return;
    }

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botMessagePlaceholder = { text: "", isUser: false };
    setMessages(prev => [...prev, botMessagePlaceholder]);

    // Sanitize course list to remove JSX elements
    const sanitizedCourses = coursesList.map(course => ({
      name: course.name,
      description: course.description,
      outcome: course.outcome,
      duration: course.duration,
      tools: course.tools.map(t => t.type),
      content: course.content,
      placement: course.placement,
      type: course.type,
      coursetype: course.coursetype
    }));

    try {
      const stream = await ai.chat.send({
        model: model,
        messages: [
          {
            role: "system" as const,
            content: `You are a helpful assistant for NEWUS Learner Hub. 
Use the following course data to answer user questions. 
If the answer is not found in the data, state that you do not have that information.
Format your responses using Markdown for better readability.
Data: ${JSON.stringify(sanitizedCourses)}`
          },
          ...messages.map(m => ({
            role: (m.isUser ? "user" : "assistant") as "user" | "assistant",
            content: m.text
          })),
          { role: "user" as "user", content: input }
        ],
        stream: true
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          fullResponse += content;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { text: fullResponse, isUser: false };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          text: `Error: ${(error as any).message || "Something went wrong."}`,
          isUser: false
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "mb-4 w-[95vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col overflow-hidden",
            "glass glow-primary rounded-2xl border border-border/50 shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300"
          )}
        >
          {/* Header */}
          <div className="p-4 bg-primary/10 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Bot size={24} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">NEWUS Assistant</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                <Minimize2 size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-4 min-h-full">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
                    msg.isUser ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    {msg.isUser ? (
                      <>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase">You</span>
                        <User size={12} className="text-muted-foreground" />
                      </>
                    ) : (
                      <>
                        <Bot size={12} className="text-primary" />
                        <span className="text-[10px] text-primary font-medium uppercase italic">Assistant</span>
                      </>
                    )}
                  </div>
                  <div
                    className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.isUser
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-secondary/50 border border-border/50 text-foreground rounded-tl-none backdrop-blur-sm"
                    )}
                  >
                    {msg.isUser ? msg.text : (
                      <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1].text === "" && (
                <div className="mr-auto items-start max-w-[85%] animate-pulse">
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <Bot size={12} className="text-primary" />
                    <span className="text-[10px] text-primary font-medium uppercase italic">Thinking...</span>
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-secondary/50 border border-border/50 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Assistant is typing...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-md">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question..."
                disabled={isLoading}
                className="w-full bg-secondary/30 border border-border/50 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground text-foreground"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform active:scale-95"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
              <Sparkles size={10} className="text-primary" />
              <span>Powered by NEWUS Learner Hub AI</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-2xl glow-primary bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center border-none"
        >
          <MessageCircle size={28} className="text-primary-foreground" />
        </Button>
      )}
    </div>
  );
}

export default Chatbot;
