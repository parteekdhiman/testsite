import { OpenRouter } from "@openrouter/sdk";
import { coursesList } from "@/data/coursesList";

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
const ai = apiKey ? new OpenRouter({ apiKey }) : null;

const SYSTEM_PROMPT = `You are a helpful assistant for NEWUS Learner Hub.
Use the following course data to answer user questions.
If the answer is not found in the data, state that you do not have that information.
Format your responses using Markdown for better readability (use bold for key terms, lists for features, etc).

Data: ${JSON.stringify(
  coursesList.map((course) => ({
    name: course.name,
    description: course.description,
    outcome: course.outcome,
    duration: course.duration,
    tools: course.tools.map((t) => t.type),
    content: course.content,
    placement: course.placement,
    type: course.type,
    coursetype: course.coursetype,
  }))
)}`;

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const sendMessage = async (
  messages: ChatMessage[],
  newMessage: string,
  model = "meta-llama/llama-3.3-70b-instruct:free"
) => {
  if (!ai) {
    throw new Error("API Key not found");
  }

  const responseStream = await ai.chat.send({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      })),
      { role: "user", content: newMessage },
    ],
    stream: true,
  });

  return responseStream;
};

