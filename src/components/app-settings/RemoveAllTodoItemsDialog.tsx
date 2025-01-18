import { Button } from "../ui/button";
import { useGlobalContext } from "@/contexts";
import { useRemoveAllTasksDialog } from "@/hooks";
import { Trash2 } from "lucide-react";

export function RemoveAllTodoItemsDialog() {
  const { todoList } = useGlobalContext();
  const { setIsRemovingItems } = useRemoveAllTasksDialog();

  return (
    <div className="flex items-center">
      <Button
        disabled={todoList.length === 0}
        onClick={() => setIsRemovingItems(true)}
        variant="ghost"
        size="icon"
      >
        <Trash2 color="red" />
      </Button>
      <p className="font-semibold ml-2 text-sm text-red-500">
        Remove all Tasks
      </p>
    </div>
  );
}
