import AddNewTodoForm from "@/components/AddNewTodoForm";
import TodoItemList from "@/components/TodoItemList";
import { Separator } from "@/components/ui/separator";
import AppDialog from "@/components/app-settings/AppDialog";
import { useGlobalContext } from "@/contexts";
import { formatDurationToHours } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { useArrowNavigation } from "@/hooks";
import ConfirmationDialog from "./ConfirmationDialog";

export default function RootLayout() {
  const {
    todoList,
    darkmode,
    removeAllTodoItems,
    isRemovingAllTodoItems,
    setIsRemovingAllTodoItems,
  } = useGlobalContext();
  const [selectedItem, setSelectedItem] = useArrowNavigation({ todoList });

  const totalDuration = useMemo(() => {
    return todoList.reduce((sum, item) => sum + item.timeSpent, 0);
  }, [todoList]);

  useEffect(() => {
    if (darkmode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <div>
      <div
        className={
          "w-full h-screen p-4 flex flex-col sm:p-8 dark:bg-gray-900 dark:text-white"
        }
      >
        <AddNewTodoForm setSelectedItem={setSelectedItem} />

        {todoList.length > 0 ? (
          <TodoItemList
            todoList={todoList}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            className="mt-8"
          />
        ) : (
          <p className="flex justify-center items-center flex-grow text-lg sm:text-2xl font-light tracking-wide text-slate-400 pointer-events-none">
            No tasks to track yet...
          </p>
        )}

        <Separator className="my-8" />
        <div className="w-full flex items-center justify-between">
          <AppDialog />
          <p className="font-semibold text-sm">
            Total: {formatDurationToHours(totalDuration)}
          </p>
        </div>
      </div>

      <ConfirmationDialog
        open={isRemovingAllTodoItems}
        onOpenChange={setIsRemovingAllTodoItems}
        onSubmit={() => removeAllTodoItems()}
        title="Remove all Tasks?"
      />
    </div>
  );
}
