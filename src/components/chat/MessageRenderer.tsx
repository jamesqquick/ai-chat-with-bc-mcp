import React from "react";
import { ProductSearchResult } from "./ProductSearchResult";
import { CartOperationResult } from "./CartOperationResult";
import { CheckoutResult } from "./CheckoutResult";
import { ToolErrorResult } from "./ToolErrorResult";
import { TextMessage } from "./TextMessage";
import { FallbackToolResult } from "./FallbackToolResult";

type MessageRendererProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  part: any; // Using any to be compatible with AI SDK's UIMessagePart types
  messageId: string;
  partIndex: number;
  isUser: boolean;
};

export function MessageRenderer({
  part,
  messageId,
  partIndex,
  isUser,
}: MessageRendererProps) {
  if (part.type === "dynamic-tool" && part.output?.isError) {
    return (
      <ToolErrorResult
        messageId={messageId}
        partIndex={partIndex}
        toolName={part.toolName}
      />
    );
  }

  if (part.type === "text") {
    return (
      <TextMessage
        messageId={messageId}
        partIndex={partIndex}
        text={part.text}
        isUser={isUser}
      />
    );
  }

  if (part.type === "reasoning") {
    return (
      <TextMessage
        messageId={messageId}
        partIndex={partIndex}
        text={`🤔 Reasoning: ${part.reasoning}`}
        isUser={false}
      />
    );
  }

  if (part.type === "dynamic-tool") {
    switch (part.toolName) {
      case "search_products":
        return (
          <ProductSearchResult
            messageId={messageId}
            partIndex={partIndex}
            products={part.output?.structuredContent?.products}
          />
        );

      case "add_item_to_cart":
        return (
          <CartOperationResult
            messageId={messageId}
            partIndex={partIndex}
            cart={part.output?.structuredContent?.cart}
          />
        );

      case "create_checkout_url":
        return <CheckoutResult messageId={messageId} partIndex={partIndex} />;

      default:
        return (
          <FallbackToolResult
            messageId={messageId}
            partIndex={partIndex}
            toolName={part.toolName}
          />
        );
    }
  }
}
