import { TodoItemAction, TodoListItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/contexts";

import { useTaskDuration, useTaskHotkeys } from "@/hooks";
import TodoItemTitle from "./TodoItemTitle";
import TodoItemControls from "./TodoItemControls";

interface TodoItemProps extends TodoListItem {
  className?: string;
  isActive: boolean;
  setSelectedItem: (value: TodoListItem) => void;
}

export default function TodoItem(todoItem: TodoItemProps) {
  const { name, timeSpent, paused, className, id, isActive, setSelectedItem } =
    todoItem;

  const [isRemovingItem, setIsRemovingItem] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const { updateTodoItem } = useGlobalContext();

  // Add optional useState calls depending on triggered action
  const callback = (callbackType: TodoItemAction) => {
    if (callbackType === "remove-item") {
      setIsEditingTime(false);
      setIsRemovingItem(true);
    }

    if (callbackType === "edit-item") {
      setIsEditingTime(true);
    }

    setSelectedItem(todoItem);
  };

  const {
    time,
    setTime,
    isPaused,
    handlePauseTask,
    handleContinueTask,
    handleEditTaskTime,
    handleRemoveTask,
  } = useTaskDuration({ timeSpent, paused, callback });

  // Register task hotkeys
  useTaskHotkeys({
    isActive,
    isPaused,
    handlePauseTask,
    handleContinueTask,
    handleEditTaskTime,
    handleRemoveTask,
  });

  // Wait 2s for stable time value for LocalStorage update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateTodoItem(id, { timeSpent: time });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [time]);

  // Persist data when the window is closed or app is unmounted
  useEffect(() => {
    const handleBeforeUnload = () => {
      updateTodoItem(id, { timeSpent: time });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [time, id]);

  return (
    <div
      data-id={todoItem.id}
      className={cn(
        "flex flex-wrap items-start rounded border p-4 sm:flex-nowrap",
        className
      )}
    >
      <Button
        size="icon"
        variant="outline"
        className="flex-shrink-0 dark:bg-gray-900"
        onClick={() => (isPaused ? handleContinueTask() : handlePauseTask())}
      >
        {isPaused ? <Play /> : <Pause />}
      </Button>

      <TodoItemTitle name={name} />

      <TodoItemControls
        todoItem={todoItem}
        isEditingTime={isEditingTime}
        isRemovingItem={isRemovingItem}
        handleRemoveTask={handleRemoveTask}
        time={time}
        setTime={setTime}
        setIsEditingTime={setIsEditingTime}
        handleEditTaskTime={handleEditTaskTime}
        isActiveTodoItem={isActive}
        setSelectedItem={setSelectedItem}
        setIsRemovingItem={setIsRemovingItem}
      />
    </div>
  );
}
