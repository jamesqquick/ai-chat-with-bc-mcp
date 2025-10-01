"use server";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { experimental_createMCPClient, experimental_MCPClient } from "ai";

// Cache for MCP clients by session ID
const clientCache = new Map<
  string,
  {
    client: experimental_MCPClient;
    transport: StreamableHTTPClientTransport;
  }
>();

export async function getClient(sessionId?: string) {
  if (!process.env.MCP_SERVER_URL) {
    console.error("MCP_SERVER_URL is not set");
    throw new Response("MCP_SERVER_URL is not set", { status: 500 });
  }

  let transport: StreamableHTTPClientTransport | null = null;
  let client: experimental_MCPClient | null = null;

  if (sessionId && clientCache.has(sessionId)) {
    const cached = clientCache.get(sessionId)!;
    console.log(`🚀 ~ Using cached MCP client for session: ${sessionId}`);
    transport = cached.transport;
    client = cached.client;
  } else {
    console.log(`🚀 ~ Creating new MCP client (no sessionId provided)`);

    transport = new StreamableHTTPClientTransport(
      new URL(process.env.MCP_SERVER_URL),
      {}
    );

    client = await experimental_createMCPClient({
      transport,
    });

    if (!transport || !transport.sessionId) {
      throw new Error("Transport or sessionId is not set");
    }

    clientCache.set(transport.sessionId, { client, transport });
  }

  return { client, sessionId: transport.sessionId };
}
