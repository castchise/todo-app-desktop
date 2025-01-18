import { useEffect } from "react";

interface useTaskHotkeysProps {
  isActive: boolean;
  isPaused: boolean;
  handlePauseTask: () => void;
  handleContinueTask: () => void;
  handleEditTaskTime: () => void;
  handleRemoveTask: () => void;
}

export default function useTaskHotkeys({
  isActive,
  isPaused,
  handlePauseTask,
  handleContinueTask,
  handleEditTaskTime,
  handleRemoveTask,
}: useTaskHotkeysProps): null {
  const handleKeyUp = (e: KeyboardEvent): null => {
    if (!isActive) return null;

    if (e.ctrlKey && e.code === "KeyE") {
      handleEditTaskTime();
    }

    if (e.code === "Delete") {
      handleRemoveTask();
    }

    if (e.code === "Space") {
      isPaused ? handleContinueTask() : handlePauseTask();
    }

    return null;
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isActive, isPaused]);

  return null;
}
