/* eslint-disable import/no-named-as-default-member */
import { LocalStorageKey, TodoListItem } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";

dayjs.extend(duration);

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

export function formatDurationToHours(seconds: number) {
  const d = dayjs.duration(seconds, "seconds");

  const hours = Math.floor(d.asHours());
  const minutes = d.minutes();
  const secondsFormatted = d.seconds();

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secondsFormatted.toString().padStart(2, "0")}`;
}
