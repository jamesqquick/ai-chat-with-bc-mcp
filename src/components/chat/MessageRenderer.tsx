import React from "react";
import { ProductSearchResult } from "./ProductSearchResult";
import { CartOperationResult } from "./CartOperationResult";
import { CheckoutResult } from "./CheckoutResult";
import { ToolErrorResult } from "./ToolErrorResult";
import { TextMessage } from "./TextMessage";
import { FallbackToolResult } from "./FallbackToolResult";

type MessageRendererProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  part: any;
  isUser: boolean;
};

export function MessageRenderer({ part, isUser }: MessageRendererProps) {
  if (part.type === "dynamic-tool" && part.output?.isError) {
    return <ToolErrorResult toolName={part.toolName} />;
  }

  if (part.type === "text") {
    return <TextMessage text={part.text} isUser={isUser} />;
  }

  if (part.type === "reasoning") {
    return (
      <TextMessage text={`🤔 Reasoning: ${part.reasoning}`} isUser={false} />
    );
  }

  if (part.type === "dynamic-tool") {
    switch (part.toolName) {
      case "search_products":
        return (
          <ProductSearchResult
            products={part.output?.structuredContent?.products}
          />
        );

      case "add_item_to_cart":
        return (
          <CartOperationResult cart={part.output?.structuredContent?.cart} />
        );

      case "create_checkout_url":
        return (
          <CheckoutResult
            checkoutURL={part.output?.structuredContent?.checkoutURL}
          />
        );

      default:
        return <FallbackToolResult toolName={part.toolName} />;
    }
  }
}
