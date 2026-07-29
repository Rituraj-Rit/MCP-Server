import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create MCP server
const server = new McpServer({
  name: "Demo MCP Server",
  version: "1.0.0",
});

// Register Tool
server.registerTool(
  {
    title: "Add Two Numbers",
    description: "A tool that adds two numbers together.",
    inputSchema: z.object({
      a: z.number().describe("The first number to add."),
      b: z.number().describe("The second number to add."),
    }),
  },
  async ({ a, b }) => {
    return { content: [{ type: "text", text: String(a + b) }] };
  },
);

// Start server
const transport = new StdioServerTransport();

await server.connect(transport);
