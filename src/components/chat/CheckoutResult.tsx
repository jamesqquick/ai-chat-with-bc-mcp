import React from "react";
import { Bot } from "lucide-react";

type CheckoutResultProps = {
  messageId: string;
  partIndex: number;
};

export function CheckoutResult({ messageId, partIndex }: CheckoutResultProps) {
  return (
    <div
      key={`${messageId}-${partIndex}`}
      className="rounded-lg px-4 py-3 bg-blue-50 border border-blue-200"
    >
      <div className="flex items-start gap-3">
        <Bot className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-800">
            Checkout URL Generated
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Your checkout URL has been created successfully.
          </p>
        </div>
      </div>
    </div>
  );
}
