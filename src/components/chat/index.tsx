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
import { Send, User, Bot, Loader2, AlertTriangle, X } from "lucide-react";
import { MessageRenderer } from "./MessageRenderer";

export default function Chat() {
  const [input, setInput] = useState("");
  const [dismissedError, setDismissedError] = useState(false);
  const { messages, sendMessage, status, error } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset dismissed error when a new error occurs
  useEffect(() => {
    if (error) {
      setDismissedError(false);
    }
  }, [error]);

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

      {/* Global Error Alert */}
      {error && !dismissedError && (
        <div className="mx-4 mb-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-800">Chat Error</p>
            <p className="text-sm text-red-700 mt-1">
              {error.message ||
                "An unexpected error occurred. Please try again."}
            </p>
          </div>
          <button
            onClick={() => setDismissedError(true)}
            className="flex-shrink-0 text-red-400 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
                    {message.parts.map((part, i) => {
                      if (i === message.parts.length - 1) {
                        console.log(part);
                      }

                      return (
                        <MessageRenderer
                          key={`${message.id}-${i}`}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          part={part as any}
                          messageId={message.id}
                          partIndex={i}
                          isUser={message.role === "user"}
                        />
                      );
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
            placeholder={
              error && !dismissedError
                ? "Fix the error above before continuing..."
                : "Type your message..."
            }
            disabled={isLoading || (error && !dismissedError)}
            className="flex-1"
            autoFocus
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim() || (error && !dismissedError)}
          >
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
