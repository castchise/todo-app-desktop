import type { TodoListItem } from "@/types";
import TodoItem from "@/components/TodoItem";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TodoItemListProps {
  todoList: TodoListItem[];
  className?: string;
}

export default function TodoItemList({
  todoList,
  className,
}: TodoItemListProps) {
  return (
    <ScrollArea className={cn("h-screen", className)}>
      {todoList.map((todoListItem) => (
        <TodoItem key={todoListItem.id} className="mb-4" {...todoListItem} />
      ))}
    </ScrollArea>
  );
}
