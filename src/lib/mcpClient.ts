"use server";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { experimental_createMCPClient, experimental_MCPClient } from "ai";

let mcpClient: experimental_MCPClient | null = null;

export async function getClient() {
  if (!process.env.MCP_SERVER_URL) {
    console.error("MCP_SERVER_URL is not set");

    throw new Response("MCP_SERVER_URL is not set", { status: 500 });
  }

  if (mcpClient) {
    return mcpClient;
  }

  const transport = new StreamableHTTPClientTransport(
    new URL(process.env.MCP_SERVER_URL)
  );

  mcpClient = await experimental_createMCPClient({
    transport,
  });

  return mcpClient;
}
