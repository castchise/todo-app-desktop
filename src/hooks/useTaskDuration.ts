import type { TodoItemAction } from "@/types";
import { useEffect, useRef, useState } from "react";

interface useTaskDurationProps {
  timeSpent: number;
  paused: boolean;
  callback?: (callbackType?: TodoItemAction) => void;
}

export default function useTaskDuration({
  timeSpent,
  paused,
  callback,
}: useTaskDurationProps) {
  const [isPaused, setIsPaused] = useState(paused);
  const [time, setTime] = useState(timeSpent);

  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // "private methods" - used for internal hook usage
  const pauseTaskDuration = () => {
    setIsPaused(true);

    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const resumeTaskDuration = () => {
    setIsPaused(false);

    intervalId.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  // "public methods" - returning functions
  const handlePauseTask = () => {
    callback();
    pauseTaskDuration();
  };

  const handleContinueTask = () => {
    if (!isPaused) return;

    callback();
    resumeTaskDuration();
  };

  const handleRemoveTask = () => {
    handlePauseTask();
    callback("remove-item");
  };

  const handleEditTaskTime = () => {
    handlePauseTask();
    callback("edit-item");
  };

  // Cleanup
  useEffect(() => {
    return () => {
      pauseTaskDuration();
    };
  }, []);

  return {
    time,
    setTime,
    isPaused,
    handlePauseTask,
    handleContinueTask,
    handleRemoveTask,
    handleEditTaskTime,
  };
}
