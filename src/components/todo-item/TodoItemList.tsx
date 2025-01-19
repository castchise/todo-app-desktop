import type { TodoListItem } from "@/types";
import TodoItem from "@/components/todo-item/TodoItem";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { useGlobalContext } from "@/contexts";
import { useScrollTaskIntoView } from "@/hooks";

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
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollTaskIntoView({ containerRef, selectedItem });

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
    <ScrollArea ref={containerRef} className={cn("h-screen", className)}>
      {todoList.map((todoListItem) => (
        <TodoItem
          key={todoListItem.id}
          className={cn(
            "mb-4 border-2",
            selectedItem?.id === todoListItem?.id
              ? "border-gray-500"
              : "border-gray-100 dark:border-gray-800"
          )}
          isActive={selectedItem?.id === todoListItem?.id}
          setSelectedItem={setSelectedItem}
          {...todoListItem}
        />
      ))}
    </ScrollArea>
  );
}
