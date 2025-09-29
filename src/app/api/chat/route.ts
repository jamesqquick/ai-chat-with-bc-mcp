import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  experimental_createMCPClient,
  streamText,
  UIMessage,
} from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!process.env.MCP_SERVER_URL) {
    return new Response("MCP_SERVER_URL is not set", { status: 500 });
  }

  try {
    const transport = new StreamableHTTPClientTransport(
      new URL(process.env.MCP_SERVER_URL)
    );

    const stdioClient = await experimental_createMCPClient({
      transport,
    });

    const tools = await stdioClient.tools();

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
