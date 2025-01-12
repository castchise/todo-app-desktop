export interface TodoListItem {
  id: string;
  name: string;
  timeSpent: number;
  paused: boolean;
}

export type LocalStorageKey = "todoList" | "darkmode";
