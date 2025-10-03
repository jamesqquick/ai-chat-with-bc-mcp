import React from "react";

type TextMessageProps = {
  text: string;
};

export function TextMessage({ text }: TextMessageProps) {
  return <span>{text}</span>;
}
