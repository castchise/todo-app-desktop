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
  isPaused,
  className,
}: TaskItemProps) {
  const [pause, setPause] = useState(isPaused);

  return (
    <div className={cn("p-4 border rounded flex items-center", className)}>
      <Button
        size="icon"
        variant="outline"
        className=""
        onClick={() => setPause(!pause)}
      >
        {pause ? <Pause /> : <Play />}
      </Button>

      <p className="ml-4 font-semibold">{name}</p>

      <div className="ml-auto flex items-center">
        <p>{timeSpent}:00:00</p>
        <Button size="icon" variant="ghost" className="ml-4">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
