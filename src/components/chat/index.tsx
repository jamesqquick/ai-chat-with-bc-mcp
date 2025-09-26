"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { ProductList } from "@/vibes/soul/sections/product-list";

// TypeScript types for message parts
type TextPart = {
  type: "text";
  text: string;
};

type Product = {
  entityId: string;
  name: string;
  defaultImage?: {
    url: string;
  };
};

type Cart = {
  entityId: string;
};

type ToolOutput = {
  structuredContent?: {
    products?: Product[];
    cart?: Cart;
  };
  content?: {
    isError?: boolean;
  };
};

type DynamicToolPart = {
  type: "dynamic-tool";
  toolName: string;
  output?: ToolOutput;
};

type MessagePart = TextPart | DynamicToolPart;

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log(messages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  console.log(status);
  const isLoading = status === "streaming" || status === "submitted";

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col overflow-hidden">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AI Chat Assistant
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full px-4">
          <div className="space-y-4 py-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Start a conversation by typing a message below!</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {message.role === "user" ? (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Bot className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>

                  <div className={`w-full`}>
                    {message.parts.map((partRaw, i) => {
                      const part = partRaw as MessagePart;
                      //TODO: check error at part.output?.content?.isError
                      if (part.type === "text") {
                        console.log("Text part:", part.text);
                        return (
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                            key={`${message.id}-${i}`}
                          >
                            {part.text}
                          </div>
                        );
                      } else if (
                        part.type === "dynamic-tool" &&
                        part.toolName === "search_products" &&
                        part.output?.structuredContent?.products
                      ) {
                        console.log(
                          "Tool part output:",
                          part?.output?.structuredContent
                        );
                        const products =
                          part?.output?.structuredContent?.products?.map(
                            (product) => ({
                              id: product.entityId,
                              title: product.name,
                              href: "#",
                              image: {
                                src: product.defaultImage?.url || "",
                                alt: product.name,
                              },
                            })
                          );
                        console.log(products);

                        return (
                          <ProductList
                            key={`${message.id}-${i}`}
                            products={products}
                            showCompare={false}
                          />
                        );
                      } else if (
                        part.type === "dynamic-tool" &&
                        part.toolName === "add_item_to_cart"
                      ) {
                        console.log("Add to cart tool part output:");

                        return (
                          <div key={`${message.id}-${i}`}>
                            Successfully added item(s) to your cart. Your cart
                            id is{" "}
                            {part.output?.structuredContent?.cart?.entityId}
                          </div>
                        );
                      } else if (
                        part.type === "dynamic-tool" &&
                        part.toolName === "create_checkout_url"
                      ) {
                        console.log("Create checkout URL tool part output:");

                        return (
                          <div key={`${message.id}-${i}`}>
                            Generated a checkout URL
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  </div>

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
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex-shrink-0 p-4">
        <form onSubmit={onSubmit} className="flex gap-2 w-full">
          <Input
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
            autoFocus
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
