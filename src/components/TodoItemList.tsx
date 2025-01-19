import type { TodoListItem } from "@/types";
import TodoItem from "@/components/TodoItem";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { useGlobalContext } from "@/contexts";

interface TodoItemListProps {
  todoList: TodoListItem[];
  className?: string;
  selectedItem: TodoListItem;
  setSelectedItem: (value: TodoListItem) => void;
}

export default function TodoItemList({
  todoList,
  className,
  selectedItem,
  setSelectedItem,
}: TodoItemListProps) {
  const { setIsRemovingAllTodoItems } = useGlobalContext();

  const handleKeyUp = (e: KeyboardEvent) => {
    if (!e.ctrlKey || e.code !== "KeyD") return;

    setIsRemovingAllTodoItems(true);
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.addEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <ScrollArea className={cn("h-screen", className)}>
      {todoList.map((todoListItem) => (
        <TodoItem
          key={todoListItem.id}
          className={cn(
            "mb-4",
            selectedItem?.id === todoListItem?.id && "border border-red-500"
          )}
          isActive={selectedItem?.id === todoListItem?.id}
          setSelectedItem={setSelectedItem}
          {...todoListItem}
        />
      ))}
    </ScrollArea>
  );
}
