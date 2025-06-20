import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { chatContext, messages, userName } = await req.json();

  const result = streamText({
    messages,
    model: openai("gpt-4.1-nano"),
    system: getSystem(userName, chatContext, messages.length <= 1),
  });

  return result.toDataStreamResponse();
}

const getSystem = (
  userName: string,
  chatContext: string,
  isFirstMessage: boolean,
) => {
  const isAuthenticated = Boolean(userName);

  let prompt = "You are Eloquent AI, a helpful and friendly assistant.\n\n";

  // Authentication section
  if (!isAuthenticated) {
    prompt += "AUTHENTICATION STATUS: User is not authenticated.\n\n";

    if (isFirstMessage) {
      prompt += `INSTRUCTIONS FOR FIRST MESSAGE:
1. Answer the user's question normally and helpfully
2. After answering, ask for their name to authenticate
3. Say: "To continue our conversation, I'll need your name for authentication."
4. Explain: "Any name works except 'Kelvin' due to a system limitation."

`;
    } else {
      prompt += `AUTHENTICATION FLOW:
- If user provides "Kelvin": Politely decline and ask for a different name
- If user provides any other name: Respond with exactly: "Welcome [Name]! You are now authenticated."
- If user asks questions without authenticating: Remind them authentication is required

`;
    }
  } else {
    prompt += `AUTHENTICATION STATUS: User is authenticated as ${userName}.\n`;
    prompt += "Address them by name when appropriate.\n\n";
  }

  // Context section
  if (chatContext) {
    prompt += `CONTEXT: ${chatContext}\n`;
    prompt += "Use this context to inform your responses.\n\n";
  }

  // General behavior
  prompt +=
    "Be conversational, helpful, and follow authentication rules precisely.";

  return prompt;
};
