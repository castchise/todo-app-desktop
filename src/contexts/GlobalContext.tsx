import { setLocalStorageValue } from "@/lib/utils";
import { TodoListItem } from "@/types";
import { createContext, ReactElement, useContext, useState } from "react";

interface GlobalContextProps {
  todoList: TodoListItem[];
  setTodoList?: (updatedList: TodoListItem[]) => void;
  darkmode?: boolean;
  setDarkmode?: (theme: boolean) => void;
  updateTodoItem: (id: string, updatedFileds: Partial<TodoListItem>) => void;
  removeTodoItem: (id: string) => void;
}

const defaultValues: GlobalContextProps = {
  todoList: [],
  updateTodoItem: () => null,
  removeTodoItem: () => null,
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
  const [darkmode, setDarkmode] = useState(value?.darkmode || false);

  const updateTodoItem = (id: string, updatedFields: Partial<TodoListItem>) => {
    setTodoList((prev) => {
      const updatedList = prev.map((todoListItem) => {
        if (todoListItem.id === id)
          return { ...todoListItem, ...updatedFields };
        return todoListItem;
      });
      setLocalStorageValue("todoList", updatedList);
      return updatedList;
    });
  };

  const removeTodoItem = (id: string) => {
    setTodoList((prev) => {
      const updatedList = prev.filter((todoListItem) => todoListItem.id !== id);
      console.log(updatedList);
      setLocalStorageValue("todoList", updatedList);
      return updatedList;
    });
  };

  const contextValue: GlobalContextProps = {
    todoList,
    setTodoList,
    darkmode,
    setDarkmode,
    updateTodoItem,
    removeTodoItem,
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
