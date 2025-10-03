import React from "react";
import { Bot } from "lucide-react";
import { TextMessage } from "./TextMessage";
import { ProductSearchResult } from "./ProductSearchResult";
import { CartOperationResult } from "./CartOperationResult";
import { CheckoutResult } from "./CheckoutResult";
import { ToolErrorResult } from "./ToolErrorResult";

interface BotMessageProps {
  part?: any;
  children?: React.ReactNode;
}

export function BotMessage({ part, children }: BotMessageProps) {
  let content = null;

  if (part) {
    if (part.type === "text") {
      content = <TextMessage text={part.text} />;
    } else if (part.type === "dynamic-tool" && part.output?.isError) {
      content = <ToolErrorResult toolName={part.toolName} />;
    } else if (part.type === "dynamic-tool") {
      switch (part.toolName) {
        case "search_products":
          content = (
            <ProductSearchResult
              products={part.output?.structuredContent?.products}
            />
          );
          break;
        case "add_item_to_cart":
          content = (
            <CartOperationResult cart={part.output?.structuredContent?.cart} />
          );
          break;
        case "create_checkout_url":
          content = (
            <CheckoutResult
              checkoutURL={part.output?.structuredContent?.checkoutURL}
            />
          );
          break;
      }
    } else {
      return null;
    }
  } else if (children) {
    content = children;
  } else {
    content = null;
  }

  return (
    <div className="flex gap-3 justify-start">
      <div className="flex gap-3 w-[80%] flex-row">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Bot className="w-4 h-4 text-secondary-foreground" />
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-2">
            <div className="rounded-lg px-4 py-2 bg-muted">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
