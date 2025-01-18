import { TodoListItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn, formatDurationToHours } from "@/lib/utils";
import { useGlobalContext } from "@/contexts";
import ConfirmationDialog from "./ConfirmationDialog";
import EditTime from "./EditTime";
import { useTaskDuration, useTaskHotkeys } from "@/hooks";

interface TaskItemProps extends TodoListItem {
  className?: string;
  isActive: boolean;
  setSelectedItem: (value: TodoListItem) => void;
}

export default function TaskItem(taskItem: TaskItemProps) {
  const { name, timeSpent, paused, className, id, isActive, setSelectedItem } =
    taskItem;
  const truncatedName = name.substring(0, 75);
  const [isShowTruncatedText, setIsShowTruncatedText] = useState(true);
  const [isRemovingItem, setIsRemovingItem] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const { updateTodoItem, removeTodoItem, todoList } = useGlobalContext();
  const { time, setTime, isPaused, pauseTaskDuration, resumeTaskDuration } =
    useTaskDuration({ timeSpent, paused });

  const setCurrentItemActive = () => setSelectedItem(taskItem);

  const handlePauseTask = () => {
    setCurrentItemActive();
    pauseTaskDuration();
  };

  const handleContinueTask = () => {
    if (!isPaused) return;

    setCurrentItemActive();
    resumeTaskDuration();
  };

  const handleRemoveTask = () => {
    handlePauseTask();
    setIsEditingTime(false);
    setCurrentItemActive();
    setIsRemovingItem(true);
  };

  const handleEditTaskTime = () => {
    handlePauseTask();
    setCurrentItemActive();
    setIsEditingTime(true);
  };

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
      className={cn(
        "p-4 border rounded flex items-start flex-wrap sm:flex-nowrap",
        className
      )}
    >
      <Button
        size="icon"
        variant="outline"
        className="dark:bg-gray-900 flex-shrink-0"
        onClick={() => (isPaused ? handleContinueTask() : handlePauseTask())}
      >
        {isPaused ? <Play /> : <Pause />}
      </Button>

      <p className="font-semibold self-center order-last w-full flex-grow mt-4 sm:mt-0 sm:order-none sm:mx-4">
        {isShowTruncatedText ? truncatedName : name}
        {name.length > 75 && (
          <button
            type="button"
            onClick={() => setIsShowTruncatedText(!isShowTruncatedText)}
            className="hover:underline ml-0.5"
          >
            [...]
          </button>
        )}
      </p>

      <div className="ml-auto flex items-center">
        {isEditingTime ? (
          <EditTime
            time={time}
            setTime={setTime}
            setIsEditing={setIsEditingTime}
            isActiveItem={isActive}
            setActiveItem={setCurrentItemActive}
          />
        ) : (
          <Button
            variant="ghost"
            className="font-normal text-md"
            onClick={handleEditTaskTime}
          >
            {formatDurationToHours(time)}
          </Button>
        )}
        <Button size="icon" variant="ghost" onClick={handleRemoveTask}>
          <Trash2 />
        </Button>
      </div>

      <ConfirmationDialog
        open={isRemovingItem}
        onOpenChange={setIsRemovingItem}
        onSubmit={() => {
          const currentIndex = todoList.findIndex(
            (todoListItem) => todoListItem.id === taskItem.id
          );
          const nextItem =
            currentIndex === todoList.length - 1
              ? todoList[0]
              : todoList[currentIndex + 1];
          setSelectedItem(nextItem);
          removeTodoItem(taskItem.id);
        }}
      />
    </div>
  );
}
