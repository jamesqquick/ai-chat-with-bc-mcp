import React from "react";
import { Bot } from "lucide-react";

interface BotMessageProps {
  children: React.ReactNode;
}

export function BotMessage({ children }: BotMessageProps) {
  return (
    <div className="flex gap-3 justify-start">
      <div className="flex gap-3 w-[80%] flex-row">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Bot className="w-4 h-4 text-secondary-foreground" />
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
