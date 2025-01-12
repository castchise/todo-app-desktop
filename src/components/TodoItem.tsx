import { TodoListItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TaskItemProps extends TodoListItem {
  className?: string;
}

export default function TaskItem({
  name,
  timeSpent,
  paused,
  className,
}: TaskItemProps) {
  const truncatedName = name.substring(0, 75);
  const [isShowTruncatedText, setIsShowTruncatedText] = useState(true);
  const [isPaused, setIsPaused] = useState(paused);

  return (
    <div
      className={cn(
        "p-4 border rounded flex items-start flex-wrap sm:flex-nowrap",
        className
      )}
    >
      <Button
        size="icon"
        variant="outline"
        className="dark:bg-gray-900 flex-shrink-0"
        onClick={() => setIsPaused(!isPaused)}
      >
        {isPaused ? <Pause /> : <Play />}
      </Button>

      <p className="font-semibold self-center order-last w-full flex-grow mt-4 sm:mt-0 sm:order-none sm:mx-4">
        {isShowTruncatedText ? truncatedName : name}
        {name.length > 75 && (
          <button
            type="button"
            onClick={() => setIsShowTruncatedText(!isShowTruncatedText)}
            className="hover:underline ml-0.5"
          >
            [...]
          </button>
        )}
      </p>

      <div className="ml-auto flex items-center">
        <p>{timeSpent}:00:00</p>
        <Button size="icon" variant="ghost" className="ml-4">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
