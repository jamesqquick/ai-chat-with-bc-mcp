import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { cookies } from "next/headers";
import { getClient } from "@/lib/mcpClient";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const cookieStore = await cookies();
  const mcpSessionId = cookieStore.get("mcp-session-id")?.value;

  try {
    const { client, sessionId } = await getClient(mcpSessionId ?? undefined);

    const tools = await client.tools();

    const result = streamText({
      model: openai("gpt-4.1-mini"),
      messages: convertToModelMessages(messages),
      tools,
      onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {},
    });

    const response = result.toUIMessageStreamResponse();

    //store the session id in a cookie
    if (sessionId) {
      cookieStore.set("mcp-session-id", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 86400, // 24 hours
      });
    }

    return response;
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
