import { Button } from "../ui/button";
import { useGlobalContext } from "@/contexts";
import { cn } from "@/lib/utils";

import { Trash2 } from "lucide-react";

export function RemoveAllTodoItemsDialog() {
  const { todoList, setIsRemovingAllTodoItems } = useGlobalContext();

  return (
    <div className="flex items-center">
      <Button
        disabled={todoList.length === 0}
        onClick={() => setIsRemovingAllTodoItems(true)}
        variant="ghost"
        size="icon"
      >
        <Trash2 color={cn(todoList.length > 0 ? "red" : "currentColor")} />
      </Button>
      <p
        className={cn(
          "ml-2 text-sm",
          todoList.length > 0 ? "text-red-500 font-semibold" : "text-slate-400"
        )}
      >
        Remove all Tasks
      </p>
    </div>
  );
}
