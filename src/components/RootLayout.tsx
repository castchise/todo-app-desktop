import AddNewTodoForm from "@/components/AddNewTodoForm";
import TodoItemList from "@/components/TodoItemList";
import { useGlobalContext } from "@/contexts";

export default function RootLayout() {
  const { todoList } = useGlobalContext();

  return (
    <div className="w-full h-screen p-4 flex flex-col sm:p-8">
      <AddNewTodoForm />

      {todoList.length > 0 ? (
        <TodoItemList todoList={todoList} />
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <p className="text-lg sm:text-2xl font-light tracking-wide text-slate-400 pointer-events-none">
            No tasks to track yet...
          </p>
        </div>
      )}
    </div>
  );
}
