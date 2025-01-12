/* eslint-disable import/no-named-as-default-member */
import { TodoListItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn, setLocalStorageValue } from "@/lib/utils";
import { useGlobalContext } from "@/contexts";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";

dayjs.extend(duration);

interface TaskItemProps extends TodoListItem {
  className?: string;
}

export default function TaskItem(taskItem: TaskItemProps) {
  const { name, timeSpent, paused, className } = taskItem;
  const truncatedName = name.substring(0, 75);
  const [isShowTruncatedText, setIsShowTruncatedText] = useState(true);
  const [isPaused, setIsPaused] = useState(paused);
  const [time, setTime] = useState(timeSpent);
  const [intervalId, setIntervalId] = useState(null);
  const { todoList } = useGlobalContext();

  const handlePauseTask = () => {
    setIsPaused(true);
    clearInterval(intervalId);
  };

  const handleContinueTask = () => {
    setIsPaused(false);
    clearInterval(intervalId);

    const id = setInterval(() => {
      setTime((prevState) => {
        const nextState = prevState + 1;

        const updatedTodoList = todoList.map((todoListItem) => {
          if (todoListItem.id === taskItem.id) {
            return { ...todoListItem, timeSpent: nextState };
          }
          return todoListItem;
        });
        setLocalStorageValue("todoList", updatedTodoList);

        return nextState;
      });
    }, 1000);

    setIntervalId(id);
  };

  useEffect(() => () => clearInterval(intervalId), []);

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
        <p>{dayjs.duration(time, "seconds").format("HH:mm:ss")}</p>
        <Button size="icon" variant="ghost" className="ml-4">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
