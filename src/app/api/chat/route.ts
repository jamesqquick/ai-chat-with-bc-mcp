import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  experimental_createMCPClient,
  experimental_MCPClient,
  streamText,
  UIMessage,
} from "ai";
import { getClient } from "@/lib/mcpClient";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    const client = await getClient();

    const tools = await client.tools();

    const result = streamText({
      model: openai("gpt-4.1-mini"),
      messages: convertToModelMessages(messages),
      tools,
      onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
        console.log(text, toolCalls, toolResults, finishReason, usage);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
