import React from "react";
import { AlertTriangle } from "lucide-react";

type ToolErrorResultProps = {
  toolName: string;
};

export function ToolErrorResult({ toolName }: ToolErrorResultProps) {
  return (
    <div className="rounded-lg px-4 py-3 bg-red-50 border border-red-200">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-red-800">
            Tool Error: {toolName}
          </p>
          <p className="text-sm text-red-700 mt-1">
            Failed to execute {toolName}. Please try again.
          </p>
        </div>
      </div>
    </div>
  );
}
