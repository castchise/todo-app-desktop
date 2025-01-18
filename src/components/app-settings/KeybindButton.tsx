import { ReactNode } from "react";

export default function KeyboardButton({ children }: { children: ReactNode }) {
  return (
    <div className="border-2 px-2 py-1 shadow-md rounded-sm text-sm font-semibold">
      {children}
    </div>
  );
}
