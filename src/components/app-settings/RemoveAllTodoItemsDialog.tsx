import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/contexts";

export function RemoveAllTodoItemsDialog() {
  const [isRemovingItems, setIsRemovingItems] = useState(false);
  const { todoList, removeAllTodoItems } = useGlobalContext();
  return (
    <>
      <Button
        disabled={todoList.length === 0}
        onClick={() => setIsRemovingItems(true)}
      >
        Remove all
      </Button>

      <ConfirmationDialog
        open={isRemovingItems}
        onOpenChange={setIsRemovingItems}
        onSubmit={() => removeAllTodoItems()}
      />
    </>
  );
}
