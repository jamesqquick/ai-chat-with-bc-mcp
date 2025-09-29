import React from "react";

type TextMessageProps = {
  messageId: string;
  partIndex: number;
  text: string;
  isUser: boolean;
};

export function TextMessage({
  messageId,
  partIndex,
  text,
  isUser,
}: TextMessageProps) {
  return (
    <div
      className={`rounded-lg px-4 py-2 ${
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      }`}
      key={`${messageId}-${partIndex}`}
    >
      {text}
    </div>
  );
}
