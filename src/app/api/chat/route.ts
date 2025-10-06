// import { openai } from "@ai-sdk/openai";
// import { convertToModelMessages, streamText, UIMessage } from "ai";

export async function POST(req: Request) {
  try {
    throw new Error("Not implemented");
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
