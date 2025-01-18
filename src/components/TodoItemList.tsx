import type { TodoListItem } from "@/types";
import TodoItem from "@/components/TodoItem";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArrowNavigation } from "@/hooks";

interface TodoItemListProps {
  todoList: TodoListItem[];
  className?: string;
}

export default function TodoItemList({
  todoList,
  className,
}: TodoItemListProps) {
  const [selectedItem, setSelectedItem] = useArrowNavigation({ todoList });

  return (
    <div>
      <ScrollArea className={cn("h-screen", className)}>
        {todoList.map((todoListItem) => (
          <TodoItem
            key={todoListItem.id}
            className={cn(
              "mb-4",
              selectedItem.id === todoListItem.id && "border border-red-500"
            )}
            setActive={() => setSelectedItem(todoListItem)}
            {...todoListItem}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
