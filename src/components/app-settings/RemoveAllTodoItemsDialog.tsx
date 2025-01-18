import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/contexts";
import { Trash2 } from "lucide-react";

export function RemoveAllTodoItemsDialog() {
  const [isRemovingItems, setIsRemovingItems] = useState(false);
  const { todoList, removeAllTodoItems } = useGlobalContext();
  return (
    <>
      <div className="flex items-center">
        <Button
          disabled={todoList.length === 0}
          onClick={() => setIsRemovingItems(true)}
          variant="ghost"
          size="icon"
        >
          <Trash2 color="red" />
        </Button>
        <p className="font-semibold ml-2 text-red-500">Remove all Tasks</p>
      </div>

      <ConfirmationDialog
        open={isRemovingItems}
        onOpenChange={setIsRemovingItems}
        onSubmit={() => removeAllTodoItems()}
      />
    </>
  );
}
