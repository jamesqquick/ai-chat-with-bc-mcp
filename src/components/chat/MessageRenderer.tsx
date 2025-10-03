import React from "react";
import { UserMessage } from "./UserMessage";
import { BotMessage } from "./BotMessage";
import { UIMessage } from "@ai-sdk/react";
import { Bot, Loader2 } from "lucide-react";

type MessageRendererProps = {
  messages: UIMessage[];
  isLoading?: boolean;
};

export function MessageRenderer({
  messages,
  isLoading = false,
}: MessageRendererProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Start a conversation by typing a message below!</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((message, messageIndex) => {
        // Skip the last message if it's from the bot and we're loading
        if (
          messageIndex === messages.length - 1 &&
          isLoading &&
          message.role !== "user"
        ) {
          return null;
        }

        return message.parts.map((part: any, partIndex: number) => {
          if (message.role === "user") {
            return (
              <UserMessage key={`${message.id}-${partIndex}`} part={part} />
            );
          } else {
            return (
              <BotMessage key={`${message.id}-${partIndex}`} part={part} />
            );
          }
        });
      })}

      {isLoading && (
        <div className="flex gap-3 justify-start">
          <div className="flex gap-3 w-[80%] flex-row">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="w-4 h-4 text-secondary-foreground" />
              </div>
            </div>
            <div className="w-full">
              <div className="space-y-2">
                <div className="rounded-lg px-4 py-2 bg-muted">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
