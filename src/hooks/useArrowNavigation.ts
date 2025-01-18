import type { TodoListItem } from "@/types";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useArrowNavigation({
  todoList,
}: {
  todoList: TodoListItem[];
}): [TodoListItem, Dispatch<SetStateAction<TodoListItem>>] {
  const [selectedItem, setSelectedItem] = useState<TodoListItem | null>(
    todoList.length > 0 ? todoList[0] : null
  );
  const selectedItemId = useRef<string>(selectedItem?.id);

  const handleTodoItemSelect = useCallback(
    (e: KeyboardEvent) => {
      if (todoList.length === 0) return;

      const currentSelectedItemId = selectedItemId.current;

      if (!currentSelectedItemId) {
        setSelectedItem(todoList[0]);
        return;
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const currentIndex = todoList.findIndex(
          (todoItem) => todoItem.id === currentSelectedItemId
        );

        let nextItem: TodoListItem;

        if (e.key === "ArrowUp") {
          nextItem =
            currentIndex === 0
              ? todoList[todoList.length - 1]
              : todoList[currentIndex - 1];
        } else {
          nextItem =
            currentIndex === todoList.length - 1
              ? todoList[0]
              : todoList[currentIndex + 1];
        }

        setSelectedItem(nextItem);
      }
    },
    [todoList]
  );

  useEffect(() => {
    if (!selectedItem) return;

    selectedItemId.current = selectedItem.id;
  }, [selectedItem]);

  useEffect(() => {
    document.addEventListener("keydown", handleTodoItemSelect);

    return () => {
      document.removeEventListener("keydown", handleTodoItemSelect);
    };
  }, [handleTodoItemSelect]);

  return [selectedItem, setSelectedItem];
}