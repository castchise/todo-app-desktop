import type { TodoListItem } from "@/types";
import TodoItem from "@/components/TodoItem";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!containerRef.current || !selectedItem) return;

    const container = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const targetElement = entry.target as HTMLElement;
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        });
      },
      {
        root: container,
        threshold: 1.0,
      }
    );

    const activeEl = container.querySelector(`[data-id="${selectedItem.id}"]`);

    if (activeEl) observer.observe(activeEl);

    return () => {
      if (activeEl) observer.unobserve(activeEl);
    };
  }, [selectedItem]);

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
