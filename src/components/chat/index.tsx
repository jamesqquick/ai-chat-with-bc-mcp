"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import toast from "react-hot-toast";
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
import { MessageRenderer } from "./MessageRenderer";
import { UserMessage } from "./UserMessage";
import { BotMessage } from "./BotMessage";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }, [error]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <Card className="w-full h-[600px] flex flex-col overflow-hidden">
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

            {messages.map((message, i) => {
              const messageContent = message.parts.map((part, j) => {
                if (j === message.parts.length - 1) {
                  console.log(part);

                  if (
                    i === messages.length - 1 &&
                    isLoading &&
                    message.role !== "user"
                  ) {
                    return null;
                  }
                }

                return (
                  <div key={`${message.id}-${j}`}>
                    <MessageRenderer
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      part={part as any}
                      isUser={message.role === "user"}
                    />
                  </div>
                );
              });

              return message.role === "user" ? (
                <UserMessage key={message.id}>{messageContent}</UserMessage>
              ) : (
                <BotMessage key={message.id}>{messageContent}</BotMessage>
              );
            })}

            {isLoading && (
              <BotMessage>
                <div className="rounded-lg px-4 py-2 bg-muted">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Thinking...
                    </span>
                  </div>
                </div>
              </BotMessage>
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
