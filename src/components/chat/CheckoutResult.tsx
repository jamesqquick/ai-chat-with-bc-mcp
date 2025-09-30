import React from "react";
import { Bot } from "lucide-react";
import Link from "next/link";

type CheckoutResultProps = {
  checkoutURL: string;
};

export function CheckoutResult({ checkoutURL }: CheckoutResultProps) {
  return (
    <div className="rounded-lg px-4 py-3 bg-blue-50 border border-blue-200">
      <div className="flex items-start gap-3">
        <Bot className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-800">
            Checkout URL Generated
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Proceed to checkout{" "}
            <Link
              href={checkoutURL}
              target="_blank"
              className="text-blue-500 underline"
            >
              here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
