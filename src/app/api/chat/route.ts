import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages, experimental_createMCPClient, experimental_MCPClient, streamText, UIMessage
} from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

let mcpClient: experimental_MCPClient | null = null;

async function getClient() {
  if (!process.env.MCP_SERVER_URL) {
    console.error("MCP_SERVER_URL is not set");

    throw new Response("MCP_SERVER_URL is not set", { status: 500 });
  }

  if (mcpClient) {
    return mcpClient;
  }

  const transport = new StreamableHTTPClientTransport(
    new URL(process.env.MCP_SERVER_URL),
  );

  mcpClient = await experimental_createMCPClient({
    transport,
  });

  return mcpClient;
}

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
