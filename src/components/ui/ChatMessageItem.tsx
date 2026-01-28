import { memo } from "react";
import { ChatMessage } from "../Chatbot";

const ChatMessageItem = memo(({ message }: { message: ChatMessage }) => {
  
  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap ${
          message.sender === "user"
            ? "bg-gradient-to-r from-primary to-pink-500 text-white rounded-br-none"
            : "bg-secondary text-foreground rounded-bl-none"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
});

export default ChatMessageItem;
