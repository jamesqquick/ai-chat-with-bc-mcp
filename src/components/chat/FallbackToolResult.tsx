import React from "react";
import { Bot } from "lucide-react";

type FallbackToolResultProps = {
  messageId: string;
  partIndex: number;
  toolName: string;
};

export function FallbackToolResult({
  messageId,
  partIndex,
  toolName,
}: FallbackToolResultProps) {
  return (
    <div
      key={`${messageId}-${partIndex}`}
      className="rounded-lg px-4 py-3 bg-gray-50 border border-gray-200"
    >
      <div className="flex items-start gap-3">
        <Bot className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-800">
            Tool Executed: {toolName}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            The tool completed execution.
          </p>
        </div>
      </div>
    </div>
  );
}
