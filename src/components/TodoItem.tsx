import { TodoListItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn, formatDurationToHours } from "@/lib/utils";
import { useGlobalContext } from "@/contexts";
import ConfirmationDialog from "./ConfirmationDialog";
import EditTime from "./EditTime";
import { useTaskDuration } from "@/hooks";

interface TaskItemProps extends TodoListItem {
  className?: string;
  setActive: () => void;
}

export default function TaskItem(taskItem: TaskItemProps) {
  const { name, timeSpent, paused, className, id, setActive } = taskItem;
  const truncatedName = name.substring(0, 75);
  const [isShowTruncatedText, setIsShowTruncatedText] = useState(true);
  const [isRemovingItem, setIsRemovingItem] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const { updateTodoItem, removeTodoItem } = useGlobalContext();
  const { time, setTime, isPaused, pauseTaskDuration, resumeTaskDuration } =
    useTaskDuration({ timeSpent, paused });

  const handlePauseTask = () => {
    setActive();
    pauseTaskDuration();
  };

  const handleContinueTask = () => {
    if (!isPaused) return;

    setActive();
    resumeTaskDuration();
  };

  const handleRemoveTask = () => {
    handlePauseTask();
    setActive();
    setIsRemovingItem(true);
  };

  const handleEditTaskTime = () => {
    setActive();
    setIsEditingTime(true);
  };

  // Wait 2s for stable time value for LocalStorage update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateTodoItem(id, { timeSpent: time });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [time]);

  // Cleanup
  useEffect(() => {
    return () => {
      pauseTaskDuration();
    };
  }, []);

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
        onSubmit={() => removeTodoItem(taskItem.id)}
      />
    </div>
  );
}
