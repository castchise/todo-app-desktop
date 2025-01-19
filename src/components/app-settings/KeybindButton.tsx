import { ReactNode } from "react";

export default function KeyboardButton({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-sm border-2 px-2 py-1 text-sm font-semibold shadow-md">
      {children}
    </div>
  );
}
