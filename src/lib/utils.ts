import { TodoListItem } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTodoList(): TodoListItem[] | null {
  return localStorage.getItem("todoList")
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
}

export function setTodoList(todoList: TodoListItem[]) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
