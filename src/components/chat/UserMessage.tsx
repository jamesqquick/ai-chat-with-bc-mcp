import React from "react";
import { User } from "lucide-react";

interface UserMessageProps {
  children: React.ReactNode;
}

export function UserMessage({ children }: UserMessageProps) {
  return (
    <div className="flex gap-3 justify-end">
      <div className="flex gap-3 w-[80%] flex-row-reverse">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
