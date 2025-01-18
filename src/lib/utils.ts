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

function normalizeDuration(duration: string) {
  /*
    Test if duration matches HH:mm:ss format (hours could exceed 23)
    If provided value contains singular digit - append leading zero to it

    1 => error
    1:20:00 => 01:20:00
    1:0:1 => 01:00:01
    02:10:5 => 02:10:05
    and so on..
  */

  const regex = /^(\d+):(\d{1,2}):(\d{1,2})$/;

  if (!regex.test(duration)) throw new Error("please enter valid duration");

  const [, hours, minutes, seconds] = duration.match(regex);

  const paddedHours = hours.padStart(2, "0");
  const paddedMinutes = minutes.padStart(2, "0");
  const paddedSeconds = seconds.padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
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

export function formatDurationToMs(duration: string) {
  const normalizedDuration = normalizeDuration(duration);

  // Extract duration parts from initial value and convert to Number so it would fit dayjs method
  const [hours, minutes, seconds] = normalizedDuration
    .split(":")
    .map((durationPart) => Number(durationPart));

  const d = dayjs.duration({
    seconds,
    minutes,
    hours,
  });

  return d.asSeconds();
}

export function createDynamicMask(timeInMs: number) {
  /*
    Create dynamic mask - where first 'hours' part is calculated from initial hours digit amount
    Exmples:
      10:20:11 => --:--:--
      100:20:11 => ---:--:--
      1000:20:11 => ----:--:-- 
      ...
  */
  const initialTimeValue = formatDurationToHours(timeInMs);
  const [hours] = initialTimeValue.split(":");
  const hoursPlaceholder = [...Array.from(hours).map(() => /\d/)];
  const timeMask = [
    ...hoursPlaceholder,
    ":",
    /[0-5]/,
    /\d/,
    ":",
    /[0-5]/,
    /\d/,
  ];

  return timeMask;
}
