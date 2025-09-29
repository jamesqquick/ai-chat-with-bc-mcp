import React from "react";
import { Bot, AlertTriangle } from "lucide-react";

type Cart = {
  entityId: string;
};

type CartOperationResultProps = {
  messageId: string;
  partIndex: number;
  cart?: Cart;
};

export function CartOperationResult({
  messageId,
  partIndex,
  cart,
}: CartOperationResultProps) {
  if (cart?.entityId) {
    return (
      <div
        key={`${messageId}-${partIndex}`}
        className="rounded-lg px-4 py-3 bg-green-50 border border-green-200"
      >
        <div className="flex items-start gap-3">
          <Bot className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800">
              Item Added to Cart
            </p>
            <p className="text-sm text-green-700 mt-1">
              Successfully added item(s) to your cart. Cart ID: {cart.entityId}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={`${messageId}-${partIndex}`}
      className="rounded-lg px-4 py-3 bg-red-50 border border-red-200"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-red-800">
            Failed to Add to Cart
          </p>
          <p className="text-sm text-red-700 mt-1">
            Could not add item to cart. Please try again.
          </p>
        </div>
      </div>
    </div>
  );
}
