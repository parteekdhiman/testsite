
import { OpenRouter } from "@openrouter/sdk";

const apiKey = "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";

async function test() {
  const ai = new OpenRouter({
    apiKey,
    httpReferer: "https://www.newus.in/",
    xTitle: "NEWUS Learner Hub",
  });

  try {
    const completion = await ai.chat.send({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [
        { role: "user", content: "Hello" }
      ]
    });
    console.log("Success:", completion);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
