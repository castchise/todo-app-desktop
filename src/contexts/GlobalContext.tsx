import { TodoListItem } from "@/types";
import { createContext, ReactElement, useContext, useState } from "react";

interface GlobalContextProps {
  todoList: TodoListItem[];
  setTodoList?: (updatedList: TodoListItem[]) => void;
}

const defaultValues: GlobalContextProps = {
  todoList: [],
};

const GlobalContext = createContext(defaultValues);

export function GlobalContextProvider({
  value,
  children,
}: {
  value: GlobalContextProps;
  children: ReactElement;
}) {
  const [todoList, setTodoList] = useState(value?.todoList || []);

  const contextValue: GlobalContextProps = {
    todoList,
    setTodoList,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context)
    throw new Error(
      "useGlobalContext must be used within GlobalContextProvider"
    );

  return context;
}
