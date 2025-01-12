export interface TodoListItem {
  id: string;
  name: string;
  timeSpent: number;
  isPaused: boolean;
}

export type LocalStorageKey = "todoList" | "darkmode";
