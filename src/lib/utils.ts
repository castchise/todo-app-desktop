import { LocalStorageKey, TodoListItem } from "@/types";
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

export function setLocalStorageValue<T>(key: LocalStorageKey, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getIsDarkmode() {
  return localStorage.getItem("darkmode")
    ? JSON.parse(localStorage.getItem("darkmode"))
    : false;
}
