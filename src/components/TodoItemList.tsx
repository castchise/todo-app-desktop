import type { TodoListItem } from "@/types";
import TodoItem from "@/components/TodoItem";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
          setActive={() => setSelectedItem(todoListItem)}
          {...todoListItem}
        />
      ))}
    </ScrollArea>
  );
}
