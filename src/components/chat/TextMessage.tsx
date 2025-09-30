import React from "react";

type TextMessageProps = {
  text: string;
  isUser: boolean;
};

export function TextMessage({ text, isUser }: TextMessageProps) {
  return (
    <div
      className={`rounded-lg px-4 py-2 ${
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      }`}
    >
      {text}
    </div>
  );
}
