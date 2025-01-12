import AddNewTodoForm from "@/components/AddNewTodoForm";
import TodoItemList from "@/components/TodoItemList";
import { useGlobalContext } from "@/contexts";
import { Separator } from "@/components/ui/separator";
import DarkThemeSwitch from "./DarkThemeSwitch";
import { cn } from "@/lib/utils";

export default function RootLayout() {
  const { todoList, darkmode } = useGlobalContext();

  return (
    <div className={cn(darkmode && "dark")}>
      <div
        className={
          "w-full h-screen p-4 flex flex-col sm:p-8 dark:bg-gray-900 dark:text-white"
        }
      >
        <AddNewTodoForm />

        {todoList.length > 0 ? (
          <TodoItemList todoList={todoList} className="mt-8" />
        ) : (
          <p className="flex justify-center items-center flex-grow text-lg sm:text-2xl font-light tracking-wide text-slate-400 pointer-events-none">
            No tasks to track yet...
          </p>
        )}

        <Separator className="my-8" />
        <div className="w-full flex items-center justify-between">
          <DarkThemeSwitch />
          <p className="font-semibold text-sm">Total: 00:00:00</p>
        </div>
      </div>
    </div>
  );
}
