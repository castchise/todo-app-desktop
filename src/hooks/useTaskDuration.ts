import { useEffect, useRef, useState } from "react";

interface useTaskDurationProps {
  timeSpent: number;
  paused: boolean;
}

export default function useTaskDuration({
  timeSpent,
  paused,
}: useTaskDurationProps) {
  const [isPaused, setIsPaused] = useState(paused);
  const [time, setTime] = useState(timeSpent);

  const intervalId = useRef<NodeJS.Timeout | null>(null);

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

  // Cleanup
  useEffect(() => {
    return () => {
      pauseTaskDuration();
    };
  }, []);

  return { time, setTime, isPaused, pauseTaskDuration, resumeTaskDuration };
}
